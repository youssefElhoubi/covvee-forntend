import type { CreateFileRequest } from "../types/file/CreateFileRequest";
import type { FolderRenameRequest } from "../types/folder/FolderRenameRequest";
import type { FolderResponse } from "../types/FolderResponse";
const url = import.meta.env.VITE_API_URL;
export const createFolder = async (args: CreateFileRequest): Promise<void> => {
    try {
        const token: string = localStorage.getItem("token") || "null";
        fetch(`${url}/folders`, {
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
export const getfolder = async (id: string): Promise<FolderResponse> => {
    try {
        // It's safer to use an empty string than the literal word "null" if the token is missing
        const token: string = localStorage.getItem("token") || "";

        const response = await fetch(`${url}/folders/${id}`, {
            method: "GET", // Usually capitalized by convention
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        // 1. Manually check if the response was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch folder. Status: ${response.status}`);
        }

        // 2. Parse the stream into actual JSON data
        const data: FolderResponse = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching folder:", error);
        throw error;
    }
}
export const DeleteFolder = async (args: String) => {
    try {
        const token: string = localStorage.getItem("token") || "null";
        fetch(`${url}/folders/${args}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const renameFolder = async (request: FolderRenameRequest): Promise<string> => {
    try {
        const token: string = localStorage.getItem("token") || "null";
        const response = await fetch(`${url}/folders/rename`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            throw new Error(`Failed to rename file. Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error("Error renaming file:", error);
        throw error;
    }
};

