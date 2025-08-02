import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type { UpdateChatInputDto, UpdateChatOutputDto } from "../dtos/updateChat";

class UpdateChatService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async execute({ id_user, chat }: UpdateChatInputDto): Promise<UpdateChatOutputDto> {
		try {
			const response = await this.api.put(
				`${this.baseURL}/update/${id_user}`,
				chat
			);
			return response.data;
		} catch (error) {
			console.error("Error updating chat:", error);
			throw error;
		}
	}
}

const useUpdateChatService = new UpdateChatService(http);

export { useUpdateChatService };
