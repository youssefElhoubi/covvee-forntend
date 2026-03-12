import type { FolderResponse } from "../../types/project.types";

interface FolderContextMenuPosition {
    x: number;
    y: number;
}

interface FolderContextMenuProps {
    isOpen: boolean;
    position: FolderContextMenuPosition;
    targetFolder: FolderResponse | null;
    onCreateFile: () => void;
    onCreateFolder: () => void;
    onRename: () => void;
    onDelete: () => void;
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100"
        >
            {label}
        </button>
    );
}

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