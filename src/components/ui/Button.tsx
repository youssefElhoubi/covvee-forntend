import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:hover:bg-emerald-500",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:hover:bg-slate-800",
    danger:
      "bg-red-600 hover:bg-red-500 text-white disabled:hover:bg-red-600",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
