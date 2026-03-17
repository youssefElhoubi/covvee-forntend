import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectStore } from "../../store/ProjectStore";
import { useEditorStore } from "../../store/useEditorStore";
import { FileExplorer } from "./FileExplorer";
import { TabBar } from "./TabBar";
import { EditorContainer } from "./EditorContainer";
import { OutputPanel } from "./OutputPanel";

export function CodeEditorWorkspace() {
    const { id } = useParams<{ id: string }>();
    // stores and actions
    const project = projectStore((state) => state.project);
    const isLoading = projectStore((state) => state.isLoading);
    const getproject = projectStore((state) => state.getproject);
    const activeFile = useEditorStore((state) => state.activeFile);
    const initializeFileSystem = useEditorStore((state) => state.initializeFileSystem);

    const connectSocket = useEditorStore((state) => state.connectSocket);
    const disconnectSocket = useEditorStore((state) => state.disconnectSocket);
    const unsubscribeAllFileEvents = useEditorStore((state) => state.unsubscribeAll);

    useEffect(() => {
        if (id) {
            getproject(id);
        }
    }, [getproject, id]);

    useEffect(() => {
        const token = localStorage.getItem("token") ?? "";

        if (!token) {
            return;
        }

        connectSocket(token);

        return () => {
            unsubscribeAllFileEvents();
            disconnectSocket();
        };
    }, [connectSocket, disconnectSocket, unsubscribeAllFileEvents]);

    useEffect(() => {
        if (project) {
            initializeFileSystem(project);
            return;
        }

    }, [initializeFileSystem, project]);

    if (isLoading && !project) {
        return (
            <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">
                Loading project workspace...
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
