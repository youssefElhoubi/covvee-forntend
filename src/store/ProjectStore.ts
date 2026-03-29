import { create } from "zustand";
import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";
import { deleteProjectService, getproject, getProjects } from "../services/ProjectService";
import { search } from './../services/ProjectService';
import type { Page } from "../types/pageType";

type ProjectStoreState = {
    project: ProjectDetailResponse | null;
    projects: ProjectDetailResponse[];
    isLoading: boolean;
    searchProjects:Page<ProjectDetailResponse>|null
    error: unknown;
    fetchProjects: () => Promise<void>;
    deleteProject: (projectId: string) => Promise<void>;
    getproject: (id: string) => Promise<void>;
    searchProject :(query: string) => Promise<void>;
};

export const projectStore = create<ProjectStoreState>((set) => ({
    project: null,
    projects: [],
    isLoading: false,
    searchProjects:null,
    error: null,
    fetchProjects: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await getProjects();
            set({ projects: response, error: null, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
    deleteProject: async (projectId: string) => {
        set({ isLoading: true, error: null });

        try {
            await deleteProjectService(projectId);

            set((state) => ({
                projects: state.projects.filter((project) => project.id !== projectId),
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
    getproject: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
            const project = await getproject(id);
            set({ project, error: null, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    },
    searchProject:async (query: string)=>{
        set({ isLoading: true, error: null });
        
        try {
            const searchProjects = await search(query);
            
            set({ searchProjects, error: null, isLoading: false });
        } catch (error) {
            set({ error, isLoading: false });
        }
    }
}));
