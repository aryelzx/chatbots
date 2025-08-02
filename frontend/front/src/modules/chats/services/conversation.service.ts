import type {
	getMessagesOutputDto,
	messageInputDto,
	messageOutputDto
} from "../dtos/conversation";
import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
class ConversationService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async getMessages(id_chat: number): Promise<getMessagesOutputDto> {
		try {
			const response = await this.api.get(
				`${this.baseURL}/get-messages/${id_chat}`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching messages:", error);
			throw error;
		}
	}

	async sendMessage(
		id_chat: number,
		params: messageInputDto
	): Promise<messageOutputDto> {
		try {
			const response = await this.api.post<messageOutputDto>(
				`${this.baseURL}/send-message/${id_chat}`,
				params
			);
			return response.data;
		} catch (error) {
			console.error("Error sending message:", error);
			throw error;
		}
	}
}

const useConversationService = new ConversationService(http);

export { useConversationService };
