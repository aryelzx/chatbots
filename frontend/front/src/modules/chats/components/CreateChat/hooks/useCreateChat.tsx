import { useForm } from "react-hook-form";
import {
	createChatSchema,
	type CreateChatSchemaType,
} from "../schemas/createChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorHandler } from "@/shared/api/errorHandler";
import { useState } from "react";
import { useCreateChatService } from "../service/createChat.service";
import type { CreateChatInputDto } from "../dtos/createChat";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useChatContext } from "@/modules/chats/context/useChatContext";
import toast from "react-hot-toast";
import type { IUser } from "@/modules/usuarios/interfaces/user-interface";

function useCreateChatHook() {
	const [loading, setLoading] = useState(false);
	const { currentChat } = useChatContext();
	const { user } = useUserContext();

	const form = useForm<CreateChatSchemaType>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			context: "",
			modelo: "",
		},
	});

	async function handleCreateChat(data: CreateChatSchemaType) {
		try {
			setLoading(true);
			const params: CreateChatInputDto = {
				nome: data.nome,
				descricao: data.descricao,
				context: data.context,
				modelo: data.modelo,
				status: "A",
				user_id: Number(user.value?.id),
			};
			const response = await useCreateChatService.execute(params);
			currentChat.set(response.chat);
			user.set((prev: IUser) => ({
				...prev,
				hasChat: true,
			}));
			toast.success("Chat criado com sucesso!");
			return response;
		} catch (error) {
			errorHandler(error);
			throw error;
		}
	}
	return {
		form,
		handleCreateChat,
		states: {
			loading,
		},
	};
}

export { useCreateChatHook };
