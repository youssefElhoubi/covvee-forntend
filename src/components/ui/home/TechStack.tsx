
import { motion } from 'framer-motion';
export const TechStack = () => {
    const technologies = [
        "JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C++", "Ruby", "PHP", "Swift", "Kotlin", "React"
    ];

    return (
        <section className="py-12 bg-slate-950 border-y border-slate-900 overflow-hidden">
            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-slate-950 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-slate-950 to-transparent z-10" />

                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear"
                    }}
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xl font-bold text-slate-300">{tech}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};