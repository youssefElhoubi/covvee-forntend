import type { CreateFileRequest } from "../types/file/CreateFileRequest";
import type { DeleteFileRequest } from "../types/file/DeleteFileRequest";
import type { RenameFileRequest } from "../types/file/reanameFileRequest";
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

export const renameFile = async (request: RenameFileRequest): Promise<string> => {
    try {
                const token: string = localStorage.getItem("token") || "null";

        const response = await fetch(`${url}/file/rename`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Failed to rename file. Status: ${response.status}`);
        }

        // The backend returns a plain string (projectId)
        return await response.text();
    } catch (error) {
        console.error("Error renaming file:", error);
        throw error;
    }
};