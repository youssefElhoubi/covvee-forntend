import type { FilePopupModel } from "../../../types/FIlePopupModel";
import { ContextActionModal } from "./ContextActionModal";

export function RenameFileModal({ isOpen, file, onClose }: FilePopupModel) {
    console.log(file);
    
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Rename File"
            description={`Rename the file \"${file?.name}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
