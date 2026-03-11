import type { CreateProjectRequest } from "../types/project/projectCreatetion";

const url = import.meta.env.VITE_API_URL;

export const getProjects = async () => {
    try {
        const token: string = localStorage.getItem("token") || "";
        const response = await fetch(`${url}/api/project/my-projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const deleteProjectService = async (projectId: string) => {
    try {
        const token: string = localStorage.getItem("token") || "";
        const response = await fetch(`${url}/api/project${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }

}
export const createProject = async (CreateProjectRequest:CreateProjectRequest) => {
    try {
        const token: string = localStorage.getItem("token") || "";
        const response = await fetch(`${url}/api/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(CreateProjectRequest)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const getproject = async (id:string)=>{
    try {
        const token: string = localStorage.getItem("token") || "";
        const response = await fetch(`${url}/api/project${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}