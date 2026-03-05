import React, { useState } from "react";
import type { InputFieldProps } from "../../../types/InputFieldProps";
import { cn } from "../../../utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { motion } from 'framer-motion';

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, icon, className, type = "text", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                    {label}
                </label>
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            "w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                            "transition-all duration-200",
                            icon && "pl-10",
                            isPassword && "pr-10",
                            error && "border-red-500/50 focus:ring-red-500/20 focus:border-red-500",
                            className
                        )}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
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
            </div>
        );
    }
);