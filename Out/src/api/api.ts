import axios from "axios";
import { ErrorResponse, LoginProps, SuccessResponse } from "./schemas";

const api = axios.create({
    baseURL: "http://localhost:5000",
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
        console.log("making api call")
        const response = await api.post('/auth/login', { email, password });
        const { token, user, isError } = response.data
        if (token && user?.fullName) {
            return {
                user, token, isError: null
            }
        }
        throw new Error(isError || "Invalid response from server")
    } catch (error: any) {
        console.log(error?.message)
        return {
            user: null, token: null,
            isError: error?.message
        }
    }
};

export default api;