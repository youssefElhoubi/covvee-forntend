import { motion} from 'framer-motion';
import {
    Plus,
    Search,
    LayoutGrid,
    List
} from 'lucide-react';
import { MOCK_PROJECTS } from '../utils/MOCK_PROJECTS';
import { ProjectCard } from '../components/ui/Project/ProjectCard';



// --- Main Page Component ---

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};


export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans selection:bg-emerald-500/30">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            My Projects
                        </h1>
                        <p className="text-slate-400">
                            Manage your workspaces and file systems.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-full md:w-64 transition-all"
                            />
                        </div>
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                            <Plus size={18} />
                            <span className="hidden sm:inline">New Project</span>
                        </button>
                    </div>
                </motion.div>

                {/* Controls Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/30 p-1 rounded-lg border border-slate-800/50">
                        <button className="p-2 rounded-md bg-slate-800 text-white shadow-sm">
                            <LayoutGrid size={16} />
                        </button>
                        <button className="p-2 rounded-md hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                            <List size={16} />
                        </button>
                    </div>
                    <div className="text-sm text-slate-500">
                        Showing {MOCK_PROJECTS.length} projects
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {MOCK_PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

// --- Sub-Component: Project Card ---

