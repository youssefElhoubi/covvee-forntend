import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectStore } from "../../store/ProjectStore";
import { editorTabsStore } from "../../store/editorTabsStore";
import { useFileStore } from "../../store/useFileStore";
import useWebSocketStore from "../../store/useWebSocketStore";
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
    const activeFile = editorTabsStore((state) => state.activeFile);
    const initializeFileSystem = editorTabsStore((state) => state.initializeFileSystem);
    const updateFileContent = editorTabsStore((state) => state.updateFileContent);
    const resetEditor = editorTabsStore((state) => state.reset);
    // web socket and file actions
    const connectSocket = useWebSocketStore((state) => state.connect);
    const disconnectSocket = useWebSocketStore((state) => state.disconnect);
    const isSocketConnected = useWebSocketStore((state) => state.isConnected);

    // file store actions
    const requestFile = useFileStore((state) => state.requestFile);
    const publishFileUpdate = useFileStore((state) => state.updateFile);
    const subscribeToFileContent = useFileStore((state) => state.subscribeToFileContent);
    const unsubscribeAllFileEvents = useFileStore((state) => state.unsubscribeAll);
    const remoteActiveFile = useFileStore((state) => state.activeFile);

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

        resetEditor();
    }, [initializeFileSystem, project, resetEditor]);

    useEffect(() => {
        if (!isSocketConnected || !activeFile) {
            return;
        }

        subscribeToFileContent(activeFile.id);
        requestFile(activeFile.id);
    }, [activeFile, isSocketConnected, requestFile, subscribeToFileContent]);

    useEffect(() => {
        if (!remoteActiveFile) {
            return;
        }

        updateFileContent(remoteActiveFile.id, remoteActiveFile.content);
    }, [remoteActiveFile, updateFileContent]);

    const handleEditorContentChange = useCallback(
        (fileId: string, content: string) => {
            updateFileContent(fileId, content);
            publishFileUpdate(fileId, content);
        },
        [publishFileUpdate, updateFileContent]
    );

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
                        <EditorContainer activeFile={activeFile} onChangeContent={handleEditorContentChange} />
                    </div>
                </section>

                <div className="min-h-0">
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
