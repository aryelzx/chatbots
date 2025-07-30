import { WellcomeComponent } from "../Wellcome";
import { ChatMessagesComponent } from "./chat";

import useConversation from "../../hooks/useConversation";

function ChatConversationComponent() {
	const { messagesByChat, user } = useConversation();

	return (
		<div className="flex flex-col h-[80vh] w-full">
			{user.value.hasChat && messagesByChat.get.length > 0 ? (
				<ChatMessagesComponent />
			) : (
				<WellcomeComponent />
			)}
		</div>
	);
}

export { ChatConversationComponent };
