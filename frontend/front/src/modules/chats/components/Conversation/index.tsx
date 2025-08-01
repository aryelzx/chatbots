import useConversation from "../../hooks/useConversation";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useEffect } from "react";
import { WellcomeComponent } from "../Wellcome";
import { useNavigate } from "react-router-dom";
import { ChatMessagesComponent } from "./chat";

function ChatConversationComponent() {
	const { user } = useUserContext();
	const { messages } = useConversation();

	const navigate = useNavigate();

	useEffect(() => {
		if (!user.value.hasChat) {
			navigate("/chats/create");
			return;
		}
	}, [user.value.hasChat, messages]);

	return (
		<div className="flex flex-col h-full w-full">
			{user.value.hasChat ? (
				<ChatMessagesComponent />
			) : (
				<WellcomeComponent />
			)}
		</div>
	);
}

export { ChatConversationComponent };
