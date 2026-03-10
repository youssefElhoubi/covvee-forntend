import { useForm } from "react-hook-form";
import type z from "zod";
import { loginSchema } from "../zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from 'framer-motion';
import { ArrowRight, Chrome, Code2, Github, Lock, Mail } from "lucide-react";
import { InputField } from "../components/ui/formes/InputField";
import { login } from "../services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type LoginFormData = z.infer<typeof loginSchema>;
export const LoginPage = () => {
    const navigator = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const [error, setError] = useState<string|null>(null)

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data);
            localStorage.setItem("token", result.token);
            navigator("/dashboard");
        } catch (error) {
            console.log(error);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo Header */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-2xl text-white">
                        <div className="w-10 h-10 bg-linear-to-brrom-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Code2 className="text-slate-950 w-6 h-6" />
                        </div>
                        Covvee
                    </div>
                </div>

                {/* Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
                        <p className="text-slate-400 text-sm">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="name@company.com"
                            icon={<Mail size={18} />}
                            error={errors.email?.message}
                            {...register("email")}
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20" />
                                Remember me
                            </label>
                            <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium">
                                Forgot password?
                            </a>
                        </div>
                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-red-400 ml-1"
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900/50 px-2 text-slate-500 backdrop-blur-sm">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                                <Chrome size={18} />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                                <Github size={18} />
                                <span className="text-sm font-medium">GitHub</span>
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-8 text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
                        Sign up for free
                    </a>
                </p>
            </motion.div>
        </div>
    );
};