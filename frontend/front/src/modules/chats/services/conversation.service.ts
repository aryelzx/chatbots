import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type {
	getMessagesOutputDto,
	messageInputDto,
	messageOutputDto,
} from "../dtos/conversation";
class ConversationService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async getMessages(id_chat: number): Promise<getMessagesOutputDto> {
		const response = await this.api.get(
			`${this.baseURL}/get-messages/${id_chat}`
		);
		return response.data;
	}

	async sendMessage(
		id_chat: number,
		params: messageInputDto
	): Promise<messageOutputDto> {
		const response = await this.api.post<messageOutputDto>(
			`${this.baseURL}/send-message/${id_chat}`,
			params
		);
		return response.data;
	}
}

const useConversationService = new ConversationService(http);

export { useConversationService };
