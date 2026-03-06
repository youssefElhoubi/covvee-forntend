import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../utils/cn";
import type { FileResponse, ProjectDetailResponse, SidebarMode } from "../../types/project.types";
import { FileTree } from "../file-tree/FileTree";

const SIDEBAR_WIDTH: Record<SidebarMode, number> = {
  expanded: 280,
  compact: 56,
  hidden: 0,
};

interface SidebarProps {
  projectData: ProjectDetailResponse;
  sidebarMode: SidebarMode;
  selectedFileId: string | null;
  onSelectFile: (file: FileResponse, path: string[]) => void;
  onToggleSidebar: () => void;
}

export function Sidebar({
  projectData,
  sidebarMode,
  selectedFileId,
  onSelectFile,
  onToggleSidebar,
}: SidebarProps) {
  const isCompact = sidebarMode === "compact";
  const sidebarHeaderTitle = isCompact
    ? projectData.name.slice(0, 1).toUpperCase()
    : projectData.name;

  return (
    <motion.aside
      animate={{ width: SIDEBAR_WIDTH[sidebarMode] }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      className="h-full shrink-0 overflow-hidden border-r border-white/10 bg-slate-900/75 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-2">
          <span
            className={cn(
              "truncate text-xs font-semibold uppercase tracking-[0.14em] text-slate-400",
              isCompact ? "mx-auto" : "px-2"
            )}
          >
            {sidebarHeaderTitle}
          </span>
          {!isCompact ? (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <FileTree
            projectData={projectData}
            compact={isCompact}
            selectedFileId={selectedFileId}
            onSelectFile={onSelectFile}
          />
        </div>
      </div>
    </motion.aside>
  );
}
