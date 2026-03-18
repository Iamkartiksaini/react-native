import axios from "axios";
import { ErrorResponse, LoginProps, SuccessResponse } from "./schemas";

const IP = "192.168.1.5"
const PORT = ":5000"
const API_URL = "http://" + IP + PORT;

console.log("backend URL  ", API_URL)

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    // const token = await getToken();

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
});


export const login = async ({ email, password }: LoginProps): Promise<SuccessResponse | ErrorResponse> => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { success, message, data } = response?.data || {}
        if (success && data) {
            const { token, user, refreshToken } = data || {}
            if (token && user?.email) {
                return {
                    user, token, refreshToken, isError: null
                }
            }
        }
        throw new Error(message || "Invalid response from server")
    } catch (error: any) {
        return {
            user: null, token: null,
            isError: error?.message
        }
    }
};

export default api;