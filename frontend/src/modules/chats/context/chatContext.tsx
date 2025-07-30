import React, { createContext, useState } from "react";
import type { ChatContextType } from "../types/useChatContext";
import type { IChat } from "../interfaces/chat.interface";
import type { messageInputDto, messageType } from "../dtos/conversation";
import { useConversationService } from "../services/conversation.service";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { errorHandler } from "@/shared/api/errorHandler";

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [chat, setChat] = useState<IChat>(() => {
		const chatLocalStorage = localStorage.getItem("@chatbots_chat");
		if (!chatLocalStorage) return {} as IChat;
		return JSON.parse(chatLocalStorage);
	});

	const [messagesByChat, setMessagesByChat] = useState<messageType[]>([]);
	const [allChats, setAllChats] = useState<IChat[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { user } = useUserContext();

	async function handleSendMessage(inputText: string) {
		const tempUserMessage: messageType = {
			id: Math.floor(Math.random() * 1000000),
			prompt_input_text: inputText,
			tipo: "P",
			send_by: "U",
			user_id: Number(user.value.id),
			context: chat?.context ?? "",
			created_by: Number(user.value.id),
			created_at: new Date(),
			chat_id: chat.id,
			mensagem: inputText,
		};

		const tempBotMessage: messageType = {
			id: Math.floor(Math.random() * 1000000),
			prompt_input_text: inputText,
			tipo: "R",
			send_by: "B",
			user_id: Number(user.value.id),
			context: chat?.context ?? "",
			created_by: Number(user.value.id),
			created_at: new Date(),
			chat_id: chat.id,
			mensagem: "Carregando resposta...",
		};

		const tempBotId = tempBotMessage.id;

		try {
			if (!inputText.trim()) return;

			const params: messageInputDto = {
				prompt_input_text: inputText,
				tipo: "P",
				send_by: "U",
				user_id: user.value.id,
				context: chat?.context,
				created_by: user.value.id,
				modelo: chat.modelo,
			};

			setMessagesByChat((prev) => [
				...prev,
				tempUserMessage,
				tempBotMessage,
			]);

			const { resposta } = await useConversationService.sendMessage(
				chat.id,
				params
			);

			const realBotMessage: messageType = {
				id: resposta.id,
				prompt_input_text: resposta.prompt_input_text,
				tipo: resposta.tipo,
				send_by: resposta.send_by,
				user_id: resposta.user_id,
				context: resposta.context,
				created_by: resposta.created_by,
				created_at: resposta.created_at,
				chat_id: resposta.chat_id,
				mensagem: resposta.mensagem,
			};

			setMessagesByChat((prev) =>
				prev.map((msg) => (msg.id === tempBotId ? realBotMessage : msg))
			);

			if (!user.value.hasChat) {
				user.set((prev) => ({
					...prev,
					hasChat: true,
				}));
			}
		} catch (error) {
			errorHandler(error, "WellcomeComponent.handleSendMessage");
			console.error("Error sending message:", error);
			setMessagesByChat((prev) =>
				prev.filter(
					(msg) =>
						msg.id !== tempUserMessage.id && msg.id !== tempBotId
				)
			);
		}
	}

	const values: ChatContextType = {
		currentChat: {
			value: chat,
			set: setChat,
		},
		messagesByChat: {
			get: messagesByChat,
			set: setMessagesByChat,
		},
		handleSendMessage,
		loadingMessages: {
			value: loading,
			set: setLoading,
		},
		allChats: {
			value: allChats,
			set: setAllChats,
		}
	};
	return (
		<ChatContext.Provider value={values}>{children}</ChatContext.Provider>
	);
};

export { ChatContextProvider, ChatContext };
