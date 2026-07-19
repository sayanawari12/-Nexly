export interface ExecutionLimits {
  timeLimit: number; // in seconds
  memoryLimit: number; // in KB
}

export interface NormalizedResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR' | 'INTERNAL_ERROR' | 'PROCESSING';
  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  message?: string;
  executionTime?: number; // in seconds
  memoryUsage?: number; // in KB
  exitCode?: number;
}

export interface JudgeClient {
  healthCheck(): Promise<boolean>;
  submit(
    sourceCode: string,
    judge0LanguageId: number,
    input: string,
    expectedOutput: string,
    limits: ExecutionLimits
  ): Promise<string>;
  poll(token: string): Promise<NormalizedResult>;
}
