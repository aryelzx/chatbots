import axios, { type AxiosInstance } from "axios";
import { baseURL } from "../configs/path";

;

function httpClientBuilder(): AxiosInstance {
    const client = axios.create({ baseURL })

    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("@chatbots_access_token")?.replace(/^"(.*)"$/, '$1');

            if (token){
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            // Handle request errors here
            return Promise.reject(error);
        }
    );

    return client;
}

const http = httpClientBuilder();

export { http };
