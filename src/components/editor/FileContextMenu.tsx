import type { FileContextMenuProps } from "../../types/project.types";

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
