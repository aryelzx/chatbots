import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type { GetUserOutputDto } from "../dtos/users";

class UsersServices {
	private readonly api: AxiosInstance;
	private readonly baseURL = "/users";
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async getAll(): Promise<GetUserOutputDto> {
		try {
			const response = await this.api.get(`${this.baseURL}/list-all`);
			return response.data;
		} catch (error) {
			console.error("Error fetching messages:", error);
			throw error;
		}
	}
}

const usersServices = new UsersServices(http);

export { UsersServices, usersServices };
