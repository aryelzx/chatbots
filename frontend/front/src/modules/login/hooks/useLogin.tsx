import type { IUser } from "@/modules/usuarios/interfaces/user-interface";
import type { LoginInputDto } from "../dtos/login";
import { useAuthService } from "../services/login.service";
import { useUserContext } from "../context/useUserContext";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "@/shared/api/errorHandler";

function UseLoginHook() {
	const { user: currentUser } = useUserContext();
	const navigate = useNavigate();

	async function handleLogin(data: LoginInputDto): Promise<void> {
		try {
			const response = await useAuthService.login(data);
			handleStorageUser(response.usuario);
			localStorage.setItem(
				"@chatbots_access_token",
				JSON.stringify(response.token)
			);
			navigate("/dashboard");
		} catch (error) {
			errorHandler(error, "Erro ao fazer login");
			throw error;
		}
	}

	function handleStorageUser(user: IUser) {
		localStorage.setItem("@chatbots_user", JSON.stringify(user));
		currentUser.set(user);
	}
	return {
		handleLogin,
	};
}

export { UseLoginHook };
