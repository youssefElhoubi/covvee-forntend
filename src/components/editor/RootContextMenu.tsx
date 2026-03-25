import { useState } from "react";
import MenuItem from "./MenuItem"; // Adjust import path if needed
import { CreateFileForm } from "./CreateFileForm"; 
import { CreateFolderForm } from "./CreateFolderForm"; 

interface RootContextMenuProps {
    isOpen: boolean;
    position: { x: number; y: number };
    handleCloseContextMenu: () => void;
}

type RootPopupAction = "file" | "folder" | null;

export function RootContextMenu({ isOpen, position, handleCloseContextMenu }: RootContextMenuProps) {
    const [activePopup, setActivePopup] = useState<RootPopupAction>(null);

    const handleOpenPopup = (action: RootPopupAction) => {
        handleCloseContextMenu(); // Close the right-click menu
        setActivePopup(action);   // Open the modal
    };

    const closePopup = () => setActivePopup(null);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed z-50 min-w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
                    style={{ left: position.x, top: position.y }}
                    onMouseDown={(event) => event.stopPropagation()}
                    role="menu"
                >
                    <MenuItem label="New File" onClick={() => handleOpenPopup("file")} />
                    <MenuItem label="New Folder" onClick={() => handleOpenPopup("folder")} />
                </div>
            )}

            {/* Render the Modals. Notice we pass folder={null} for root creation */}
            {activePopup === "file" && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <CreateFileForm folder={null} close={closePopup} />
                </div>
            )}

            {activePopup === "folder" && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <CreateFolderForm folder={null} close={closePopup} />
                </div>
            )}
        </>
    );
}