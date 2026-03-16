import { create } from "zustand";
import type { StompSubscription } from "@stomp/stompjs";
import type { FileResponse, FolderResponse, ProjectDetailResponse } from "../types/project.types";
import useWebSocketStore from "./useWebSocketStore";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface EditorWorkspaceFile extends FileResponse {
    path: string[];
    fullPath: string;
}

interface EditorState {
    // UI State
    fileSystem: EditorWorkspaceFile[];
    openFiles: EditorWorkspaceFile[];
    activeFile: EditorWorkspaceFile | null;
    
    // WebSocket State
    subscriptions: Map<string, StompSubscription>; 

    // UI Actions
    initializeFileSystem: (project: ProjectDetailResponse) => void;
    openFile: (file: EditorWorkspaceFile) => void;
    setActiveFile: (fileId: string) => void;
    closeFile: (fileId: string) => void;

    // WebSocket Publishers (Sending data to Java)
    requestFile: (fileId: string) => void;
    updateFile: (fileId: string, content: string) => void;
    renameFile: (fileId: string, content: string) => void;
    deleteFile: (fileId: string) => void;
    moveFile: (fileId: string, newParentFolderId: string) => void;

    // WebSocket Subscribers (Listening for data from Java)
    subscribeToFileContent: (fileId: string) => void;
    subscribeToFileRename: (fileId: string) => void;
    subscribeToFileDelete: (fileId: string) => void;
    subscribeToFileMove: (fileId: string) => void;
    
    // Cleanup
    unsubscribeAll: () => void;
    unsubscribeFromEvent: (subscriptionKey: string) => void;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

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
    if (openFiles.length === 0) return null;
    return openFiles[Math.max(0, removedIndex - 1)] ?? openFiles[0] ?? null;
}

// ==========================================
// THE MERGED STORE
// ==========================================

export const useEditorStore = create<EditorState>((set, get) => ({
    // Initial State
    fileSystem: [],
    openFiles: [],
    activeFile: null,
    subscriptions: new Map(),

    // ------------------------------------------
    // UI ACTIONS
    // ------------------------------------------

    initializeFileSystem: (project) => {
        const fileSystem = flattenProjectFiles(project);
        const initialFile = fileSystem[0] ?? null;
        set({
            fileSystem,
            openFiles: initialFile ? [initialFile] : [],
            activeFile: initialFile,
        });
    },

    openFile: (file) => set((state) => {
        const existingFile = state.openFiles.find((openFile) => openFile.id === file.id);
        if (existingFile) {
            return { activeFile: existingFile };
        }
        return {
            openFiles: [...state.openFiles, file],
            activeFile: file,
        };
    }),

    setActiveFile: (fileId) => set((state) => ({
        activeFile: state.openFiles.find((file) => file.id === fileId) ?? state.activeFile,
    })),

    closeFile: (fileId) => set((state) => {
        const removedIndex = state.openFiles.findIndex((file) => file.id === fileId);
        if (removedIndex === -1) return state;

        const nextOpenFiles = state.openFiles.filter((file) => file.id !== fileId);
        const nextActiveFile = state.activeFile?.id === fileId
            ? getNextActiveFile(nextOpenFiles, removedIndex)
            : state.activeFile;

        // Cleanup the WebSocket listener when a file tab is closed!
        get().unsubscribeFromEvent(`content_${fileId}`);

        return {
            openFiles: nextOpenFiles,
            activeFile: nextActiveFile,
        };
    }),

    // ------------------------------------------
    // WEBSOCKET PUBLISHERS
    // ------------------------------------------

    requestFile: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({ destination: `/app/file/request/${fileId}` });
        }
    },

    updateFile: (fileId: string, content: string) => {
        const userToken = localStorage.getItem("token");
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/update/${fileId}`,
                body: JSON.stringify(content),
                headers: { Authorization: `Bearer ${userToken}` }
            });
        }
    },

    renameFile: (fileId: string, content: string) => {
        const userToken = localStorage.getItem("token");
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/rename/${fileId}`,
                body: JSON.stringify(content),
                headers: { Authorization: `Bearer ${userToken}` }
            });
        }
    },

    deleteFile: (fileId: string) => {
        const userToken = localStorage.getItem("token");
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/delete/${fileId}`,
                headers: { Authorization: `Bearer ${userToken}` }
            });
        }
    },

    moveFile: (fileId: string, newParentFolderId: string) => {
        const userToken = localStorage.getItem("token");
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/move/${fileId}`,
                body: newParentFolderId,
                headers: { Authorization: `Bearer ${userToken}` }
            });
        }
    },

    // ------------------------------------------
    // WEBSOCKET SUBSCRIBERS
    // ------------------------------------------

    subscribeToFileContent: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `content_${fileId}`;

        if (subs.has(subKey)) return;

        const contentSub = stompClient.subscribe(`/topic/data/${fileId}`, (message) => {
            const updatedContent: FileResponse = JSON.parse(message.body);
            
            set((state) => {
                // Merge the incoming FileResponse into our existing EditorWorkspaceFile
                const mergeProps = (file: EditorWorkspaceFile) => 
                    file.id === updatedContent.id ? { ...file, ...updatedContent } : file;

                return {
                    fileSystem: state.fileSystem.map(mergeProps),
                    openFiles: state.openFiles.map(mergeProps),
                    activeFile: state.activeFile?.id === updatedContent.id 
                        ? { ...state.activeFile, ...updatedContent } 
                        : state.activeFile
                };
            });
        });

        subs.set(subKey, contentSub);
        set({ subscriptions: subs });
    },

    subscribeToFileRename: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `rename_${fileId}`;
        if (subs.has(subKey)) return;

        const renameSub = stompClient.subscribe(`/topic/rename/${fileId}`, (message) => {
            const renamedFile: FileResponse = JSON.parse(message.body);
            
            set((state) => {
                const mergeProps = (file: EditorWorkspaceFile) => 
                    file.id === renamedFile.id ? { ...file, ...renamedFile, name: renamedFile.name } : file;

                return {
                    fileSystem: state.fileSystem.map(mergeProps),
                    openFiles: state.openFiles.map(mergeProps),
                    activeFile: state.activeFile?.id === renamedFile.id 
                        ? { ...state.activeFile, ...renamedFile } 
                        : state.activeFile
                };
            });
        });

        subs.set(subKey, renameSub);
        set({ subscriptions: subs });
    },

    subscribeToFileDelete: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `delete_${fileId}`;
        if (subs.has(subKey)) return;

        const deleteSub = stompClient.subscribe(`/topic/delete/${fileId}`, (message) => {
            const deletedId = message.body;
            
            set((state) => {
                const nextOpenFiles = state.openFiles.filter(f => f.id !== deletedId);
                const removedIndex = state.openFiles.findIndex(f => f.id === deletedId);
                
                return {
                    fileSystem: state.fileSystem.filter(f => f.id !== deletedId),
                    openFiles: nextOpenFiles,
                    // Auto-switch tabs if the active file was deleted
                    activeFile: state.activeFile?.id === deletedId 
                        ? getNextActiveFile(nextOpenFiles, removedIndex) 
                        : state.activeFile
                };
            });
        });

        subs.set(subKey, deleteSub);
        set({ subscriptions: subs });
    },

    subscribeToFileMove: (fileId: string) => {
        // Similar to rename/content update, merge the parentId
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `move_${fileId}`;
        if (subs.has(subKey)) return;

        const moveSub = stompClient.subscribe(`/topic/move/${fileId}`, (message) => {
            const movedFile: FileResponse = JSON.parse(message.body);
            
            set((state) => {
                const mergeProps = (file: EditorWorkspaceFile) => 
                    file.id === movedFile.id ? { ...file, ...movedFile } : file;

                return {
                    fileSystem: state.fileSystem.map(mergeProps),
                    openFiles: state.openFiles.map(mergeProps),
                    activeFile: state.activeFile?.id === movedFile.id 
                        ? { ...state.activeFile, ...movedFile } 
                        : state.activeFile
                };
            });
        });

        subs.set(subKey, moveSub);
        set({ subscriptions: subs });
    },

    // ------------------------------------------
    // CLEANUP ACTIONS
    // ------------------------------------------

    unsubscribeAll: () => {
        const { subscriptions } = get();
        subscriptions.forEach(sub => sub.unsubscribe());
        set({ subscriptions: new Map() });
    },

    unsubscribeFromEvent: (subscriptionKey: string) => {
        const subs = new Map(get().subscriptions);
        const sub = subs.get(subscriptionKey);
        if (sub) {
            sub.unsubscribe();
            subs.delete(subscriptionKey);
            set({ subscriptions: subs });
        }
    },
}));