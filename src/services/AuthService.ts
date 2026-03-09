import type { loginType, RegisterRequest } from "../types/auth";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const login = async (info: loginType) => {
    console.log(url);
    
    try {
        return await axios.post(`${url}/api/auth/login`,info,)
    } catch (error:any) {
        throw new Error(error);
    }
}
export const signUp = async (info: RegisterRequest) => {
    try {
        return await axios.post(`${url}/api/auth/signup`,info,)
    } catch (error:any) {
        throw new Error(error);
    }
}