import { create } from "zustand";
import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";
import { deleteProjectService, getproject, getProjects } from "../services/ProjectService";

type projectStore = {
    project: ProjectDetailResponse | null,
    projects: ProjectDetailResponse[],
    isLoading: boolean,
    error: any,
    fetchProjects: () => void,
    deleteProject: (projectId: string) => void
    getproject: (Id: string) => void
}

export const projectStore = create<projectStore>((set) => ({
    project: null,
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
    },
    getproject: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
            const project = await getproject(id);
            set({ project, error: null, isLoading: false })
        } catch (error) {
            set({ error, isLoading: false })
        }
    }
}))