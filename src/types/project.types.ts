// Re-export all project-related types from their original locations
export type { Language } from "./Langauge";
export type { FileResponse } from "./FileResponse";
export type { FolderResponse } from "./FolderResponse";
export type { ProjectDetailResponse } from "./ProjectDetailResponse";

// Layout-specific types
export type SidebarMode = "expanded" | "compact" | "hidden";

export interface BreadcrumbState {
  fileName: string;
  folderPath: string[];
}
