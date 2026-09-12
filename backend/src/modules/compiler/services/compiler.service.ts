import { logger } from '../../../utils/logger';

export interface ExecuteRequest {
  language: string;
  code: string;
  stdin?: string;
  cpuTimeLimit?: number;
  memoryLimitKb?: number;
}

export interface ExecuteResponse {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
}

const LANGUAGE_MAP: Record<string, number> = {
  python: 71,
  py: 71,
  python3: 71,
  javascript: 63,
  js: 63,
  c: 50,
  cpp: 54,
  'c++': 54,
  java: 62,
};

function decodeBase64(str: string | null | undefined): string | null {
  if (!str) return null;
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (e) {
    return str;
  }
}

function encodeBase64(str: string | null | undefined): string {
  if (!str) return '';
  return Buffer.from(str, 'utf-8').toString('base64');
}

export class CompilerService {
  private readonly judge0Url: string;

  constructor() {
    this.judge0Url = process.env.JUDGE0_URL || 'https://ce.judge0.com';
  }

  /**
   * Executes source code via backend Judge0 isolated execution engine
   */
  public async executeCode(req: ExecuteRequest): Promise<ExecuteResponse> {
    const langKey = (req.language || '').toLowerCase().trim();
    const languageId = LANGUAGE_MAP[langKey];

    if (!languageId) {
      throw new Error(`Unsupported programming language: '${req.language}'`);
    }

    // Phase 6 Server-side Security Limits (Never trust client limits)
    const rawCpu = typeof req.cpuTimeLimit === 'number' ? req.cpuTimeLimit : parseFloat(String(req.cpuTimeLimit || 5.0));
    const safeCpuTime = Math.min(Math.max(isNaN(rawCpu) ? 5.0 : rawCpu, 0.5), 10.0); // 0.5s - 10.0s cap

    const rawMem = typeof req.memoryLimitKb === 'number' ? req.memoryLimitKb : parseInt(String(req.memoryLimitKb || 128000), 10);
    const safeMemoryKb = Math.min(Math.max(isNaN(rawMem) ? 128000 : rawMem, 1000), 256000); // 1MB - 256MB cap

    const sourceCodeBase64 = encodeBase64(req.code);
    const stdinBase64 = encodeBase64(req.stdin);

    const payload = {
      language_id: languageId,
      source_code: sourceCodeBase64,
      stdin: stdinBase64,
      cpu_time_limit: safeCpuTime,
      memory_limit: safeMemoryKb,
    };

    logger.info({
      eventName: 'COMPILER_EXECUTION_DISPATCH',
      language: req.language,
      languageId,
      codeLength: req.code?.length || 0,
      stdinLength: req.stdin?.length || 0,
      cpuTimeLimit: safeCpuTime,
      memoryLimitKb: safeMemoryKb,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s HTTP timeout

      const response = await fetch(`${this.judge0Url}/submissions?wait=true&base64_encoded=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.JUDGE0_API_KEY ? { 'X-RapidAPI-Key': process.env.JUDGE0_API_KEY } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        logger.error({
          eventName: 'COMPILER_HTTP_ERROR',
          status: response.status,
          statusText: response.statusText,
        });
        throw new Error('Code execution service is temporarily unavailable.');
      }

      const data = (await response.json()) as Record<string, any>;

      const stdout = decodeBase64(data.stdout);
      const stderr = decodeBase64(data.stderr);
      const compile_output = decodeBase64(data.compile_output);
      const message = decodeBase64(data.message);

      return {
        stdout,
        stderr: stderr || message,
        compile_output,
        time: data.time || null,
        memory: data.memory || null,
        status: data.status || { id: 3, description: 'Accepted' },
      };
    } catch (err: any) {
      logger.error({
        eventName: 'COMPILER_EXECUTION_FAILED',
        error: err.message,
      });
      throw new Error('Code execution service is temporarily unavailable.');
    }
  }
}
export default CompilerService;
