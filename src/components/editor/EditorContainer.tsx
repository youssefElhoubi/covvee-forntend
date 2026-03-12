import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";
import type { EditorWorkspaceFile } from "../../store/editorTabsStore";
import { inferMonacoLanguage } from "../../utils/inferMonacoLanguage";

type EditorInstance = Parameters<OnMount>[0];
type MonacoInstance = Parameters<OnMount>[1];

interface EditorContainerProps {
    activeFile: EditorWorkspaceFile | null;
    onChangeContent: (fileId: string, content: string) => void;
}



export function EditorContainer({ activeFile, onChangeContent }: EditorContainerProps) {
    
    const editorRef = useRef<EditorInstance | null>(null);
    const monacoRef = useRef<MonacoInstance | null>(null);
    const modelsRef = useRef(new Map<string, MonacoEditor.ITextModel>());
    const viewStatesRef = useRef(new Map<string, MonacoEditor.ICodeEditorViewState | null>());
    const previousFileIdRef = useRef<string | null>(null);

    const getOrCreateModel = (file: EditorWorkspaceFile) => {
        const monaco = monacoRef.current;

        if (!monaco) {
            return null;
        }

        const existingModel = modelsRef.current.get(file.id);

        if (existingModel) {
            return existingModel;
        }

        const model = monaco.editor.createModel(
            file.content,
            inferMonacoLanguage(file),
            monaco.Uri.parse(`file:///${file.fullPath}`)
        );

        modelsRef.current.set(file.id, model);
        return model;
    };

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        if (activeFile) {
            const model = getOrCreateModel(activeFile);

            if (model) {
                editor.setModel(model);
            }
        }
    };

    useEffect(() => {
        const editor = editorRef.current;

        if (!editor || !activeFile) {
            previousFileIdRef.current = activeFile?.id ?? null;
            return;
        }

        const previousFileId = previousFileIdRef.current;

        if (previousFileId && previousFileId !== activeFile.id) {
            viewStatesRef.current.set(previousFileId, editor.saveViewState());
        }

        const model = getOrCreateModel(activeFile);

        if (!model) {
            previousFileIdRef.current = activeFile.id;
            return;
        }

        if (editor.getModel() !== model) {
            editor.setModel(model);
        }

        if (model.getValue() !== activeFile.content) {
            model.setValue(activeFile.content);
        }

        const viewState = viewStatesRef.current.get(activeFile.id);

        if (viewState) {
            editor.restoreViewState(viewState);
        }

        editor.focus();
        previousFileIdRef.current = activeFile.id;
    }, [activeFile]);

    useEffect(() => {
        return () => {
            modelsRef.current.forEach((model) => model.dispose());
            modelsRef.current.clear();
            viewStatesRef.current.clear();
        };
    }, []);

    if (!activeFile) {
        return (
            <div className="flex h-full items-center justify-center bg-[#0B1120] p-8 text-center text-slate-500">
                Select a file from the explorer to open it in the editor.
            </div>
        );
    }

    return (
        <div className="h-full min-h-0 bg-[#0B1120]">
            <Editor
                height="100%"
                defaultLanguage={inferMonacoLanguage(activeFile)}
                theme="vs-dark"
                onMount={handleEditorMount}
                onChange={(value) => onChangeContent(activeFile.id, value ?? "")}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                }}
            />
        </div>
    );
}