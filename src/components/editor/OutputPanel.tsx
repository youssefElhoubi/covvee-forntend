import { Play, Loader2 } from "lucide-react";
import { Button } from "../ui/Button"; // Adjust if your Button import path is different
import { useState } from "react";
import { useParams } from "react-router-dom";
// Make sure this points to your file containing the execute function
import { execute } from "../../services/execution";
import type { ExecutionResult } from "../../types/ExecutionResult";



export function OutputPanel() {
    const { id } = useParams();
    
    // 1. Setup our loading and result states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<ExecutionResult | null>(null);

    // 2. The click handler for the Run button
    const handleRunCode = async () => {
        if (!id) return;

        setIsLoading(true);
        setResult(null); // Clear previous output

        try {
            // Call your backend Docker execution service
            const data = await execute(id);
            setResult(data);
        } catch (error) {
            // Failsafe in case the Spring Boot server is entirely offline
            setResult({
                output: "",
                error: "Network error: Could not reach the execution server.",
                exitCode: -1,
                executionTimeMs: 0,
                isTimeout: false
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Output Header */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                <span className="text-sm font-semibold text-slate-300">Output</span>
                <Button 
                    variant="primary" 
                    className="text-sm py-2 px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleRunCode}
                    disabled={isLoading} // Prevent clicking multiple times
                >
                    {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Play size={16} />
                    )}
                    {isLoading ? "Running..." : "Run Code"}
                </Button>
            </div>

            {/* Output Content */}
            <div className="flex-1 p-4 overflow-auto bg-slate-950">
                {isLoading ? (
                    // LOADING UI
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-sm animate-pulse">Executing code in secure sandbox...</p>
                    </div>
                ) : result ? (
                    // RESULT UI
                    <div className="flex flex-col gap-2">
                        
                        {/* Standard Output (System.out.println / console.log) */}
                        {result.output && (
                            <pre className="text-sm font-mono text-slate-200 whitespace-pre-wrap">
                                {result.output}
                            </pre>
                        )}

                        {/* Error Output (Exceptions, Syntax Errors) */}
                        {result.error && (
                            <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap mt-2 border-l-2 border-red-500 pl-3">
                                {result.error}
                            </pre>
                        )}

                        {/* Timeout Warning */}
                        {result.isTimeout && (
                            <div className="text-sm text-amber-400 mt-2 bg-amber-950/30 p-2 rounded border border-amber-900">
                                ⚠️ Execution Timed Out (Max 10s allowed). You might have an infinite loop!
                            </div>
                        )}

                        {/* Footer details (Exit code & Time) */}
                        <div className="text-xs text-slate-500 mt-4 border-t border-slate-800 pt-2 flex gap-4">
                            <span>Exit Code: {result.exitCode}</span>
                            {result.executionTimeMs > 0 && (
                                <span>Time: {result.executionTimeMs}ms</span>
                            )}
                        </div>
                    </div>
                ) : (
                    // EMPTY UI (Before clicking run)
                    <p className="text-slate-500 text-sm">
                        Click "Run Code" to see the output here...
                    </p>
                )}
            </div>
        </div>
    );
}