import type { FileResponse } from "./FileResponse";
import type { FolderResponse } from "./FolderResponse";

// Re-export all project-related types from their original locations
export type { Language } from "./Langauge";
export type { FileResponse } from "./FileResponse";
export type { FolderResponse } from "./FolderResponse";
export type { ProjectDetailResponse } from "./ProjectDetailResponse";

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface FolderContextMenuProps {
  isOpen: boolean;
  position: ContextMenuPosition;
  targetFolder: FolderResponse | null;
  handleCloseContextMenu:()=>void
}

export interface FileContextMenuProps {
  isOpen: boolean;
  position: ContextMenuPosition;
  targetFile: FileResponse | null;
  
  handleCloseContextMenu:()=>void
}

// Layout-specific types
export type SidebarMode = "expanded" | "compact" | "hidden";

export interface BreadcrumbState {
  fileName: string;
  folderPath: string[];
}
