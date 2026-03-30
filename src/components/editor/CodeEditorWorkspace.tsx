import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEditorStore } from "../../store/useEditorStore";
import { FileExplorer } from "./FileExplorer";
import { TabBar } from "./TabBar";
import { EditorContainer } from "./EditorContainer";
import { OutputPanel } from "./OutputPanel";
import { ProjectSocketStore } from "../../store/ProjectSocketStore";

export function CodeEditorWorkspace() {
    const { id } = useParams<{ id: string }>();
    
    const project = ProjectSocketStore((state) => state.project);
    const isLoading = ProjectSocketStore((state) => state.loading);
    const isConnected = ProjectSocketStore((state) => state.isConnected); // ✅ Track this
    const getproject = ProjectSocketStore((state) => state.getProject);
    const connect = ProjectSocketStore((state) => state.connect);
    const disconnect = ProjectSocketStore((state) => state.disconnect);
    
    const activeFile = useEditorStore((state) => state.activeFile);
    const initializeFileSystem = useEditorStore((state) => state.initializeFileSystem);
    const connectSocket = useEditorStore((state) => state.connectSocket);
    const disconnectSocket = useEditorStore((state) => state.disconnectSocket);
    const unsubscribeAllFileEvents = useEditorStore((state) => state.unsubscribeAll);

    // 1️⃣ Handle WebSocket Connections Phase
    useEffect(() => {
        const token = localStorage.getItem("token") ?? "";
        if (!token) return;

        connect(token);
        connectSocket(token);

        // Cleanup on unmount
        return () => {
            disconnect();
            disconnectSocket();
            unsubscribeAllFileEvents();
        };
    }, [connect, connectSocket, disconnect, disconnectSocket, unsubscribeAllFileEvents]);

    // 2️⃣ Handle Data Fetching Phase (Waits for connection!)
    useEffect(() => {
        if (isConnected && id) {
            getproject(id);
        }
    }, [isConnected, id, getproject]);

    // 3️⃣ Handle File System Init Phase
    useEffect(() => {
        if (project) {
            initializeFileSystem(project);
        }
    }, [initializeFileSystem, project]);

    if (!isConnected || (isLoading && !project)) {
        return (
            <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">
                Connecting to workspace...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">
                Project not found.
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 bg-slate-950 text-slate-100">
            <FileExplorer project={project} />

            <div className="grid min-w-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <section className="flex min-h-0 min-w-0 flex-col border-r border-slate-800">
                    <TabBar />
                    <div className="min-h-0 flex-1">
                        <EditorContainer activeFile={activeFile} />
                    </div>
                </section>

                <div className="min-h-0">
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}