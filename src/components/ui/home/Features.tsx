import {
    Code2,
    Zap,
    Shield,
    Globe,
    Cpu,
    Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Features = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            title: "Lightning Fast Execution",
            description: "Run your code instantly with our optimized cloud infrastructure. No local setup required."
        },
        {
            icon: <Globe className="w-6 h-6 text-cyan-400" />,
            title: "Multi-Language Support",
            description: "From JavaScript to Python, Rust to Go. Support for 50+ languages out of the box."
        },
        {
            icon: <Shield className="w-6 h-6 text-emerald-400" />,
            title: "Secure Sandboxing",
            description: "Every execution runs in an isolated, secure container to protect your system."
        },
        {
            icon: <Layers className="w-6 h-6 text-violet-400" />,
            title: "IntelliSense & Linting",
            description: "Smart code completion, error highlighting, and refactoring tools built-in."
        },
        {
            icon: <Cpu className="w-6 h-6 text-pink-400" />,
            title: "Real-time Collaboration",
            description: "Code together with your team in real-time, just like in Google Docs."
        },
        {
            icon: <Code2 className="w-6 h-6 text-blue-400" />,
            title: "Git Integration",
            description: "Connect your GitHub or GitLab repos and deploy directly from the editor."
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything you need to build faster
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Stop wrestling with environments. Start shipping code with tools designed for modern development.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};