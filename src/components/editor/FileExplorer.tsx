import { FolderTree } from "lucide-react";
import { FileTree } from "../file-tree/FileTree";
import type { ProjectDetailResponse } from "../../types/project.types";
import { editorTabsStore } from "../../store/editorTabsStore";

interface FileExplorerProps {
    project: ProjectDetailResponse;
}

export function FileExplorer({ project }: FileExplorerProps) {
    const fileSystem = editorTabsStore((state) => state.fileSystem);
    const activeFileId = editorTabsStore((state) => state.activeFile?.id ?? null);
    const openFile = editorTabsStore((state) => state.openFile);

    return (
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
                    onSelectFile={(file, path) => {
                        const fullPath = path.length > 0 ? `${path.join("/")}/${file.name}` : file.name;
                        const workspaceFile =
                            fileSystem.find((candidate) => candidate.id === file.id) ??
                            fileSystem.find((candidate) => candidate.fullPath === fullPath);

                        if (workspaceFile) {
                            openFile(workspaceFile);
                        }
                    }}
                />
            </div>
        </aside>
    );
}