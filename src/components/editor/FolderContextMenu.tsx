import type { FolderContextMenuProps } from "../../types/project.types";
import MenuItem from "./MenuItem";


export function FolderContextMenu({
    isOpen,
    position,
    targetFolder,
    onCreateFile,
    onCreateFolder,
    onRename,
    onDelete,
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
            <MenuItem label="Create File" onClick={onCreateFile} />
            <MenuItem label="Create Folder" onClick={onCreateFolder} />
            <MenuItem label="Rename" onClick={onRename} />
            <MenuItem label="Delete" onClick={onDelete} />
        </div>
    );
}