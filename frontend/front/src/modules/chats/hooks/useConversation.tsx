import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import type { messageOutputDto, messageType } from "../dtos/conversation";
import { useEffect, useState } from "react";

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
	const [messagesByChat, setMessagesByChat] = useState<messageType[]>([]);

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

	useEffect(() => {
		handleGetConversation(2);
	}, []);

	return {
		handleGetConversation,
		messages: {
			get: messagesByChat,
			set: setMessagesByChat,
		},
	};
}

export default useConversation;
