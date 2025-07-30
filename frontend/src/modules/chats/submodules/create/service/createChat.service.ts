import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type {
	CreateChatInputDto,
	CreateChatOutputDto,
} from "../dtos/createChat";

class CreateChatService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";

	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async execute(data: CreateChatInputDto): Promise<CreateChatOutputDto> {
		const response = await this.api.post(`${this.baseURL}/create`, data);
		return response.data;
	}
}

const useCreateChatService = new CreateChatService(http);

export { useCreateChatService };
