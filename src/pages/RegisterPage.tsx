import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Mail,
    Lock,
    User,
    Github,
    Chrome,
    ArrowRight,
    Code2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { InputField } from '../components/ui/formes/InputField';
import { registerSchema } from '../zod/registerSchema';

// --- Reusable UI Component: InputField ---

InputField.displayName = "InputField";


type RegisterFormData = z.infer<typeof registerSchema>;

// --- Page Components ---


export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Register Data:", data);
        alert("Account Created! (Check console)");
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo Header */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-2xl text-white">
                        <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <Code2 className="text-slate-950 w-6 h-6" />
                        </div>
                        Covvee
                    </div>
                </div>

                {/* Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
                        <p className="text-slate-400 text-sm">Start your journey with Covvee today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={<User size={18} />}
                            error={errors.fullName?.message}
                            {...register("fullName")}
                        />

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

                        <InputField
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />

                        <div className="flex items-start gap-2 text-sm">
                            <input
                                type="checkbox"
                                className="mt-1 rounded border-slate-700 bg-slate-800 text-violet-500 focus:ring-violet-500/20"
                            />
                            <span className="text-slate-400">
                                I agree to the{' '}
                                <a href="#" className="text-violet-400 hover:text-violet-300">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-violet-400 hover:text-violet-300">Privacy Policy</a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-linear-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Create Account <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900/50 px-2 text-slate-500 backdrop-blur-sm">Or register with</span>
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
                    Already have an account?{' '}
                    <a href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                        Sign in
                    </a>
                </p>
            </motion.div>
        </div>
    );
};
