import type { FileResponse } from "./FileResponse";
import type { FolderResponse } from "./FolderResponse";

export interface FilePopupModel{
    isOpen: boolean;
    file: FileResponse|null;
    folder:FolderResponse|null
    onClose: () => void;
};
