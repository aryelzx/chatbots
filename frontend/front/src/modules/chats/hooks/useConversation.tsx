import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import type { messageOutputDto, messageType } from "../dtos/conversation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useChatContext } from "../context/useChatContext";
import type { IChat } from "../interfaces/chat.interface";

type useConversationReturn = {
	handleGetConversation: (
		chat_id: number
	) => Promise<messageOutputDto | null>;
	messages: {
		get: messageType[];
		set: (messages: messageType[]) => void;
	};
};

function useConversation(): useConversationReturn {
	const { user } = useUserContext();
	const [messagesByChat, setMessagesByChat] = useState<messageType[]>([]);
	const { currentChat } = useChatContext();

	async function handleGetConversation(chat_id: number) {
		try {
			const conversation = await useConversationService.getMessages(
				chat_id
			);
			setMessagesByChat(conversation.messages);
			return conversation;
		} catch (e) {
			errorHandler(e, "useConversation.handleGetConversation");
			return null;
		}
	}

	function handleSetLatestChatInCurrent(chat: IChat) {
		currentChat.set(chat);
	}

	useEffect(() => {
		if (!user.value.latestChat) return;
		handleGetConversation(user.value.latestChat.id);
		handleSetLatestChatInCurrent(user.value.latestChat);
	}, [user.value.latestChat?.id]);

	return {
		handleGetConversation,
		messages: {
			get: messagesByChat,
			set: setMessagesByChat,
		},
	};
}

export default useConversation;
