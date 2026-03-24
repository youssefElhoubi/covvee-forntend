import type { FileResponse } from "./FileResponse";

export interface FilePopupModel{
    isOpen: boolean;
    file: FileResponse|null;
    onClose: () => void;
};
