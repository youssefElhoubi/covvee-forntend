import type { CreateFileRequest } from "../types/file/CreateFileRequest";
const url = import.meta.env.VITE_API_URL;
export const createFile = async (args: CreateFileRequest): Promise<void> => {
    try {
        const token: string = localStorage.getItem("token") || "null";
        fetch(`${url}/file/create`, {
            method: "post",
            body: JSON.stringify(args),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}