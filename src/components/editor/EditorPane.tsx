import Editor from "@monaco-editor/react";

interface EditorPaneProps {
    userCode: string;
    onChange: (value: string | undefined) => void;
}

export function EditorPane({ userCode, onChange }: EditorPaneProps) {
    return (
        <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4">
                <span className="text-sm font-semibold text-slate-300">
                    editor.js
                </span>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={userCode}
                    onChange={onChange}
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
        </div>
    );
}
