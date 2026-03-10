import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Code2 } from 'lucide-react';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col items-center justify-center px-6 overflow-hidden">

            {/* Background glows — mirrors hero.tsx */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-125 h-100 bg-violet-500/10 rounded-full blur-[120px] -z-10" />

            {/* Logo */}
            <motion.div
                className="mb-12 flex items-center gap-2 font-bold text-2xl tracking-tighter text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Code2 className="text-slate-950 w-5 h-5" />
                </div>
                Covvee
            </motion.div>

            {/* 404 heading */}
            <motion.h1
                className="text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-500 select-none"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                404
            </motion.h1>

            {/* Divider */}
            <motion.div
                className="w-16 h-px bg-slate-700 my-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Message */}
            <motion.div
                className="text-center space-y-3 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Page not found
                </h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
            </motion.div>

            {/* CTA */}
            <motion.button
                onClick={() => navigate('/')}
                className="mt-10 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-base transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                <Home className="w-5 h-5" />
                Return to Homepage
            </motion.button>

            {/* Subtle footer note */}
            <motion.p
                className="mt-16 text-slate-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                Error 404 — Resource not found
            </motion.p>
        </div>
    );
}
