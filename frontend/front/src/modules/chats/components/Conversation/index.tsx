import { useUserContext } from "@/modules/login/context/useUserContext";
import { useEffect } from "react";
import { WellcomeComponent } from "../Wellcome";
import { useNavigate } from "react-router-dom";
import { ChatMessagesComponent } from "./chat";
import { useChatContext } from "../../context/useChatContext";
import useConversation from "../../hooks/useConversation";
import { useConversationService } from "../../services/conversation.service";
import { errorHandler } from "@/shared/api/errorHandler";
import toast from "react-hot-toast";

function ChatConversationComponent() {
	const { user } = useUserContext();
	const { messagesByChat, currentChat } = useChatContext();

	const navigate = useNavigate();
	useConversation();

	useEffect(() => {
		if (!user.value.hasChat) {
			navigate("/chats/create");
			return;
		}
	}, [user.value.hasChat]);

	async function handleGetMessagesByChat() {
		try {
			if(currentChat.value.id === 0) {
				return toast.success("Crie um chat para entrar em uma conversa.");
			}
			const { messages } = await useConversationService.getMessages(
				currentChat.value.id
			);
			messagesByChat.set(messages);
		} catch (err) {
			console.error("Error fetching messages:", err);
			errorHandler(err, "Error fetching messages");
		}
	}
	
	useEffect(() => {
		handleGetMessagesByChat();
	}, []);

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
