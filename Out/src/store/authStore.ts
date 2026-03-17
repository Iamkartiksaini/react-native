import { login } from "@/api/api";
import { ErrorResponse, LoginProps, SuccessResponse } from "@/api/schemas";
import { create } from "zustand";
// import { deleteToken, getToken } from "../utils/tokenStorage";

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
            console.log("sign in")
            const response: SuccessResponse | ErrorResponse = await login({ email, password })

            if (response.isError) {
                throw new Error(response.isError)
            }
            if (response?.user) {
                set({ user: response.user, token: response.token, loading: false });
            }
        } catch (error: any) {
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        // await deleteToken();

        set({
            user: null,
            token: null,
        });
    },

    checkAuth: async () => {
        // const token = await getToken();

        // if (!token) {
        //     set({ loading: false });
        //     return;
        // }

        // const decoded: any = jwtDecode(token);

        // const expired = decoded?.exp * 1000 < Date.now();

        // if (expired) {
        //     // await deleteToken();
        //     set({ token: null, user: null, loading: false });
        //     return;
        // }

        // set({
        //     token,
        //     user: decoded,
        //     loading: false,
        // });
    },
}));