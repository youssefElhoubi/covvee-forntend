import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Code2 } from "lucide-react";
import { cn } from "../../utils/cn";
import type { FileResponse, ProjectDetailResponse, SidebarMode } from "../../types/project.types";
import { FileTree } from "../file-tree/FileTree";

const SIDEBAR_WIDTH: Record<SidebarMode, number> = {
  expanded: 280,
  compact: 56,
  hidden: 0,
};

interface MultiProjectSidebarProps {
  projects: ProjectDetailResponse[];
  sidebarMode: SidebarMode;
  selectedFileId: string | null;
  onSelectFile: (file: FileResponse, path: string[], projectName: string) => void;
  onToggleSidebar: () => void;
}

function ProjectSection({
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
          <div className="truncate text-sm font-semibold text-slate-100">{project.name}</div>
          <div className="text-xs text-slate-500">{project.language}</div>
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

export function MultiProjectSidebar({
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
          {projects.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No projects available</div>
          ) : (
            projects.map((project) => (
              <ProjectSection
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
