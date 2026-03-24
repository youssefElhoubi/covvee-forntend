import { useState } from "react";
import type { FolderContextMenuProps } from "../../types/project.types";
import MenuItem from "./MenuItem";
import { CreateFileModal } from "./popups/CreateFileModal";
import { CreateFolderModal } from "./popups/CreateFolderModal";
import { RenameFolderModal } from "./popups/RenameFolderModal";
import { DeleteFolderWarning } from "./popups/DeleteFolderWarning";

type FolderPopupAction = "create-file" | "create-folder" | "rename" | "delete" | null;

export function FolderContextMenu({
    isOpen,
    position,
    targetFolder,
    handleCloseContextMenu,
}: FolderContextMenuProps) {
    const [activePopup, setActivePopup] = useState<FolderPopupAction>(null);
    
    const handleOpenPopup = (action: Exclude<FolderPopupAction, null>) => {
        if (!targetFolder) {
            return;
        }
        handleCloseContextMenu();
        setActivePopup(action);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const shouldRenderMenu = isOpen && !!targetFolder;

    return (
        <>
            {shouldRenderMenu ? (
                <div
                    className="fixed z-50 min-w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
                    style={{ left: position.x, top: position.y }}
                    onMouseDown={(event) => event.stopPropagation()}
                    role="menu"
                    aria-label={`Folder actions for ${targetFolder.name}`}
                >
                    <MenuItem label="Create File" onClick={() => handleOpenPopup("create-file")} />
                    <MenuItem
                        label="Create Folder"
                        onClick={() => handleOpenPopup("create-folder")}
                    />
                    <MenuItem label="Rename" onClick={() => handleOpenPopup("rename")} />
                    <MenuItem label="Delete" onClick={() => handleOpenPopup("delete")} />
                </div>
            ) : null}

            <CreateFileModal
                isOpen={activePopup === "create-file"}
                folder={targetFolder}
                onClose={closePopup}
            />
            <CreateFolderModal
                isOpen={activePopup === "create-folder"}
                folder={targetFolder}
                onClose={closePopup}
            />
            <RenameFolderModal
                isOpen={activePopup === "rename"}
                folder={targetFolder}
                onClose={closePopup}
            />
            <DeleteFolderWarning
                isOpen={activePopup === "delete"}
                folder={targetFolder}
                onClose={closePopup}
            />
        </>
    );
}