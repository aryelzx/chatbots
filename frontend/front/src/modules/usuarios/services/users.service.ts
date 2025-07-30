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
		const response = await this.api.get(`${this.baseURL}/list-all`);
		return response.data;
	}
}

const usersServices = new UsersServices(http);

export { UsersServices, usersServices };
