import type { ReactNode } from "react";

type ContextActionModalProps = {
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    onClose: () => void;
    onConfirm?: () => void;
    children?: ReactNode;
    destructive?: boolean;
};

export function ContextActionModal({
    isOpen,
    title,
    description,
    confirmLabel,
    onClose,
    onConfirm,
    children,
    destructive = false,
}: ContextActionModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <button
                type="button"
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]"
                aria-label="Close dialog"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-2xl"
            >
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>

                {children ? <div className="mt-4">{children}</div> : null}

                <div className="mt-6 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm?.();
                            onClose();
                        }}
                        className={`rounded-md px-3 py-1.5 text-sm font-semibold text-white transition-colors ${
                            destructive
                                ? "bg-red-600 hover:bg-red-500"
                                : "bg-emerald-600 hover:bg-emerald-500"
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
