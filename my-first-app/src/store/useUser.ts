import { ErrorResponse, login, LoginProps, SuccessResponse } from '@/api';
import { create } from 'zustand';

const useStore = create((set) => ({
    auth: {
        isLoading: true,
        user: null,
        error: null,
        token: null,
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
    },
}));

export default useStore;