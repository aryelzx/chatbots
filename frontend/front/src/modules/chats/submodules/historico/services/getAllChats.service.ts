import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type {
	GetAllChatsInputDto,
	GetAllChatsOutputDto,
} from "../dtos/getAllChats";

class GetAllChatsService {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/chats";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async execute({
		id_user,
	}: GetAllChatsInputDto): Promise<GetAllChatsOutputDto> {
		try {
			const response = await this.api.get(
				`${this.baseURL}/list-all/${id_user}`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching messages:", error);
			throw error;
		}
	}
}

const useGetAllChatsService = new GetAllChatsService(http);

export { useGetAllChatsService };
