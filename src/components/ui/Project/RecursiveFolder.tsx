import { useState } from "react";
import type { FolderResponse } from "../../../types/FolderResponse";
import { cn } from "../../../utils/cn";
import { ChevronDown, ChevronRight, FileCode, Folder, FolderOpen } from "lucide-react";
import { AnimatePresence ,motion} from "framer-motion";
import type { FileResponse } from "../../../types/FileResponse";


const FileItem = ({ file }: { file: FileResponse }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="group flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-slate-800/50 cursor-pointer transition-colors"
    >
        <FileCode size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
        <span className="text-sm text-slate-400 group-hover:text-slate-200 font-mono truncate">
            {file.name}
        </span>
    </motion.div>
);


export const RecursiveFolder = ({ folder, depth = 0 }: { folder: FolderResponse; depth?: number }) => {
    const [isOpen, setIsOpen] = useState(depth < 2); // Auto-open first 2 levels

    const hasContent = folder.children.length > 0 || folder.files.length > 0;

    return (
        <div className="select-none">
            <div
                onClick={() => hasContent && setIsOpen(!isOpen)}
                className={cn(
                    "group flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors cursor-pointer",
                    isOpen ? "bg-slate-800/30" : "hover:bg-slate-800/30"
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                {hasContent ? (
                    isOpen ? (
                        <ChevronDown size={14} className="text-slate-500" />
                    ) : (
                        <ChevronRight size={14} className="text-slate-500" />
                    )
                ) : (
                    <span className="w-3.5" /> // Spacer for alignment
                )}

                {isOpen ? (
                    <FolderOpen size={16} className="text-blue-400" />
                ) : (
                    <Folder size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                )}

                <span className={cn(
                    "text-sm font-medium transition-colors",
                    isOpen ? "text-slate-200" : "text-slate-400 group-hover:text-slate-200"
                )}>
                    {folder.name}
                </span>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="border-l border-slate-800/50 ml-4">
                            {/* Render Sub-Folders Recursively */}
                            {folder.children.map((childFolder) => (
                                <RecursiveFolder
                                    key={childFolder.id}
                                    folder={childFolder}
                                    depth={depth + 1}
                                />
                            ))}

                            {/* Render Files */}
                            {folder.files.map((file) => (
                                <div key={file.id} style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}>
                                    <FileItem file={file} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};