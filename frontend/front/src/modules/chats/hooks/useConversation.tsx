import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import type { messageOutputDto } from "../dtos/conversation";
import { useEffect, useCallback } from "react";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useChatContext } from "../context/useChatContext";
import type { IChat } from "../interfaces/chat.interface";

type useConversationReturn = {
	handleGetConversation: (
		chat_id: number
	) => Promise<messageOutputDto | null>;
};

function useConversation(): useConversationReturn {
	const { user } = useUserContext();

	const { currentChat, messagesByChat } = useChatContext();

	const handleGetConversation = useCallback(async (chat_id: number) => {
		try {
			const conversation = await useConversationService.getMessages(
				chat_id
			);
			messagesByChat.set((prev) => [...prev, conversation.response]);
			return conversation;
		} catch (e) {
			errorHandler(e, "useConversation.handleGetConversation");
			return null;
		}
	}, [messagesByChat]);

	const handleSetLatestChatInCurrent = useCallback((chat: IChat) => {
		currentChat.set(chat);
	}, [currentChat]);

	useEffect(() => {
		if (!user.value.latestChat || user.value.latestChat.id === 0) return;
		handleGetConversation(user.value.latestChat.id);
		handleSetLatestChatInCurrent(user.value.latestChat);
	}, [user.value.latestChat, handleGetConversation, handleSetLatestChatInCurrent]);

	return {
		handleGetConversation,
	};
}

export default useConversation;
