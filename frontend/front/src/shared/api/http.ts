import { baseURL } from "../configs/path";

;

function httpClientBuilder() {
    const client = axios.create({ baseURL })

    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("@chatbots_access_token");

            if (token){
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }

            return config;
        },
        (error) => {
            // Handle request errors here
            return Promise.reject(error);
        }
    );
}

const http = httpClientBuilder();

export { http };
