import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function CreateFileModal({ isOpen, folder, onClose }: FolderPopupModel) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Create File"
            description={`Create a new file inside \"${folder?.name}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
