export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    data: ILoginSuccess;
    errors: ILoginErrors;
}

export interface ILoginSuccess {
    user: {
        id: number,
        name: string,
        email: string,
        email_verified_at: string,
        created_at: string,
        updated_at: string,
        token: string,
    }
}

export interface ILoginErrors {
    message: string;
    messages: {
        email: string[];
        password: string[];
    }
}
