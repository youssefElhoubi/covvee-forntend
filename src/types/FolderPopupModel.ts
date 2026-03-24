import type { FolderResponse } from "./FolderResponse";

export interface FolderPopupModel {
    isOpen: boolean;
        folder: FolderResponse | null;
        onClose: () => void;
}