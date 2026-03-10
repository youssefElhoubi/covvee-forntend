import type { FileResponse } from "./FileResponse";

export interface FolderResponse {
    id: string;
    name: string;
    parentId: string | null;
    children: FolderResponse[];
    files: FileResponse[];
}
