import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "../../utils/cn";
import type { FileResponse, FolderResponse } from "../../types/project.types";
import { FileNode } from "./FileNode";

const folderTreeVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

interface FolderNodeProps {
  folder: FolderResponse;
  depth: number;
  compact: boolean;
  onSelectFile: (file: FileResponse, folderPath: string[]) => void;
  onFolderToggle: (folderId: string, isOpen: boolean) => void;
  selectedFileId: string | null;
}

export function FolderNode({
  folder,
  depth,
  compact,
  onSelectFile,
  onFolderToggle,
  selectedFileId,
}: FolderNodeProps) {
  const [isOpen, setIsOpen] = useState(depth < 1);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onFolderToggle(folder.id, next);
  };

  const hasChildren = folder.children.length > 0 || folder.files.length > 0;

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        title={compact ? folder.name : undefined}
        className={cn(
          "group flex w-full items-center rounded-md py-1.5 text-left text-sm transition-colors",
          "hover:bg-slate-800/50",
          compact ? "justify-center px-2" : "px-2 text-slate-200"
        )}
        style={compact ? undefined : { paddingLeft: `${depth * 14 + 10}px` }}
      >
        {compact ? null : hasChildren ? (
          isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          )
        ) : (
          <span className="h-3.5 w-3.5" />
        )}

        {isOpen ? (
          <FolderOpen className="h-4 w-4 shrink-0 text-emerald-300" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-emerald-300" />
        )}

        {!compact ? <span className="ml-2 truncate">{folder.name}</span> : null}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !compact ? (
          <motion.div
            variants={folderTreeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="ml-2 border-l border-white/10 pl-2">
              {folder.children.map((child) => (
                <FolderNode
                  key={child.id}
                  folder={child}
                  depth={depth + 1}
                  compact={compact}
                  onSelectFile={(file, path) => onSelectFile(file, [folder.name, ...path])}
                  onFolderToggle={onFolderToggle}
                  selectedFileId={selectedFileId}
                />
              ))}
              {folder.files.map((file) => (
                <FileNode
                  key={file.id}
                  file={file}
                  depth={depth + 1}
                  onSelect={() => onSelectFile(file, [folder.name])}
                  isCompact={compact}
                  isSelected={selectedFileId === file.id}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
