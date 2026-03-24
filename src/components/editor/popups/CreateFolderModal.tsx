import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { CreateFolderForm } from "../CreateFolderForm";


export function CreateFolderModal({ isOpen, folder, onClose }: FolderPopupModel
) {
    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <CreateFolderForm folder={folder} close={onClose} />
                </div>}
        </>
    );
}
