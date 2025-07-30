import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import { useEffect } from "react";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useChatContext } from "../context/useChatContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useConversation() {
	const { user } = useUserContext();
	const { messagesByChat, currentChat } = useChatContext();

	const navigate = useNavigate();

	async function handleGetMessagesByChat() {
		try {
			if (currentChat.value.id === 0) {
				return toast.success(
					"Crie um chat para entrar em uma conversa."
				);
			}
			const { messages } = await useConversationService.getMessages(
				currentChat.value.id
			);
			const orderedMessages = messages.sort(
				(a, b) =>
					new Date(a.created_at).getTime() -
					new Date(b.created_at).getTime()
			);
			messagesByChat.set(orderedMessages);
		} catch (err) {
			console.error("Error fetching messages:", err);
			errorHandler(err, "Error fetching messages");
		}
	}

	useEffect(() => {
		if (!user.value.hasChat) {
			navigate("/chats/create");
			return;
		}
	}, [user.value.hasChat]);

	useEffect(() => {
		handleGetMessagesByChat();
	}, []);

	return {
		user,
		messagesByChat,
	};
}

export default useConversation;
