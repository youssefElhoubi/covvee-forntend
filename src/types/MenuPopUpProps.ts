import type { FileResponse } from "./FileResponse";
import type { FolderResponse } from "./FolderResponse";

export interface MenuPopUpProps {
    isOpen: boolean;
    folderName: FileResponse|FolderResponse|null;
    onClose: () => void;
}
