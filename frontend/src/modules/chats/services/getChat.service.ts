import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type { ChatInputDto, ChatOutputDto } from "../dtos/chat";

class GetChatService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async byId({ id_chat }: ChatInputDto): Promise<ChatOutputDto> {
		const response = await this.api.get(`${this.baseURL}/${id_chat}`);
		return response.data;
	}
}

const useGetChatService = new GetChatService(http);

export { useGetChatService };
