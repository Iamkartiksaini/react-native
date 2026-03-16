import { getToken } from "@/utils/tokenStorage";
import axios from "axios";

const api = axios.create({
    baseURL: "https://your-api-url.com",
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export interface LoginProps {
    email: string;
    password: string;
}

export interface SuccessResponse {
    user: {
        fullName: string,
        email: string,
    },
    token: string,
    isError: string | null
}

export interface ErrorResponse {
    user: null,
    token: null,
    isError: string | null
}

export const login = async ({ email, password }: LoginProps): Promise<SuccessResponse | ErrorResponse> => {
    try {
        const response = await api.post('/login', { email, password });
        const { token, user, isError } = response.data
        if (token && user?.fullName) {
            return {
                user, token, isError: null
            }
        }
        throw new Error(isError || "Invalid response from server")
    } catch (error: any) {
        return {
            user: null, token: null,
            isError: error?.message
        }
    }
};

export default api;