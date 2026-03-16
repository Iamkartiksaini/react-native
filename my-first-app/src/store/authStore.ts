import { ErrorResponse, login, LoginProps, SuccessResponse } from "@/api/api";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { deleteToken, getToken } from "../utils/tokenStorage";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    loading: true,

    signIn: async ({ email, password }: LoginProps) => {
        try {
            set({ isLoading: true });
            const response: SuccessResponse | ErrorResponse = await login({ email, password })

            if (response.isError) {
                throw new Error(response.isError)
            }
            if (response?.user) {
                set({ user: response.user, token: response.token, error: null });
            }
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        await deleteToken();

        set({
            user: null,
            token: null,
        });
    },

    checkAuth: async () => {
        const token = await getToken();

        if (!token) {
            set({ loading: false });
            return;
        }

        const decoded = jwtDecode(token);

        const expired = decoded.exp * 1000 < Date.now();

        if (expired) {
            await deleteToken();
            set({ token: null, user: null, loading: false });
            return;
        }

        set({
            token,
            user: decoded,
            loading: false,
        });
    },
}));