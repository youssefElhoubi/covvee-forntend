import { motion} from 'framer-motion';
import { ChevronRight, Code2, Github, Terminal } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-200 h-150 bg-violet-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6">
                            v2.0 Now Available
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Code. Execute. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-500">
                                Iterate. Instantly.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            The next-generation web editor for developers. Write code in the browser, execute it in real-time, and ship faster than ever before.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                            Open Editor
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            <Github className="w-5 h-5" />
                            Read the Docs
                        </button>
                    </motion.div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>10k+ Active Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                            <span>Open Source</span>
                        </div>
                    </div>
                </div>

                {/* Editor Mockup */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div className="relative z-10 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                        {/* Editor Header */}
                        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="text-xs text-slate-500 font-mono">App.tsx</div>
                            <div className="w-4" /> {/* Spacer for balance */}
                        </div>

                        {/* Editor Body */}
                        <div className="p-6 font-mono text-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Code2 className="w-32 h-32 text-slate-700" />
                            </div>

                            {/* Code Lines */}
                            <div className="space-y-1 relative z-10">
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">1</span>
                                    <span><span className="text-purple-400">import</span> <span className="text-cyan-300">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">2</span>
                                    <span />
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">3</span>
                                    <span><span className="text-purple-400">export default function</span> <span className="text-yellow-300">App</span>() {'{'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">4</span>
                                    <span className="pl-4"><span className="text-purple-400">const</span> [count, setCount] = <span className="text-yellow-300">useState</span>(<span className="text-orange-400">0</span>);</span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">5</span>
                                    <span />
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">6</span>
                                    <span className="pl-4"><span className="text-purple-400">return</span> (</span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">7</span>
                                    <span className="pl-8"><span className="text-slate-300">&lt;</span><span className="text-cyan-300">div</span> <span className="text-sky-300">className</span>=<span className="text-green-400">"p-4"</span><span className="text-slate-300">&gt;</span></span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">8</span>
                                    <span className="pl-12"><span className="text-slate-300">&lt;</span><span className="text-cyan-300">h1</span><span className="text-slate-300">&gt;</span>Hello Covvee<span className="text-slate-300">&lt;/</span><span className="text-cyan-300">h1</span><span className="text-slate-300">&gt;</span></span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">9</span>
                                    <span className="pl-8"><span className="text-slate-300">&lt;/</span><span className="text-cyan-300">div</span><span className="text-slate-300">&gt;</span></span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">10</span>
                                    <span className="pl-4">);</span>
                                </div>
                                <div className="flex">
                                    <span className="text-slate-600 w-8 select-none">11</span>
                                    <span>{'}'}</span>
                                </div>
                            </div>

                            {/* Cursor Animation */}
                            <motion.div
                                className="absolute w-2 h-5 bg-emerald-500 top-42 left-45"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>

                        {/* Terminal Output Overlay */}
                        <div className="bg-slate-950 border-t border-slate-800 p-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                <Terminal className="w-3 h-3" />
                                <span>TERMINAL</span>
                            </div>
                            <div className="font-mono text-xs text-slate-300">
                                <span className="text-green-400">➜</span> npm run dev
                                <br />
                                <span className="text-slate-500"> ready started server on 0.0.0.0:3000, url: http://localhost:3000</span>
                                <br />
                                <span className="text-slate-500">- event compiled client and server successfully in 124 ms (156 modules)</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements behind editor */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
};