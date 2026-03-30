import type { FolderPopupModel } from "../../../types/FolderPopupModel";
import { CreateFileForm } from "../CreateFileForm";


export function CreateFileModal({ isOpen, folder, onClose }: FolderPopupModel) {
    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <CreateFileForm folder={folder} close={onClose} />
                </div>}
        </>
    );
}
