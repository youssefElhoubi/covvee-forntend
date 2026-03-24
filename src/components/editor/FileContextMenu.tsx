import { useState } from "react";
import type { FileContextMenuProps } from "../../types/project.types";
import MenuItem from "./MenuItem";
import { RenameFileModal } from "./popups/RenameFileModal";
import { DeleteFileWarning } from "./popups/DeleteFileWarning";

type FilePopupAction = "rename" | "delete" | null;


export function FileContextMenu({
    isOpen,
    position,
    targetFile,
    handleCloseContextMenu
    
}: FileContextMenuProps) {
    const [activePopup, setActivePopup] = useState<FilePopupAction>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    const handleOpenPopup = (action: Exclude<FilePopupAction, null>) => {
        if (!targetFile) {
            return;
        }

        setSelectedFileName(targetFile.name);
        handleCloseContextMenu();
        setActivePopup(action);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const shouldRenderMenu = isOpen && !!targetFile;

    return (
        <>
            {shouldRenderMenu ? (
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
            ) : null}

            <RenameFileModal
                isOpen={activePopup === "rename"}
                fileName={selectedFileName}
                onClose={closePopup}
            />
            <DeleteFileWarning
                isOpen={activePopup === "delete"}
                file={targetFile}
                onClose={closePopup}
            />
        </>
    );
}
