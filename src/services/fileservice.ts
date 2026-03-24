import type { CreateFileRequest } from "../types/file/CreateFileRequest";
import type { DeleteFileRequest } from "../types/file/DeleteFileRequest";
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
export const DeleteFile = async (args:DeleteFileRequest) => {    
    try {
        const token: string = localStorage.getItem("token") || "null";
        fetch(`${url}/file`, {
            method: "delete",
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