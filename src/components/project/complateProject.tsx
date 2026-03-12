import { useState } from "react";
import type { FileResponse } from "../../types/FileResponse";
import type { ProjectDetailResponse } from "../../types/ProjectDetailResponse";
import { ChevronDown, ChevronRight, Code2 } from "lucide-react";
import { FileTree } from "../file-tree/FileTree";

export function ComplateProject({
    project,
    compact,
    selectedFileId,
    onSelectFile,
}: {
    project: ProjectDetailResponse;
    compact: boolean;
    selectedFileId: string | null;
    onSelectFile: (file: FileResponse, path: string[], projectName: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(true);

    if (compact) {
        return (
            <div className="flex flex-col items-center py-2 gap-1">
                <div className="rounded-lg border border-white/10 bg-linear-to-br from-emerald-400/20 to-cyan-500/20 p-2">
                    <Code2 className="h-4 w-4 text-emerald-300" />
                </div>
            </div>
        );
    }

    return (
        <div className="mb-2">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-all hover:bg-slate-800/50"
            >
                {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                )}
                <div className="rounded-md border border-white/10 bg-linear-to-br from-emerald-400/20 to-cyan-500/20 p-1.5">
                    <Code2 className="h-3.5 w-3.5 text-emerald-300" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-100">{project?.name}</div>
                    <div className="text-xs text-slate-500">{project?.language}</div>
                </div>
            </button>

            {isOpen && (
                <div className="mt-1 pl-3">
                    <FileTree
                        projectData={project}
                        compact={false}
                        selectedFileId={selectedFileId}
                        onSelectFile={(file, path) => onSelectFile(file, path, project.name)}
                    />
                </div>
            )}
        </div>
    );
}
