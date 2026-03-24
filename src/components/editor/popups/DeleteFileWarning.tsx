import { DeleteFile } from "../../../services/fileservice";
import type { FilePopupModel } from "../../../types/FIlePopupModel";
import { ContextActionModal } from "./ContextActionModal";


export function DeleteFileWarning({ isOpen, file, onClose,folder }:FilePopupModel) {
    const deletePayload = {
        fileId: file?.id,     // ✅ Safely grab the string ID
        folderId: folder?.id  // ✅ Safely grab the string ID
    };

    
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Delete File"
            description={`You are about to delete \"${file?.name}\".`}
            confirmLabel="Delete"
            destructive
            onClose={onClose}
            onConfirm={()=>{
                DeleteFile(deletePayload);
            }}
        >
        </ContextActionModal>

    );
}
