import type { FilePopupModel } from "../../../types/FIlePopupModel";
import { RenameFileForm } from "../RenameFileForm";

export function RenameFileModal({ isOpen, file, onClose }: FilePopupModel) {
    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <RenameFileForm file={file} close={onClose} />
                </div>}
        </>
    );
}
