import type { EditorWorkspaceFile } from "../store/editorTabsStore";

export function inferMonacoLanguage(file: EditorWorkspaceFile) {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "ts" || extension === "tsx") {
        return "typescript";
    }

    if (extension === "js" || extension === "jsx") {
        return "javascript";
    }

    if (extension === "py") {
        return "python";
    }

    if (extension === "java") {
        return "java";
    }

    if (extension === "json") {
        return "json";
    }

    if (extension === "css") {
        return "css";
    }

    if (extension === "html") {
        return "html";
    }

    if (extension === "md") {
        return "markdown";
    }

    const normalizedLanguage = file.language.toLowerCase();

    if (normalizedLanguage === "typescript") {
        return "typescript";
    }

    if (normalizedLanguage === "javascript" || normalizedLanguage === "js") {
        return "javascript";
    }

    if (normalizedLanguage === "python") {
        return "python";
    }

    if (normalizedLanguage === "java") {
        return "java";
    }

    if (normalizedLanguage === "markdown") {
        return "markdown";
    }

    return "plaintext";
}