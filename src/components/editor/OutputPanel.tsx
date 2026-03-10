import { Play } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";



export function OutputPanel() {
    const [output, setOutput] = useState<String>("")
    return (
        <div className="h-full flex flex-col">
            {/* Output Header */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                <span className="text-sm font-semibold text-slate-300">Output</span>
                <Button  variant="primary" className="text-sm py-2 px-4">
                    <Play size={16} />
                    Run Code
                </Button>
            </div>

            {/* Output Content */}
            <div className="flex-1 p-4 overflow-auto bg-slate-950">
                {output ? (
                    <pre className="text-sm font-mono text-slate-200 whitespace-pre-wrap">
                        {output}
                    </pre>
                ) : (
                    <p className="text-slate-500 text-sm">
                        Click "Run Code" to see the output here...
                    </p>
                )}
            </div>
        </div>
    );
}
