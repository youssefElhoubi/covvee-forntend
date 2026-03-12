import { create } from "zustand";
import type { FileResponse, FolderResponse, ProjectDetailResponse } from "../types/project.types";

export interface EditorWorkspaceFile extends FileResponse {
    path: string[];
    fullPath: string;
}

type EditorTabsState = {
    fileSystem: EditorWorkspaceFile[];
    openFiles: EditorWorkspaceFile[];
    activeFile: EditorWorkspaceFile | null;
    initializeFileSystem: (project: ProjectDetailResponse) => void;
    openFile: (file: EditorWorkspaceFile) => void;
    setActiveFile: (fileId: string) => void;
    closeFile: (fileId: string) => void;
    updateFileContent: (fileId: string, content: string) => void;
    reset: () => void;
};

function buildWorkspaceFile(file: FileResponse, path: string[]): EditorWorkspaceFile {
    return {
        ...file,
        path,
        fullPath: path.length > 0 ? `${path.join("/")}/${file.name}` : file.name,
    };
}

function flattenFolders(folders: FolderResponse[], parentPath: string[]): EditorWorkspaceFile[] {
    return folders.flatMap((folder) => {
        const currentPath = [...parentPath, folder.name];
        const files = folder.files.map((file) => buildWorkspaceFile(file, currentPath));
        return [...files, ...flattenFolders(folder.children, currentPath)];
    });
}

function flattenProjectFiles(project: ProjectDetailResponse): EditorWorkspaceFile[] {
    const rootFiles = project.rootFiles.map((file) => buildWorkspaceFile(file, []));
    return [...rootFiles, ...flattenFolders(project.rootFolders, [])];
}

function getNextActiveFile(openFiles: EditorWorkspaceFile[], removedIndex: number) {
    if (openFiles.length === 0) {
        return null;
    }

    return openFiles[Math.max(0, removedIndex - 1)] ?? openFiles[0] ?? null;
}

export const editorTabsStore = create<EditorTabsState>((set) => ({
    fileSystem: [],
    openFiles: [],
    activeFile: null,
    initializeFileSystem: (project) => {
        const fileSystem = flattenProjectFiles(project);
        const initialFile = fileSystem[0] ?? null;

        set({
            fileSystem,
            openFiles: initialFile ? [initialFile] : [],
            activeFile: initialFile,
        });
    },
    openFile: (file) =>
        set((state) => {
            const existingFile = state.openFiles.find((openFile) => openFile.id === file.id);

            if (existingFile) {
                return { activeFile: existingFile };
            }

            return {
                openFiles: [...state.openFiles, file],
                activeFile: file,
            };
        }),
    setActiveFile: (fileId) =>
        set((state) => ({
            activeFile: state.openFiles.find((file) => file.id === fileId) ?? state.activeFile,
        })),
    closeFile: (fileId) =>
        set((state) => {
            const removedIndex = state.openFiles.findIndex((file) => file.id === fileId);

            if (removedIndex === -1) {
                return state;
            }

            const nextOpenFiles = state.openFiles.filter((file) => file.id !== fileId);
            const nextActiveFile =
                state.activeFile?.id === fileId
                    ? getNextActiveFile(nextOpenFiles, removedIndex)
                    : state.activeFile;

            return {
                openFiles: nextOpenFiles,
                activeFile: nextActiveFile,
            };
        }),
        // te be edited
    updateFileContent: (fileId, content) =>
        set((state) => {
            const updateFile = (file: EditorWorkspaceFile) =>
                file.id === fileId ? { ...file, content } : file;

            const fileSystem = state.fileSystem.map(updateFile);
            const openFiles = state.openFiles.map(updateFile);
            const activeFile =
                state.activeFile?.id === fileId ? { ...state.activeFile, content } : state.activeFile;

            return {
                fileSystem,
                openFiles,
                activeFile,
            };
        }),
        
    reset: () =>
        set({
            fileSystem: [],
            openFiles: [],
            activeFile: null,
        }),
}));