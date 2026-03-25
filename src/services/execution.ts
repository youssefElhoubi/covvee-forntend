import type { ExecutionResult } from "../types/ExecutionResult"
const url = import.meta.env.VITE_API_URL;
export const execute = async (params: string): Promise<ExecutionResult> => {
    try {
        const token: string = localStorage.getItem("token") || "null";
        const result = await fetch(`${url}/execute/project`, {
            method: "post",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        return result.json();
    } catch (error) {
        console.log(error);
        throw error
    }
}