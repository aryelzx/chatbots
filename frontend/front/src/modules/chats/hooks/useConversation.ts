import { errorHandler } from "@/shared/api/errorHandler";
import { useConversationService } from "../services/conversation.service";
import type { messageOutputDto } from "../dtos/conversation";

type useConversationReturn = {
  handleGetConversation: (chat_id: number) => Promise<messageOutputDto[] | null>;
};

function useConversation(): useConversationReturn {
	async function handleGetConversation(chat_id: number) {
		try {
			const conversation = await useConversationService.getMessages(
				chat_id
			);
			return conversation;
		} catch (e) {
			errorHandler(e, "useConversation.handleGetConversation");
			return null;
		}
	}
	return {
		handleGetConversation,
	};
}

export default useConversation;
