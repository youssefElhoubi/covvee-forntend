import type { FolderContextMenuProps } from "../../types/project.types";
import MenuItem from "./MenuItem";


export function FolderContextMenu({
    isOpen,
    position,
    targetFolder,
    handleCloseContextMenu,
}: FolderContextMenuProps) {
    if (!isOpen || !targetFolder) {
        return null;
    }
    console.log(targetFolder);
    

    return (
        <div
            className="fixed z-50 min-w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
            style={{ left: position.x, top: position.y }}
            onMouseDown={(event) => event.stopPropagation()}
            role="menu"
            aria-label={`Folder actions for ${targetFolder.name}`}
        >
            <MenuItem label="Create File" onClick={handleCloseContextMenu} />
            <MenuItem label="Create Folder" onClick={handleCloseContextMenu} />
            <MenuItem label="Rename" onClick={handleCloseContextMenu} />
            <MenuItem label="Delete" onClick={handleCloseContextMenu} />
        </div>
    );
}