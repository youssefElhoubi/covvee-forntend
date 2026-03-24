import { create } from "zustand";
import { Client, type Frame, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
    FileResponse,
    FolderResponse,
    ProjectDetailResponse,
} from "../types/project.types";

export interface EditorWorkspaceFile extends FileResponse {
    path: string[];
    fullPath: string;
}

interface EditorState {
    fileSystem: EditorWorkspaceFile[];
    openFiles: EditorWorkspaceFile[];
    activeFile: EditorWorkspaceFile | null;
    subscriptions: Map<string, StompSubscription>;
    stompClient: Client | null;
    isConnected: boolean;

    initializeFileSystem: (project: ProjectDetailResponse) => void;
    openFile: (file: EditorWorkspaceFile) => void;
    setActiveFile: (fileId: string) => void;
    closeFile: (fileId: string) => void;

    connectSocket: (userToken: string) => void;
    disconnectSocket: () => void;

    requestFile: (fileId: string) => void;
    updateFile: (fileId: string, content: string) => void;
    subscribeToFileContent: (fileId: string) => void;
    unsubscribeFromEvent: (subscriptionKey: string) => void;
    unsubscribeAll: () => void;
}

function buildWorkspaceFile(file: FileResponse, path: string[]): EditorWorkspaceFile {
    return {
        ...file,
        path,
        fullPath: path.length > 0 ? `${path.join("/")}/${file.name}` : file.name,
    };
}

function flattenFolders(folders: FolderResponse[], parentPath: string[]): EditorWorkspaceFile[] {
    // 1. Failsafe: If folders is null/undefined, stop the recursion safely
    if (!folders || !Array.isArray(folders)) {
        return [];
    }

    return folders.flatMap((folder) => {
        // 2. Failsafe: Ignore corrupted [null] entries in the array
        if (!folder) {
            return [];
        }

        const currentPath = [...parentPath, folder.name];
        
        // 3. Failsafe: Fallback to an empty array if folder.files is null
        const safeFiles = folder.files || [];
        const files = safeFiles
            .filter((file) => file !== null) // Ignore [null] files
            .map((file) => buildWorkspaceFile(file, currentPath));

        // 4. Failsafe: Fallback to an empty array if folder.children is null
        const safeChildren = folder.children || [];
        
        return [...files, ...flattenFolders(safeChildren, currentPath)];
    });
}

function flattenProjectFiles(project: ProjectDetailResponse): EditorWorkspaceFile[] {
    // Top-level failsafe just in case the project object itself is corrupted
    if (!project) return [];

    const safeRootFiles = project.rootFiles || [];
    const safeRootFolders = project.rootFolders || [];

    const rootFiles = safeRootFiles
        .filter((file) => file !== null) // Ignore [null] files
        .map((file) => buildWorkspaceFile(file, []));
        
    return [...rootFiles, ...flattenFolders(safeRootFolders, [])];
}

function getNextActiveFile(openFiles: EditorWorkspaceFile[], removedIndex: number) {
    if (openFiles.length === 0) {
        return null;
    }

    return openFiles[Math.max(0, removedIndex - 1)] ?? openFiles[0] ?? null;
}

function replaceWorkspaceFile(
    files: EditorWorkspaceFile[],
    updatedFile: EditorWorkspaceFile
): EditorWorkspaceFile[] {
    return files.map((file) => (file.id === updatedFile.id ? updatedFile : file));
}

function withPreservedPath(
    file: FileResponse,
    fileSystem: EditorWorkspaceFile[],
    openFiles: EditorWorkspaceFile[]
): EditorWorkspaceFile {
    const existingFile =
        openFiles.find((workspaceFile) => workspaceFile.id === file.id) ??
        fileSystem.find((workspaceFile) => workspaceFile.id === file.id);

    return {
        ...file,
        path: existingFile?.path ?? [],
        fullPath: existingFile?.fullPath ?? file.name,
    };
}

export const useEditorStore = create<EditorState>((set, get) => ({
    fileSystem: [],
    openFiles: [],
    activeFile: null,
    subscriptions: new Map(),
    stompClient: null,
    isConnected: false,

    initializeFileSystem: (project) => {
        const fileSystem = flattenProjectFiles(project);
        const initialFile = fileSystem[0] ?? null;

        set({
            fileSystem,
            openFiles: initialFile ? [initialFile] : [],
            activeFile: initialFile,
        });
    },

    openFile: (file) => {
        set((state) => {
            const existingFile = state.openFiles.find((openFile) => openFile.id === file.id);

            if (existingFile) {
                return { activeFile: existingFile };
            }

            return {
                openFiles: [...state.openFiles, file],
                activeFile: file,
            };
        });

        const { isConnected, subscribeToFileContent, requestFile } = get();

        if (isConnected) {
            subscribeToFileContent(file.id);
            requestFile(file.id);
        }
    },

    setActiveFile: (fileId) => {
        set((state) => ({
            activeFile: state.openFiles.find((file) => file.id === fileId) ?? state.activeFile,
        }));

        const { activeFile, isConnected, subscribeToFileContent, requestFile } = get();

        if (isConnected && activeFile?.id === fileId) {
            subscribeToFileContent(fileId);
            requestFile(fileId);
        }
    },

    closeFile: (fileId) => {
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
        });

        get().unsubscribeFromEvent(`content_${fileId}`);
    },

    connectSocket: (userToken) => {
        const currentClient = get().stompClient;

        if (currentClient || !userToken) {
            return;
        }

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: {
                Authorization: `Bearer ${userToken}`,
            },
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                set({ isConnected: true });

                const { activeFile, subscribeToFileContent, requestFile } = get();

                if (activeFile) {
                    subscribeToFileContent(activeFile.id);
                    requestFile(activeFile.id);
                }
            },
            onDisconnect: () => {
                set({ isConnected: false, stompClient: null });
            },
            onStompError: (frame: Frame) => {
                console.error("STOMP Protocol Error:", frame.headers["message"]);
            },
        });

        client.activate();
        set({ stompClient: client });
    },

    disconnectSocket: () => {
        const { stompClient } = get();

        if (stompClient) {
            stompClient.deactivate();
            set({ stompClient: null, isConnected: false });
        }
    },

    requestFile: (fileId) => {
        if (!fileId) {
            return;
        }

        const { stompClient } = get();

        if (stompClient?.connected) {
            stompClient.publish({ destination: `/app/file/request/${fileId}` });
        }
    },

    updateFile: (fileId, content) => {

        if (!fileId) {
            return;
        }

        const { stompClient } = get();
        const userToken = localStorage.getItem("token");

        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/update/${fileId}`,
                body: JSON.stringify({ content }),
                headers: userToken
                    ? {
                        Authorization: `Bearer ${userToken}`,
                    }
                    : {},
            });
        }
    },

    subscribeToFileContent: (fileId) => {
        if (!fileId) {
            return;
        }

        const { stompClient, subscriptions } = get();

        if (!stompClient?.connected) {
            return;
        }

        const subKey = `content_${fileId}`;

        if (subscriptions.has(subKey)) {
            return;
        }

        const nextSubs = new Map(subscriptions);

        const contentSub = stompClient.subscribe(`/topic/data/${fileId}`, (message) => {
            const incomingFile: FileResponse = JSON.parse(message.body);

            set((state) => {
                const workspaceFile = withPreservedPath(incomingFile, state.fileSystem, state.openFiles);

                return {
                    activeFile:
                        state.activeFile?.id === workspaceFile.id ? workspaceFile : state.activeFile,
                    openFiles: replaceWorkspaceFile(state.openFiles, workspaceFile),
                    fileSystem: replaceWorkspaceFile(state.fileSystem, workspaceFile),
                };
            });
        });

        nextSubs.set(subKey, contentSub);
        set({ subscriptions: nextSubs });
    },

    unsubscribeFromEvent: (subscriptionKey) => {
        const subs = new Map(get().subscriptions);
        const sub = subs.get(subscriptionKey);

        if (sub) {
            sub.unsubscribe();
            subs.delete(subscriptionKey);
            set({ subscriptions: subs });
        }
    },

    unsubscribeAll: () => {
        const { subscriptions } = get();

        subscriptions.forEach((sub) => sub.unsubscribe());
        set({ subscriptions: new Map() });
    },
}));
