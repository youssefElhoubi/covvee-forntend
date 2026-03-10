import { motion } from "framer-motion";
import { ChevronDown,} from "lucide-react";
import { cn } from "../../utils/cn";
import type { FileResponse, ProjectDetailResponse, SidebarMode } from "../../types/project.types";

import { ComplateProject } from "../project/complateProject";

const SIDEBAR_WIDTH: Record<SidebarMode, number> = {
    expanded: 280,
    compact: 56,
    hidden: 0,
};

interface MultiProjectSidebarProps {
    projects?: ProjectDetailResponse[];
    sidebarMode: SidebarMode;
    selectedFileId: string | null;
    onSelectFile: (file: FileResponse, path: string[], projectName: string) => void;
    onToggleSidebar: () => void;
}


export function SingleProjectSidebar({
    projects,
    sidebarMode,
    selectedFileId,
    onSelectFile,
    onToggleSidebar,
}: MultiProjectSidebarProps) {
    const isCompact = sidebarMode === "compact";

    return (
        <motion.aside
            animate={{ width: SIDEBAR_WIDTH[sidebarMode] }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="h-full shrink-0 overflow-hidden border-r border-white/10 bg-slate-900/75 backdrop-blur-xl"
        >
            <div className="flex h-full flex-col">
                <div className="flex h-12 items-center justify-between border-b border-white/10 px-3">
                    <span
                        className={cn(
                            "text-xs font-semibold uppercase tracking-[0.14em] text-slate-400",
                            isCompact ? "mx-auto" : ""
                        )}
                    >
                        {isCompact ? "P" : "Projects"}
                    </span>
                    {!isCompact && (
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100"
                            title="Toggle sidebar"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {projects?.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-500">No projects available</div>
                    ) : (
                        projects?.map((project) => (
                            <ComplateProject
                                key={project.id}
                                project={project}
                                compact={isCompact}
                                selectedFileId={selectedFileId}
                                onSelectFile={onSelectFile}
                            />
                        ))
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
