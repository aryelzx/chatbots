import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import type { messageOutputDto } from "../dtos/conversation";
import { useEffect, useCallback } from "react";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useChatContext } from "../context/useChatContext";
import type { IChat } from "../interfaces/chat.interface";

function useConversation() {
	const { user } = useUserContext();
	const { currentChat, messagesByChat, loadingMessages } = useChatContext();

	const handleSetLatestChatInCurrent = useCallback(
		(chat: IChat) => {
			currentChat.set(chat);
		},
		[currentChat]
	);

	useEffect(() => {
		if (!user.value.latestChat || user.value.latestChat.id === 0) return;

		async function handleGetMessagesByIdChat(
			id_chat: number
		): Promise<messageOutputDto[] | void> {
			try {
				loadingMessages.set(true);
				const { messages } = await useConversationService.getMessages(
					id_chat
				);
				if (messages) {
					messagesByChat.set((prev) => {
						const existingIds = new Set(prev.map((msg) => msg.id));
						const newMessages = messages.filter(
							(msg) => !existingIds.has(msg.id)
						);

						const merged = [...prev, ...newMessages];

						//order messages by created_at
						return merged.sort(
							(a, b) =>
								Date.parse(a.created_at as unknown as string) -
								Date.parse(b.created_at as unknown as string)
						);
					});
				}
			} catch (error) {
				errorHandler(error);
				console.error("Error fetching messages:", error);
			} finally {
				loadingMessages.set(false);
			}
		}

		handleGetMessagesByIdChat(user.value.latestChat.id);
		handleSetLatestChatInCurrent(user.value.latestChat);
	}, []);

	return null;
}

export default useConversation;
