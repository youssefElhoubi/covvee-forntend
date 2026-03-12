import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectStore } from "../../store/ProjectStore";
import { editorTabsStore } from "../../store/editorTabsStore";
import { FileExplorer } from "./FileExplorer";
import { TabBar } from "./TabBar";
import { EditorContainer } from "./EditorContainer";
import { OutputPanel } from "./OutputPanel";

export function CodeEditorWorkspace() {
    const { id } = useParams<{ id: string }>();
    const project = projectStore((state) => state.project);
    const isLoading = projectStore((state) => state.isLoading);
    const getproject = projectStore((state) => state.getproject);
    const activeFile = editorTabsStore((state) => state.activeFile);
    const initializeFileSystem = editorTabsStore((state) => state.initializeFileSystem);
    const updateFileContent = editorTabsStore((state) => state.updateFileContent);
    const resetEditor = editorTabsStore((state) => state.reset);

    useEffect(() => {
        if (id) {
            getproject(id);
        }
    }, [getproject, id]);

    useEffect(() => {
        if (project) {
            initializeFileSystem(project);
            return;
        }

        resetEditor();
    }, [initializeFileSystem, project, resetEditor]);

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
                        <EditorContainer activeFile={activeFile} onChangeContent={updateFileContent} />
                    </div>
                </section>

                <div className="min-h-0">
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
