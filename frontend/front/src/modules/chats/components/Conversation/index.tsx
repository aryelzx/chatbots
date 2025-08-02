import { useUserContext } from "@/modules/login/context/useUserContext";
import { useEffect } from "react";
import { WellcomeComponent } from "../Wellcome";
import { useNavigate } from "react-router-dom";
import { ChatMessagesComponent } from "./chat";
import { useChatContext } from "../../context/useChatContext";

function ChatConversationComponent() {
	const { user } = useUserContext();
	const { messagesByChat } = useChatContext();
	const navigate = useNavigate();

	useEffect(() => {
		console.log("user.value.hasChat", user.value.hasChat);
		console.log("messages.get.length", messagesByChat.get.length);
		if (!user.value.hasChat) {
			navigate("/chats/create");
			return;
		}
	}, [user.value.hasChat]);

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
