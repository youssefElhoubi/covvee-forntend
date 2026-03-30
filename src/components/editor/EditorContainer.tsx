import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";
import { inferMonacoLanguage } from "../../utils/inferMonacoLanguage";
import { type EditorWorkspaceFile, useEditorStore } from "../../store/useEditorStore";

type EditorInstance = Parameters<OnMount>[0];
type MonacoInstance = Parameters<OnMount>[1];

interface EditorContainerProps {
    activeFile: EditorWorkspaceFile | null;
}

export function EditorContainer({ activeFile }: EditorContainerProps) {
    const updateFile = useEditorStore((state) => state.updateFile);

    // monaco editor instance and related refs
    const editorRef = useRef<EditorInstance | null>(null);
    const monacoRef = useRef<MonacoInstance | null>(null);
    const modelsRef = useRef(new Map<string, MonacoEditor.ITextModel>());
    const viewStatesRef = useRef(new Map<string, MonacoEditor.ICodeEditorViewState | null>());
    const previousFileIdRef = useRef<string | null>(null);
    const debounceTimerRef = useRef<number | null>(null);
    const getOrCreateModel = (file: EditorWorkspaceFile) => {
        const monaco = monacoRef.current;
        if (!monaco) return null;

        
        let existingModel = modelsRef.current.get(file.id);
        if (existingModel) return existingModel;

        const uri = monaco.Uri.parse(`file:///${file.fullPath}`);

        let model = monaco.editor.getModel(uri);

        if (!model) {
            model = monaco.editor.createModel(
                file.content || "", 
                inferMonacoLanguage(file),
                uri
            );
        } else {
            if (model.getValue() !== file.content) {
                model.setValue(file.content || "");
            }
        }

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
                
                // 🚨 NEW: Restore cursor position when waking up from empty state
                const viewState = viewStatesRef.current.get(activeFile.id);
                if (viewState) {
                    editor.restoreViewState(viewState);
                }
                editor.focus();
                previousFileIdRef.current = activeFile.id;
            }
        }
    };

    // ==========================================
    // EFFECT 1: Handle File Switching & View States
    // Triggered ONLY when activeFile.id changes
    // ==========================================
    useEffect(() => {
        const editor = editorRef.current;

        if (!editor || !activeFile) {
            previousFileIdRef.current = activeFile?.id ?? null;
            return;
        }

        const previousFileId = previousFileIdRef.current;

        // Only run this logic if we are actually switching to a different file
        if (previousFileId !== activeFile.id) {

            // 1. Save the view state (cursor position) of the file we are leaving
            if (previousFileId) {
                viewStatesRef.current.set(previousFileId, editor.saveViewState());
            }

            // 2. Load the new file's model
            const model = getOrCreateModel(activeFile);
            if (model && editor.getModel() !== model) {
                editor.setModel(model);
            }

            // 3. Restore the view state of the file we are entering
            const viewState = viewStatesRef.current.get(activeFile.id);
            if (viewState) {
                editor.restoreViewState(viewState);
            }

            editor.focus();
            previousFileIdRef.current = activeFile.id;
        }
    }, [activeFile?.id]); // 🚨 Dependency is ONLY the ID


    // ==========================================
    // EFFECT 2: Handle Remote Text Syncing
    // Triggered ONLY when activeFile.content changes
    // ==========================================
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor || !activeFile) return;

        const model = editor.getModel();
        if (!model) return;

        // If the text from Zustand/WebSockets is different from our screen, merge it
        if (model.getValue() !== activeFile.content) {
            editor.executeEdits("remote-update", [
                {
                    range: model.getFullModelRange(),
                    text: activeFile.content,
                    forceMoveMarkers: true,
                }
            ]);
            editor.pushUndoStop();
        }
    }, [activeFile?.content]); // 🚨 Dependency is ONLY the Content


    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = null;
            }

            modelsRef.current.forEach((model) => model.dispose());
            modelsRef.current.clear();
            viewStatesRef.current.clear();
        };
    }, []);

    const handleEditorChange = (value?: string) => {
        if (!activeFile) return;

        const editor = editorRef.current;

        // 🚨 THE FOCUS SHIELD 🚨
        // If the user's cursor is not physically blinking inside the text box, 
        // it means this change was triggered automatically by the system 
        // (like Monaco booting up empty for a new user).
        // We MUST ignore it, or we will broadcast an empty string and nuke the room!
        if (!editor || !editor.hasTextFocus()) {
            return;
        }

        const nextValue = value ?? "";

        // Secondary guard: Ignore if text is identical
        if (nextValue === activeFile.content) {
            return;
        }

        if (debounceTimerRef.current !== null) {
            window.clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = window.setTimeout(() => {
            updateFile(activeFile.id, nextValue);
        }, 500);
    };

    if (!activeFile) {
        editorRef.current = null;
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
                onChange={handleEditorChange}
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