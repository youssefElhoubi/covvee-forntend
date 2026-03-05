import { motion } from "framer-motion";
import type { ProjectDetailResponse } from "../../../utils/ProjectDetailResponse";
import { ChevronRight, Clock, Code2, FileCode, MoreVertical } from "lucide-react";
import { LanguageBadge } from "./LanguageBadge";
import type { FileResponse } from "../../../utils/FileResponse";
import { RecursiveFolder } from "./RecursiveFolder";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12
        }
    }
} as const;

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

export function ProjectCard({ project }: { project: ProjectDetailResponse }) {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300 shadow-xl shadow-black/20 flex flex-col h-150"
        >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                        <Code2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-emerald-100 transition-colors">
                            {project.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <LanguageBadge lang={project.language} />
                        </div>
                    </div>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors p-1">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* File System Tree Container */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                    <span>File Explorer</span>
                    <div className="h-px bg-slate-800 flex-1" />
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="bg-slate-950/30 rounded-xl border border-slate-800/50 p-3 min-h-full">
                        {/* Root Files */}
                        {project.rootFiles.map((file) => (
                            <FileItem key={file.id} file={file} />
                        ))}

                        {/* Root Folders (Recursive) */}
                        {project.rootFolders.map((folder) => (
                            <RecursiveFolder key={folder.id} folder={folder} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} />
                    <span>Updated just now</span>
                </div>
                <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors group/btn">
                    Open Editor
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}