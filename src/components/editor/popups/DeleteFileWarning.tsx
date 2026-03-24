import type { FilePopupModel } from "../../../types/FIlePopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function DeleteFileWarning({ isOpen, file, onClose }:FilePopupModel) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Delete File"
            description={`You are about to delete \"${file?.name}\".`}
            confirmLabel="Delete"
            destructive
            onClose={onClose}
        />
    );
}
