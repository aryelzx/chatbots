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
	}, [user.value.hasChat]);

	return (
		<div className="flex flex-col h-[78vh] w-full">
			{user.value.hasChat && messages.get.length > 0 ? (
				<ChatMessagesComponent messages={messages.get} />
			) : (
				<WellcomeComponent />
			)}
		</div>
	);
}

export { ChatConversationComponent };
