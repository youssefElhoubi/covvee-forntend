import z from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be between 3 and 50 characters")
        .max(50, "Project name must be between 3 and 50 characters"),
    description: z
        .string()
        .max(255, "Description cannot exceed 255 characters")
        .optional()
        .or(z.literal("")),
    visibility: z
        .string()
        .refine((value) => value === "PUBLIC" || value === "PRIVATE", {
            message: "Visibility is required",
        }),
    language: z
        .string()
        .refine((value) => value === "PYTHON" || value === "JAVA" || value === "JAVASCRIPT", {
            message: "Language is required",
        }),
});

export type CreateProjectFormInput = z.input<typeof createProjectSchema>;
export type CreateProjectFormValues = z.output<typeof createProjectSchema>;
