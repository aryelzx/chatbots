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
	const [loading, setLoading] = useState<boolean>(false);

	const { user } = useUserContext();

	async function handleSendMessage(inputText: string) {
		try {
			if (!inputText.trim()) return;
			const params: messageInputDto = {
				prompt_input_text: inputText,
				tipo: "P",
				send_by: "U",
				user_id: user.value.id,
				context: chat?.context,
				created_by: user.value.id,
			};
			const { pergunta, resposta } =
				await useConversationService.sendMessage(chat.id, params);

			const userMessage: messageType = {
				id: pergunta.id,
				prompt_input_text: inputText,
				tipo: "P",
				send_by: "U" as const,
				user_id: pergunta.user_id,
				context: pergunta.context,
				created_by: pergunta.created_by,
				created_at: pergunta.created_at,
				chat_id: pergunta.chat_id,
				mensagem: pergunta.mensagem,
			};

			// bot response message
			const botMessage: messageType = {
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
			const allMessages = [userMessage, botMessage, ...messagesByChat];

			console.log(
				"Antes do sort:",
				allMessages.map((m) => m.created_at)
			);

			const sortedMessages = allMessages.sort(
				(a, b) =>
					new Date(a.created_at).getTime() -
					new Date(b.created_at).getTime()
			);

			console.log(
				"Depois do sort:",
				sortedMessages.map((m) => m.created_at)
			);

			setMessagesByChat(sortedMessages);
			if (!user.value.hasChat) {
				user.set((prev) => ({
					...prev,
					hasChat: true,
				}));
			}
		} catch (error) {
			errorHandler(error, "WellcomeComponent.handleSendMessage");
			console.error("Error sending message:", error);
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
	};
	return (
		<ChatContext.Provider value={values}>{children}</ChatContext.Provider>
	);
};

export { ChatContextProvider, ChatContext };
