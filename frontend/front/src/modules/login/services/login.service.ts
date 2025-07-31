import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type { LoginInputDto, LoginOutputDto } from "../dtos/login";
class AuthService {
	private readonly api: AxiosInstance;
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async login(params: LoginInputDto): Promise<LoginOutputDto> {
		try {
			const response = await this.api.post<LoginOutputDto>(`/auth/login`, params);
			return response.data;
		} catch (error) {
			console.error("Error fetching messages:", error);
			throw error;
		}
	}
}

const useAuthService = new AuthService(http);

export { useAuthService };
