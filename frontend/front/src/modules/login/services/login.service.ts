import { http } from "@/shared/api/http";
import type { AxiosInstance } from "axios";
import type {
	LoginInputDto,
	LoginOutputDto,
	RegisterInputDto,
	RegisterOutputDto,
} from "../dtos/login";
class AuthService {
	private readonly api: AxiosInstance;
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	async login(params: LoginInputDto): Promise<LoginOutputDto> {
		const response = await this.api.post<LoginOutputDto>(
			`/auth/login`,
			params
		);
		return response.data;
	}

	async register(params: RegisterInputDto): Promise<RegisterOutputDto> {
		const response = await this.api.post<RegisterOutputDto>(
			`/users/register`,
			params
		);
		return response.data;
	}
}

const useAuthService = new AuthService(http);

export { useAuthService };
