/**
 * NEXLY Code Execution Service
 * Supports Python, JavaScript, C, C++, Java execution strictly via backend isolated execution engine (Judge0).
 * Enforces per-user rate-limiting (10 exec/min).
 * Zero browser-side code simulation or syntax pre-validation.
 */

import axios from 'axios';
import { API_BASE_URL } from '../config/api.config.js';

// In-memory token bucket for client-side rate limiting
const userExecHistory = [];
const MAX_EXEC_PER_MINUTE = 10;
const ONE_MINUTE_MS = 60 * 1000;

/**
 * Checks if current request exceeds rate-limit threshold (10 exec/min)
 * @returns {{ allowed: boolean, cooldownSeconds?: number }}
 */
export const checkRateLimit = () => {
  const now = Date.now();
  // Filter out timestamps older than 1 minute
  while (userExecHistory.length > 0 && userExecHistory[0] < now - ONE_MINUTE_MS) {
    userExecHistory.shift();
  }

  if (userExecHistory.length >= MAX_EXEC_PER_MINUTE) {
    const oldestTimestamp = userExecHistory[0];
    const cooldownMs = oldestTimestamp + ONE_MINUTE_MS - now;
    return {
      allowed: false,
      cooldownSeconds: Math.ceil(cooldownMs / 1000)
    };
  }

  return { allowed: true };
};

/**
 * Records an execution timestamp in the rate-limiter bucket
 */
export const recordExecutionAttempt = () => {
  userExecHistory.push(Date.now());
};

/**
 * Safely extracts human-readable string error messages from any error object.
 * Guarantees that an object is NEVER returned as the error field.
 * @param {any} err 
 * @returns {string}
 */
export const safeExtractErrorMessage = (err) => {
  if (!err) return 'Code execution service is temporarily unavailable.';
  if (typeof err === 'string') return err;

  // Axios error response object parsing
  if (err?.response?.data) {
    const data = err.response.data;
    if (typeof data === 'string') return data;
    if (typeof data.error === 'string') return data.error;
    if (typeof data.error?.message === 'string') return data.error.message;
    if (typeof data.message === 'string') return data.message;
  }

  if (typeof err.message === 'string') return err.message;
  if (typeof err.error === 'string') return err.error;
  if (typeof err.error?.message === 'string') return err.error.message;

  try {
    return JSON.stringify(err);
  } catch {
    return 'Code execution service is temporarily unavailable.';
  }
};

/**
 * Language configuration map for execution engine
 */
export const SUPPORTED_LANGUAGES = {
  python: { id: 71, name: 'Python 3', defaultCode: 'def main():\n    print("Hello from NEXLY Python Sandbox!")\n\nif __name__ == "__main__":\n    main()' },
  javascript: { id: 63, name: 'JavaScript (Node.js)', defaultCode: 'function main() {\n  console.log("Hello from NEXLY JavaScript Sandbox!");\n}\nmain();' },
  c: { id: 50, name: 'C (GCC)', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello from NEXLY C Sandbox!\\n");\n    return 0;\n}' },
  cpp: { id: 54, name: 'C++ (G++)', defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello from NEXLY C++ Sandbox!" << std::endl;\n    return 0;\n}' },
  java: { id: 62, name: 'Java (OpenJDK)', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from NEXLY Java Sandbox!");\n    }\n}' },
  sql: { id: 82, name: 'SQL (SQLite Sandbox)', defaultCode: 'SELECT * FROM students WHERE grade = "A";' }
};

/**
 * Executes raw source code via backend execution engine.
 * Passes raw source code & stdin to backend without any browser-side pre-validation or fallback simulation.
 * @param {string} language - Language identifier
 * @param {string} sourceCode - Source code to execute
 * @param {string} [stdin] - Optional standard input
 * @returns {Promise<{ success: boolean, output: string, executionTimeMs?: number, memoryKb?: number, error?: string }>}
 */
export const executeCode = async (language, sourceCode, stdin = '') => {
  const rateLimitStatus = checkRateLimit();
  if (!rateLimitStatus.allowed) {
    return {
      success: false,
      output: '',
      error: `Rate limit exceeded! Please wait ${rateLimitStatus.cooldownSeconds} seconds before submitting again (Max 10 runs/min).`
    };
  }

  recordExecutionAttempt();

  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('apex_token') : null;
    const response = await axios.post(
      `${API_BASE_URL}/compiler/execute`,
      {
        language,
        code: sourceCode,
        stdin,
        cpuTimeLimit: 5.0,
        memoryLimitKb: 128000
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        timeout: 15000 // 15-second HTTP timeout boundary
      }
    );

    if (response.data && response.data.data) {
      const { stdout, stderr, compile_output, time, memory, status } = response.data.data;
      
      let outputText = '';
      if (compile_output) {
        outputText = compile_output;
      } else if (stderr && stdout) {
        outputText = `${stdout}\n${stderr}`;
      } else if (stderr) {
        outputText = stderr;
      } else if (stdout) {
        outputText = stdout;
      } else if (status && status.description) {
        outputText = `[Status: ${status.description}]`;
      } else {
        outputText = '[Program executed cleanly with zero output]';
      }

      const isAccepted = status ? status.id === 3 : (!stderr && !compile_output);

      return {
        success: isAccepted,
        output: outputText,
        executionTimeMs: time ? Math.round(parseFloat(time) * 1000) : 0,
        memoryKb: memory || 0
      };
    }

    // Return explicit infrastructure error when response payload missing
    return {
      success: false,
      output: '',
      error: 'Code execution service is temporarily unavailable.'
    };
  } catch (err) {
    console.error('Backend code execution error:', err?.response?.data || err.message);
    const backendError = safeExtractErrorMessage(err);
    return {
      success: false,
      output: '',
      error: backendError || 'Code execution service is temporarily unavailable.'
    };
  }
};
