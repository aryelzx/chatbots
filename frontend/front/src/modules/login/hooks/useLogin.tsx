import type { LoginInputDto, LoginOutputDto } from "../dtos/login";
import { useAuthService } from "../services/login.service";

function UseLoginHook() {
	async function handleLogin(data: LoginInputDto): Promise<LoginOutputDto> {
		try {
			const response = await useAuthService.login(data);
			console.log(response, 'Login response');
			localStorage.setItem(
				"@chatbots_access_token",
				JSON.stringify(response.token)
			);
			localStorage.setItem(
				"@chatbots_user",
				JSON.stringify(response.usuario)
			);
			return response;
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	}

	return {
		handleLogin,
	};
}

export { UseLoginHook };
