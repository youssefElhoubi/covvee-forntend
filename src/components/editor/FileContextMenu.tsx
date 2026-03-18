import type { FileContextMenuProps } from "../../types/project.types";
import MenuItem from "./MenuItem";


export function FileContextMenu({
    isOpen,
    position,
    targetFile,
    onRename,
    onDelete,
}: FileContextMenuProps) {
    if (!isOpen || !targetFile) {
        return null;
    }

    return (
        <div
            className="fixed z-50 min-w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
            style={{ left: position.x, top: position.y }}
            onMouseDown={(event) => event.stopPropagation()}
            role="menu"
            aria-label={`File actions for ${targetFile.name}`}
        >
            <MenuItem label="Rename" onClick={onRename} />
            <MenuItem label="Delete" onClick={onDelete} />
        </div>
    );
}
