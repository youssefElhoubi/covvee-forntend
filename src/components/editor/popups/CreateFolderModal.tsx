import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function CreateFolderModal({ isOpen, folder, onClose }:FolderPopupModel
) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Create Folder"
            description={`Create a nested folder inside \"${folder?.name}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
