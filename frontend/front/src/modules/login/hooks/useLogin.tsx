import { useChatContext } from "@/modules/chats/context/useChatContext";
import type { IChat } from "@/modules/chats/interfaces/chat.interface";
import type { IUser } from "@/modules/usuarios/interfaces/user-interface";
import { errorHandler } from "@/shared/api/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useUserContext } from "../context/useUserContext";
import type { LoginInputDto } from "../dtos/login";
import { useAuthService } from "../services/login.service";

function UseLoginHook() {
	const { user: currentUser } = useUserContext();
	const { currentChat } = useChatContext();

	const navigate = useNavigate();

	const loginSchema = {
		cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
		senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
	};

	const form = useForm<LoginInputDto>({
		defaultValues: {
			cpf: "",
			senha: "",
		},
		resolver: zodResolver(z.object(loginSchema)),
	});

	async function handleLogin(data: LoginInputDto): Promise<void> {
		try {
			const handleParams: LoginInputDto = {
				cpf: data.cpf.split(".").join("").replace("-", ""),
				senha: data.senha,
			}
			const loginPromise = useAuthService.login(handleParams);

			const response = await toast.promise(loginPromise, {
				loading: "Fazendo login...",
				success: "Login realizado com sucesso!",
				error: "Erro ao fazer login",
			});

			handleStorageUser(response.usuario);
			localStorage.setItem(
				"@chatbots_access_token",
				JSON.stringify(response.token)
			);
			currentChat.set(response.usuario?.latestChat || ({} as IChat));
			navigate("/dashboard");
		} catch (error) {
			errorHandler(error, "Erro ao fazer login");
			throw error;
		}
	}

	function handleStorageUser(user: IUser) {
		localStorage.setItem("@chatbots_user", JSON.stringify(user));
		localStorage.setItem(
			"@chatbots_chat",
			JSON.stringify(user.latestChat || {})
		);
		currentUser.set(user);
	}
	return {
		handleLogin,
		form,
	};
}

export { UseLoginHook };
