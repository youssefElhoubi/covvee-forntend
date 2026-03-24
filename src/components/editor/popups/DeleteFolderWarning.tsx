import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function DeleteFolderWarning({
    isOpen,
    folder,
    onClose,
}:FolderPopupModel) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Delete Folder"
            description={`You are about to delete \"${folder?.name}\". This action may remove all nested files and folders.`}
            confirmLabel="Delete"
            destructive
            onClose={onClose}
        />
    );
}
