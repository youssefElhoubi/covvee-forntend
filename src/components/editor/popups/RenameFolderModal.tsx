import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function RenameFolderModal({ isOpen, folder, onClose }:FolderPopupModel
) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Rename Folder"
            description={`Rename the folder \"${folder?.name}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
