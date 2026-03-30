import { useEffect, useState } from "react";
import type { FileContextMenuProps, FolderResponse } from "../../types/project.types";
import MenuItem from "./MenuItem";
import { RenameFileModal } from "./popups/RenameFileModal";
import { DeleteFileWarning } from "./popups/DeleteFileWarning";
import { getfolder } from "../../services/FolderService";

type FilePopupAction = "rename" | "delete" | null;


export function FileContextMenu({
    isOpen,
    position,
    targetFile,
    handleCloseContextMenu
}: FileContextMenuProps) {
    const [targetFolder, setTargetFolder] = useState<FolderResponse | null>(null);
    const [activePopup, setActivePopup] = useState<FilePopupAction>(null);
    const [selectedFile, setSelectedFile] = useState<typeof targetFile | null>(null);
    const getparent = async () => {
        if(targetFile){
            const responce = await getfolder(targetFile.parentId);
            setTargetFolder(responce);            
        }
    };
    useEffect(() => {
        getparent();
        
    }, [targetFile])
    
    
    const handleOpenPopup = (action: Exclude<FilePopupAction, null>) => {
        if (!targetFile) return;

        setSelectedFile(targetFile); // ✅ store it locally FIRST
        handleCloseContextMenu();    // then close menu
        setActivePopup(action);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const shouldRenderMenu = isOpen && !!targetFile;
    

    return (
        <>
            {shouldRenderMenu && (
                <div
                    className="fixed z-50 min-w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
                    style={{ left: position.x, top: position.y }}
                    onMouseDown={(event) => event.stopPropagation()}
                    role="menu"
                    aria-label={`File actions for ${targetFile.name}`}
                >
                    <MenuItem label="Rename" onClick={() => handleOpenPopup("rename")} />
                    <MenuItem label="Delete" onClick={() => handleOpenPopup("delete")} />
                </div>
            )}

            {/* ✅ Only mount the Rename Modal if we clicked Rename */}
            {activePopup === "rename" && (
                <RenameFileModal
                    isOpen={true} 
                    file={selectedFile}
                    folder={targetFolder}
                    onClose={closePopup}
                />
            )}

            {/* ✅ Only mount the Delete Modal if we clicked Delete */}
            {activePopup === "delete" && (
                <DeleteFileWarning
                    isOpen={true} 
                    file={selectedFile}
                    folder={targetFolder}
                    onClose={closePopup}
                />
            )}
        </>
    );
}
