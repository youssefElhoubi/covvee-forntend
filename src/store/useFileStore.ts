import type { StompSubscription } from "@stomp/stompjs";
import type { FileResponse } from "../types/FileResponse";
import { create } from "zustand";
import useWebSocketStore from "./useWebSocketStore";

interface FileState {
    // State
    files: FileResponse[];
    activeFile: FileResponse | null;
    subscriptions: Map<string, StompSubscription>; // To keep track of active listeners

    // Publishers (Sending data to Java)
    requestFile: (fileId: string) => void;
    updateFile: (fileId: string, content: string) => void;
    renameFile: (fileId: string, content: string) => void;
    deleteFile: (fileId: string) => void;
    moveFile: (fileId: string, newParentFolderId: string) => void;

    // Subscribers (Listening for data from Java)

    subscribeToFileContent: (fileId: string) => void;
    subscribeToFileRename: (fileId: string) => void;
    subscribeToFileDelete: (fileId: string) => void;
    subscribeToFileMove: (fileId: string) => void;
    unsubscribeAll: () => void;
    unsubscribeFromEvent: (subscriptionKey: string) => void;
}

export const useFileStore = create<FileState>((set, get) => ({
    files: [],
    activeFile: null,
    subscriptions: new Map(),
    requestFile: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({ destination: `/app/file/request/${fileId}` });
        }
    }
    ,
    updateFile: (fileId: string, content: string) => {
        const userToken = localStorage.getItem("token");
        const { stompClient } = useWebSocketStore.getState();
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/update/${fileId}`,
                body: JSON.stringify(content),
                headers: {
                    Authorization: `Bearer ${userToken}`
                }

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
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }
    },
    deleteFile: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        const userToken = localStorage.getItem("token");
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/delete/${fileId}`,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }
    },
    moveFile: (fileId: string, newParentFolderId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        const userToken = localStorage.getItem("token");
        if (stompClient?.connected) {
            stompClient.publish({
                destination: `/app/file/move/${fileId}`,
                body: newParentFolderId, // Passed as a raw string to match Java @Payload String
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }
    },




    // ==========================================
    // SUBSCRIBERS (Incoming from Spring Boot)
    // ==========================================


    subscribeToFileContent: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `content_${fileId}`;

        // Don't subscribe twice if we are already listening
        if (subs.has(subKey)) return;

        const contentSub = stompClient.subscribe(`/topic/data/${fileId}`, (message) => {
            const updatedContent: FileResponse = JSON.parse(message.body);
            set({ activeFile: updatedContent });

            set((state) => ({
                files: state.files.map(f => f.id === updatedContent.id ? updatedContent : f)
            }));
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
            set((state) => ({
                files: state.files.map(f => f.id === renamedFile.id ? renamedFile : f),
                activeFile: state.activeFile?.id === renamedFile.id ? renamedFile : state.activeFile
            }));
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
            set((state) => ({
                files: state.files.filter(f => f.id !== deletedId),
                activeFile: state.activeFile?.id === deletedId ? null : state.activeFile
            }));
        });

        subs.set(subKey, deleteSub);
        set({ subscriptions: subs });
    },

    subscribeToFileMove: (fileId: string) => {
        const { stompClient } = useWebSocketStore.getState();
        if (!stompClient?.connected) return;

        const subs = new Map(get().subscriptions);
        const subKey = `move_${fileId}`;

        if (subs.has(subKey)) return;

        const moveSub = stompClient.subscribe(`/topic/move/${fileId}`, (message) => {
            const movedFile: FileResponse = JSON.parse(message.body);
            set((state) => ({
                files: state.files.map(f => f.id === movedFile.id ? movedFile : f)
            }));
        });

        subs.set(subKey, moveSub);
        set({ subscriptions: subs });
    },



    // CLEANUP: Kill all subscriptions to prevent memory leaks and duplicate renders
    unsubscribeAll: () => {
        const { subscriptions } = get();
        subscriptions.forEach(sub => sub.unsubscribe());
        set({ subscriptions: new Map(), files: [], activeFile: null });
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
}))