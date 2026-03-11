import { useState } from "react";
import { EditorPane } from "./EditorPane";
import { OutputPanel } from "./OutputPanel";



export function CodeEditorWorkspace() {
    const [userCode, setUserCode] = useState<string>("");

    return (
        <div className="h-screen bg-slate-950 text-slate-100">
            {/* Header */}
            <div className="h-16 border-b border-slate-800 flex items-center px-6">
                <h1 className="text-2xl font-bold text-emerald-400">
                    Code Editor Workspace
                </h1>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="h-[calc(100vh-4rem)] flex flex-col">
                {/* Left: Editor */}
                <div className="flex-1 border-r border-slate-800">
                    <EditorPane
                        userCode={userCode}
                        onChange={(value) => setUserCode(value || "")}
                    />
                </div>

                {/* Right: Output */}
                <div className="w-[40%] min-w-100 max-w-150">
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
