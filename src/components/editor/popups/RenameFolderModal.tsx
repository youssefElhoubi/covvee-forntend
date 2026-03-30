import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { RenameFolderForm } from "../RenameFolderForm";

export function RenameFolderModal({ isOpen, folder, onClose }:FolderPopupModel
) {
    return (
            <>
                {isOpen &&
                    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                        <RenameFolderForm folder={folder} close={onClose} />
                    </div>}
            </>
        );
}
