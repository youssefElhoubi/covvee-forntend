export interface ExecutionResult {
    output: string;
    error: string;
    exitCode: number;
    executionTimeMs: number;
    isTimeout: boolean;
}