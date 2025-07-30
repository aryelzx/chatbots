import { useChatContext } from "@/modules/chats/context/useChatContext";
import type { IChat } from "@/modules/chats/interfaces/chat.interface";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { errorHandler } from "@/shared/api/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	createChatSchema,
	type CreateChatSchemaType,
} from "../../create/schemas/createChat";
import type { GetAllChatsInputDto } from "../dtos/getAllChats";
import type { UpdateChatInputDto } from "../dtos/updateChat";
import { useGetAllChatsService } from "../services/getAllChats.service";
import { useUpdateChatService } from "../services/updateChat.service";

type LoadingStates = {
	allChats: boolean;
	selectedChat: boolean;
};

export function useHistoricoHook() {
	const { allChats, currentChat, messagesByChat } = useChatContext();
	const { user } = useUserContext();
	const [loading, setLoading] = useState<LoadingStates>({
		allChats: false,
		selectedChat: false,
	});
	const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	async function handleGetAllChats() {
		try {
			allChats.set([]);
			const param: GetAllChatsInputDto = {
				id_user: Number(user.value.id),
			};
			setLoading((prev) => ({ ...prev, allChats: true }));
			const { chats } = await useGetAllChatsService.execute(param);
			allChats.set(chats);
		} catch (error) {
			console.error("Error fetching all chats:", error);
		} finally {
			setLoading((prev) => ({ ...prev, allChats: false }));
		}
	}

	const form = useForm<CreateChatSchemaType>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			nome: selectedChat?.nome || "",
			descricao: selectedChat?.descricao || "",
			context: selectedChat?.context || "",
			modelo: selectedChat?.modelo || "",
		},
	});

	function handleSetValuesInForm(chat: IChat) {
		setSelectedChat(chat);
		form.reset({
			nome: chat.nome || "",
			descricao: chat.descricao || "",
			context: chat.context || "",
			modelo: chat.modelo || "",
		});
	}

	async function handleUpdateChat(data: CreateChatSchemaType) {
		try {
			if (!selectedChat) return;
			// if (!form.formState.isDirty) {
			// 	setIsModalOpen(false);
			// 	return;
			// }
			setLoading((prev) => ({ ...prev, selectedChat: true }));
			const params: UpdateChatInputDto = {
				id_chat: selectedChat.id.toString(),
				chat: {
					id: selectedChat.id,
					nome: data.nome,
					descricao: data.descricao,
					context: data.context,
					modelo: data.modelo,
					status: "A", // toggle para desativar chat
					user_id: Number(user.value.id),
					updated_by: Number(user.value.id),
				},
			};

			const updatedChat = await useUpdateChatService.execute(params);
			const findIndexOfChat = allChats.value.findIndex(
				(chat) => chat.id === selectedChat.id
			);
			if (findIndexOfChat !== -1) {
				allChats.value[findIndexOfChat] = updatedChat.chat;
			}
			setSelectedChat(null);
			form.reset();
			toast.success("Chat atualizado com sucesso!");
		} catch (error) {
			errorHandler(error, "Erro ao atualizar o chat");
		} finally {
			setLoading((prev) => ({ ...prev, selectedChat: false }));
		}
	}

	function handleModal(chat: IChat, isOpen: boolean) {
		setIsModalOpen(isOpen);
		if (isOpen) {
			handleSetValuesInForm(chat);
		}
	}

	function handleRedirectToChat(chat: IChat) {
		currentChat.set(chat);
		localStorage.setItem("@chatbots_chat", JSON.stringify(chat));
		messagesByChat.set([]);
		setSelectedChat(chat);
		handleSetValuesInForm(chat);
		navigate(`/chats`);
	}

	useEffect(() => {
		handleGetAllChats();
	}, []);

	return {
		allChats,
		loading,
		selectedChat,
		isModalOpen,
		form,
		handleGetAllChats,
		handleUpdateChat,
		handleModal,
		handleRedirectToChat,
	};
}
