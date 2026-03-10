import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { createProject } from "../../services/ProjectService";
import {
    createProjectSchema,
    type CreateProjectFormValues,
    type CreateProjectFormInput,
} from "../../zod/createProjectSchema";

type CreateProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
};

export function CreateProjectModal({ isOpen, onClose, onCreated }: CreateProjectModalProps) {
    const [submitError, setSubmitError] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectFormInput, unknown, CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            visibility: "PUBLIC",
            language: "PYTHON",
        },
    });

    const onSubmit = async (values: CreateProjectFormValues) => {
        try {
            setSubmitError("");

            await createProject({
                name: values.name,
                description: values.description || undefined,
                Visibility: values.visibility,
                Language: values.language,
            });

            reset();
            onClose();
            onCreated?.();
        } catch {
            setSubmitError("Could not create project. Please try again.");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close modal"
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">Create New Project</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Start a new workspace with your preferred language and visibility.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                            Project Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. Algorithm Playground"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Describe your project idea..."
                            className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="visibility"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Visibility
                            </label>
                            <select
                                id="visibility"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                {...register("visibility")}
                            >
                                <option value="PUBLIC">PUBLIC</option>
                                <option value="PRIVATE">PRIVATE</option>
                            </select>
                            {errors.visibility && (
                                <p className="mt-1 text-xs text-red-400">{errors.visibility.message}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="language"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Language
                            </label>
                            <select
                                id="language"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                {...register("language")}
                            >
                                <option value="PYTHON">PYTHON</option>
                                <option value="JAVA">JAVA</option>
                                <option value="JS">JS</option>
                            </select>
                            {errors.language && (
                                <p className="mt-1 text-xs text-red-400">{errors.language.message}</p>
                            )}
                        </div>
                    </div>

                    {submitError && <p className="text-sm text-red-400">{submitError}</p>}

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
