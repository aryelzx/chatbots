import { useUserContext } from "@/modules/login/context/useUserContext";
import { useEffect } from "react";
import { WellcomeComponent } from "../Wellcome";
import { useNavigate } from "react-router-dom";
import { ChatMessagesComponent } from "./chat";
import { useChatContext } from "../../context/useChatContext";
import { useConversationService } from "../../services/conversation.service";

function ChatConversationComponent() {
	const { user } = useUserContext();
	const { messagesByChat } = useChatContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.value.hasChat) {
			navigate("/chats/create");
			return;
		}
	}, [user.value.hasChat]);

	useEffect(() => {
		async function handleGetMessagesByIdChat(id_chat: number) {
			try {
				const { messages } = await useConversationService.getMessages(
					id_chat
				);
				if (messages) {
					messagesByChat.set(() => [
						...messagesByChat.get,
						...messages,
					]);
				}
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		}

		if (user.value.latestChat && user.value.latestChat.id !== 0) {
			handleGetMessagesByIdChat(user.value.latestChat.id);
		}
	}, [user.value.latestChat]);

	return (
		<div className="flex flex-col h-[78vh] w-full">
			{user.value.hasChat && messagesByChat.get.length > 0 ? (
				<ChatMessagesComponent />
			) : (
				<WellcomeComponent />
			)}
		</div>
	);
}

export { ChatConversationComponent };
