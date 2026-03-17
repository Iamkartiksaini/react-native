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
