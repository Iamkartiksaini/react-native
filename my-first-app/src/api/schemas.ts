export interface LoginProps {
    email: string;
    password: string;
}

export interface SuccessResponse {
    user: {
        fullName?: string,
        name?: string,
        email: string,
    },
    token: string,
    refreshToken?: string,
    isError: string | null
}

export interface ErrorResponse {
    user: null,
    token: null,
    isError: string | null
}
