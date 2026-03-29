import type { ExecutionResult } from "../types/ExecutionResult";

const url = import.meta.env.VITE_API_URL;

export const execute = async (params: string): Promise<ExecutionResult> => {
    
    try {
        // Use empty string instead of literal "null" for safety
        const token: string = localStorage.getItem("token") || ""; 
        
        const response = await fetch(`${url}/execute/project`, {
            method: "POST", // Capitalized convention
            body: params,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        // Crucial: Throw an error if the server crashes so the UI can catch it!
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Execution error:", error);
        throw error;
    }
}