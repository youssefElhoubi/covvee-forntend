import type { loginType, RegisterRequest } from "../types/auth";

const url = import.meta.env.VITE_API_URL;

export const login = async (info: loginType) => {
    

    try {
        const response = await fetch(`${url}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error: any) {
        throw error;
    }
}

export const signUp = async (info: RegisterRequest) => {
    try {
        const response = await fetch(`${url}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error: any) {
        throw error;
    }
}