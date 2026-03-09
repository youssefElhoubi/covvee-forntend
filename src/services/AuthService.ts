import type { loginType, RegisterRequest } from "../types/auth";
import axios from "axios";
const url = import.meta.env.API;

export const login = async (info: loginType) => {
    try {
        return await axios.post(`${url}/api/auth/login`,info,)
    } catch (error:any) {
        console.log("an error have acoured in the log in",error);
    }
}
export const signUp = async (info: RegisterRequest) => {
    try {
        return await axios.post(`${url}/api/auth/signup`,info,)
    } catch (error:any) {
        console.log("an error have acoured in the sign up ",error);
    }
}