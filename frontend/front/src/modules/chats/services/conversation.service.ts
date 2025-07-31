import type { AxiosInstance } from "axios";
import type { messageOutputDto } from "../dtos/conversation";
import { http } from "@/shared/api/http";

class ConversationService {
	private readonly api: AxiosInstance;

	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async getMessages(conversationId: number): Promise<messageOutputDto[]> {
		try {
			const response = await this.api.get(
				`/conversations/${conversationId}/messages`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching messages:", error);
			throw error;
		}
	}
}

const useConversationService = new ConversationService(http);

export { useConversationService };
