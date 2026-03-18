import { login } from "@/api/api";
import { ErrorResponse, LoginProps, SuccessResponse } from "@/api/schemas";
import { deleteToken, getToken } from "@/utils/tokenStorage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { ToastAndroid } from "react-native";
import { create } from "zustand";

export interface AuthStore {
    user: any;
    token: string | null;
    loading: boolean;
    signIn: (props: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    loading: true,

    signIn: async ({ email, password }: LoginProps) => {
        try {
            set({ loading: true });
            const response: SuccessResponse | ErrorResponse = await login({ email, password })
            if (response.isError) {
                throw new Error(response.isError)
            }
            if (response?.user) {
                const user = response.user
                set({ user, token: response.token, loading: false });
                ToastAndroid.showWithGravity("Welcome " + user?.name, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
        } catch (error: any) {
            set({ user: null });
            ToastAndroid.show(error?.message, ToastAndroid.SHORT)
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        router.replace("/")
        await deleteToken();
        set({
            user: null,
            token: null,
            loading: false
        });
        ToastAndroid.showWithGravity("Logged out successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    },

    checkAuth: async () => {
        const token = await getToken();

        if (!token) {
            set({ loading: false });
            return;
        }

        const decoded: any = jwtDecode(token);

        const expired = decoded?.exp * 1000 < Date.now();

        if (expired) {
            // await deleteToken();
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

