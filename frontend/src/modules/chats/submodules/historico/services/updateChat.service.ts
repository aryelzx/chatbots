import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type {
	UpdateChatInputDto,
	UpdateChatOutputDto,
} from "../dtos/updateChat";

class UpdateChatService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async execute({
		id_chat,
		chat,
	}: UpdateChatInputDto): Promise<UpdateChatOutputDto> {
		const response = await this.api.put(
			`${this.baseURL}/update/${id_chat}`,
			chat
		);
		return response.data;
	}
}

const useUpdateChatService = new UpdateChatService(http);

export { useUpdateChatService };
