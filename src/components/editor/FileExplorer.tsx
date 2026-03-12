import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { FolderTree } from "lucide-react";
import { FileTree } from "../file-tree/FileTree";
import type { ProjectDetailResponse } from "../../types/project.types";
import { editorTabsStore } from "../../store/editorTabsStore";
import type { EditorWorkspaceFile } from "../../store/editorTabsStore";
import type { FileResponse, FolderResponse } from "../../types/project.types";
import { FolderContextMenu } from "./FolderContextMenu";

interface ContextMenuState {
    isOpen: boolean;
    x: number;
    y: number;
    folder: FolderResponse | null;
    path: string[];
}

const initialContextMenuState: ContextMenuState = {
    isOpen: false,
    x: 0,
    y: 0,
    folder: null,
    path: [],
};

function closeContextMenu() {
    return initialContextMenuState;
}

function openContextMenu(
    event: ReactMouseEvent<HTMLButtonElement>,
    folder: FolderResponse,
    path: string[]
): ContextMenuState {
    return {
        isOpen: true,
        x: event.clientX,
        y: event.clientY,
        folder,
        path,
    };
}

function getFileFullPath(file: FileResponse, path: string[]) {
    return path.length > 0 ? `${path.join("/")}/${file.name}` : file.name;
}

function resolveWorkspaceFile(
    fileSystem: EditorWorkspaceFile[],
    file: FileResponse,
    path: string[]
) {
    const fullPath = getFileFullPath(file, path);

    return (
        fileSystem.find((candidate) => candidate.id === file.id) ??
        fileSystem.find((candidate) => candidate.fullPath === fullPath)
    );
}

interface FileExplorerProps {
    project: ProjectDetailResponse;
}

export function FileExplorer({ project }: FileExplorerProps) {
    const fileSystem = editorTabsStore((state) => state.fileSystem);
    const activeFileId = editorTabsStore((state) => state.activeFile?.id ?? null);
    const openFile = editorTabsStore((state) => state.openFile);
    const [contextMenu, setContextMenu] = useState<ContextMenuState>(initialContextMenuState);

    const handleCloseContextMenu = () => {
        setContextMenu(closeContextMenu());
    };

    const handleFolderContextMenu = (
        event: ReactMouseEvent<HTMLButtonElement>,
        folder: FolderResponse,
        path: string[]
    ) => {
        setContextMenu(openContextMenu(event, folder, path));
    };

    const handleSelectFile = (file: FileResponse, path: string[]) => {
        const workspaceFile = resolveWorkspaceFile(fileSystem, file, path);

        if (workspaceFile) {
            openFile(workspaceFile);
        }
    };

    const handleCreateFile = () => {
        // Intentionally left as a UI hook for future integration.
        handleCloseContextMenu();
    };

    const handleCreateFolder = () => {
        // Intentionally left as a UI hook for future integration.
        handleCloseContextMenu();
    };

    const handleRename = () => {
        // Intentionally left as a UI hook for future integration.
        handleCloseContextMenu();
    };

    const handleDelete = () => {
        // Intentionally left as a UI hook for future integration.
        handleCloseContextMenu();
    };

    useEffect(() => {
        if (!contextMenu.isOpen) {
            return;
        }

        const handleClickOutside = () => {
            handleCloseContextMenu();
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contextMenu.isOpen]);

    return (
        <>
        <aside className="flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-slate-900/70 backdrop-blur-xl">
            <div className="flex h-12 items-center gap-2 border-b border-white/10 px-4">
                <FolderTree className="h-4 w-4 text-emerald-300" />
                <div className="min-w-0">
                    <p className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Explorer
                    </p>
                    <p className="truncate text-sm text-slate-200">{project.name}</p>
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">
                <FileTree
                    projectData={project}
                    compact={false}
                    selectedFileId={activeFileId}
                    onSelectFile={handleSelectFile}
                    onFolderContextMenu={handleFolderContextMenu}
                />
            </div>
        </aside>

        <FolderContextMenu
            isOpen={contextMenu.isOpen}
            position={{ x: contextMenu.x, y: contextMenu.y }}
            targetFolder={contextMenu.folder}
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onRename={handleRename}
            onDelete={handleDelete}
        />
        </>
    );
}