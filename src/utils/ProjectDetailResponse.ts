import type { Language } from "../types/Langauge";
import type { FileResponse } from "./FileResponse";
import type { FolderResponse } from "./FolderResponse";

export interface ProjectDetailResponse {
    id: string;
    name: string;
    language: Language;
    rootFiles: FileResponse[];
    rootFolders: FolderResponse[];
}
