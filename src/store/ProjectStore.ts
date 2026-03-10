import { create } from "zustand";
import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";
import { deleteProjectService, getProjects } from "../services/ProjectService";

type projectStore = {
    projects: ProjectDetailResponse[],
    isLoading: boolean,
    error: any,
}

export const projectStore = create<projectStore>((set) => ({
    projects: [],
    isLoading: false,
    error: null,
    fetchProjects: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await getProjects();
            set({ projects: response, error: null, isLoading: false })
        } catch (error) {
            set({ error, isLoading: false })
        }
    },
    deleteProject: async (projectId: string) => {
        set({ isLoading: true, error: null })
        try {
            await deleteProjectService(projectId);

            set((state) => ({
                projects: state.projects.filter((project) => project.id !== projectId),
                error: null,
                isLoading: false
            }))
        } catch (error) {
            set({ error, isLoading: false })
        }

    }
}))