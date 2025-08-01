import useConversation from "../../hooks/useConversation";
import { useUserContext } from "@/modules/login/context/useUserContext";
import { useEffect } from "react";
import { WellcomeComponent } from "../Wellcome";
import { useNavigate } from "react-router-dom";

function ChatConversationComponent() {
	const { user } = useUserContext();
	const { messages } = useConversation();
	const navigate = useNavigate();
	useEffect(() => {
		if (user.value.hasChat) {
			console.log("Usuário tem chat!", user.value.hasChat);
		} else {
			navigate("/chats/create");
		}
	}, [user.value.hasChat, messages]);

	return (
		<div className="flex flex-col h-full w-full">
			<WellcomeComponent />
		</div>
	);
}

export { ChatConversationComponent };
