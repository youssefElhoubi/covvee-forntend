import { FileCode2, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { editorTabsStore } from "../../store/editorTabsStore";

export function TabBar() {
    const openFiles = editorTabsStore((state) => state.openFiles);
    const activeFileId = editorTabsStore((state) => state.activeFile?.id ?? null);
    const setActiveFile = editorTabsStore((state) => state.setActiveFile);
    const closeFile = editorTabsStore((state) => state.closeFile);

    if (openFiles.length === 0) {
        return (
            <div className="flex h-11 items-center border-b border-white/10 bg-slate-950/90 px-4 text-sm text-slate-500">
                Open a file from the explorer to start editing.
            </div>
        );
    }

    return (
        <div className="flex h-11 items-stretch overflow-x-auto border-b border-white/10 bg-slate-950/90">
            {openFiles.map((file) => {
                const isActive = file.id === activeFileId;

                return (
                    <button
                        key={file.id}
                        type="button"
                        title={file.fullPath}
                        onClick={() => setActiveFile(file.id)}
                        className={cn(
                            "group inline-flex min-w-0 max-w-56 items-center gap-2 border-r border-white/10 px-4 text-sm transition-colors",
                            isActive
                                ? "bg-slate-900 text-white"
                                : "bg-slate-950 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200"
                        )}
                    >
                        <FileCode2 className="h-4 w-4 shrink-0 text-cyan-300" />
                        <span className="truncate">{file.name}</span>
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={(event) => {
                                event.stopPropagation();
                                closeFile(file.id);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    closeFile(file.id);
                                }
                            }}
                            className="ml-auto rounded p-0.5 text-slate-500 opacity-0 transition hover:bg-slate-800 hover:text-slate-200 group-hover:opacity-100"
                        >
                            <X className="h-3.5 w-3.5" />
                        </span>
                    </button>
                );
            })}
        </div>
    );
}