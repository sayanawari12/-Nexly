import { submitSubmission, getSubmissionStatus, decodeBase64 } from '../../repositories/compilerRepository';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TRANSIENT_STATUS_CODES = [429, 500, 502, 503, 504];

/**
 * Wrapper to run a repository call with transient backoff retries.
 * Retries up to 3 times on Network failures or HTTP 429/5xx status codes.
 */
const runWithRetry = async (fn, attempts = 3, backoff = 1000) => {
  try {
    return await fn();
  } catch (error) {
    const status = error?.response?.status;
    const isTransient = !status || TRANSIENT_STATUS_CODES.includes(status);

    if (attempts > 0 && isTransient) {
      console.warn(
        `[Compiler Service] Transient error detected (HTTP ${
          status || 'Network'
        }). Retrying in ${backoff}ms... (${attempts} attempts left)`
      );
      await delay(backoff);
      return await runWithRetry(fn, attempts - 1, backoff * 2);
    }
    throw error;
  }
};

/**
 * Maps Judge0 Status IDs to user-friendly status messages.
 */
const mapStatusToMessage = (statusId) => {
  switch (statusId) {
    case 1:
      return 'In Queue';
    case 2:
      return 'Processing Code...';
    case 3:
      return 'Success (Execution Completed)';
    case 4:
      return 'Wrong Answer';
    case 5:
      return 'Time Limit Exceeded (Timeout)';
    case 6:
      return 'Compilation Error';
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return 'Runtime Error (Crash / Memory Limit)';
    case 13:
      return 'Internal API Error';
    case 14:
      return 'Execution Limit Exceeded';
    default:
      return 'Unknown Execution Status';
  }
};

/**
 * Coordinate code submission, polling loop, retry strategy, and response decoding.
 * Checks validation callbacks periodically to support cancellation.
 */
export const runCode = async (sourceCode, languageId, stdin, onProgress, isExecutionActive) => {
  try {
    // 1. Submit Code
    if (onProgress) {
      onProgress({ status: 'submitting', message: 'Submitting program...' });
    }
    const submissionResponse = await runWithRetry(() => submitSubmission(sourceCode, languageId, stdin));
    const token = submissionResponse.token;

    // 2. Polling Loop
    let pollCount = 0;
    const maxPolls = 10;
    const pollInterval = 1500;

    while (pollCount < maxPolls) {
      // Check cancellation state first
      if (isExecutionActive && !isExecutionActive()) {
        console.log('[Compiler Service] Execution session aborted. Cancelling polling loop.');
        return null;
      }

      pollCount++;
      await delay(pollInterval);

      // Verify cancellation again after delay
      if (isExecutionActive && !isExecutionActive()) {
        return null;
      }

      // Check Status
      const statusResponse = await runWithRetry(() => getSubmissionStatus(token));
      const statusId = statusResponse.status?.id;

      if (onProgress) {
        onProgress({ status: 'processing', message: mapStatusToMessage(statusId) });
      }

      // If execution has finished compiling & running (Status >= 3)
      if (statusId >= 3) {
        const decodedStdout = decodeBase64(statusResponse.stdout);
        const decodedStderr = decodeBase64(statusResponse.stderr);
        const decodedCompileOutput = decodeBase64(statusResponse.compile_output);

        let resultStatus = 'accepted';
        if (statusId === 5) resultStatus = 'timeout';
        else if (statusId === 6) resultStatus = 'compile_error';
        else if (statusId >= 7 && statusId <= 12) resultStatus = 'runtime_error';
        else if (statusId > 12) resultStatus = 'error';

        return {
          status: resultStatus,
          statusMessage: mapStatusToMessage(statusId),
          stdout: decodedStdout || null,
          stderr: decodedStderr || null,
          compileOutput: decodedCompileOutput || null,
          time: statusResponse.time || null,
          memory: statusResponse.memory || null
        };
      }
    }

    // Time limit exceeded after polling limits (15 seconds)
    return {
      status: 'timeout',
      statusMessage: 'Time Limit Exceeded (Timeout)',
      stdout: null,
      stderr: 'Execution timed out because compiling took longer than 15 seconds.',
      compileOutput: null,
      time: null,
      memory: null
    };
  } catch (error) {
    if (error.message === 'MISSING_API_CREDENTIALS') {
      return {
        status: 'error',
        statusMessage: 'API Credentials Missing',
        stdout: null,
        stderr: 'Error: REACT_APP_JUDGE0_API_KEY and/or REACT_APP_JUDGE0_API_HOST are not correctly configured.\n\nTo resolve this:\n1. Create or update the `.env` file in the project root directory.\n2. Set valid values for the following keys:\n   REACT_APP_JUDGE0_API_HOST=judge0-ce.p.rapidapi.com\n   REACT_APP_JUDGE0_API_KEY=your_actual_rapidapi_key\n\n(See `.env.example` in the project root for guidance.)\n3. Restart the development server after editing `.env`.',
        compileOutput: null,
        time: null,
        memory: null
      };
    }

    if (error.message === 'INVALID_API_KEY') {
      return {
        status: 'error',
        statusMessage: 'Invalid API Key (HTTP 401)',
        stdout: null,
        stderr: 'Error: The Judge0 API key provided is invalid or has been revoked (HTTP 401 Unauthorized).\n\nTo resolve this:\n1. Log in to https://rapidapi.com and verify your Judge0 CE subscription is active.\n2. Copy your current API key from the RapidAPI dashboard.\n3. Update REACT_APP_JUDGE0_API_KEY in your `.env` file.\n4. Restart the development server.',
        compileOutput: null,
        time: null,
        memory: null
      };
    }

    if (error.message === 'FORBIDDEN_403') {
      return {
        status: 'error',
        statusMessage: 'Access Forbidden (HTTP 403)',
        stdout: null,
        stderr: 'Error: Access to the Judge0 API was denied (HTTP 403 Forbidden).\n\nThis usually means:\n• Your RapidAPI subscription for Judge0 CE has expired or been cancelled.\n• The API host in REACT_APP_JUDGE0_API_HOST does not match your subscription.\n\nTo resolve this:\n1. Visit https://rapidapi.com/judge0-official/api/judge0-ce and subscribe (free tier available).\n2. Ensure REACT_APP_JUDGE0_API_HOST=judge0-ce.p.rapidapi.com in your `.env` file.\n3. Restart the development server.',
        compileOutput: null,
        time: null,
        memory: null
      };
    }

    if (error.message === 'RATE_LIMITED_429') {
      return {
        status: 'error',
        statusMessage: 'Rate Limited (HTTP 429)',
        stdout: null,
        stderr: 'Error: Too many requests sent to the Judge0 API (HTTP 429 Too Many Requests).\n\nYou have exceeded the free-tier rate limit. Please wait a moment and try again.\nIf this occurs frequently, consider upgrading your RapidAPI plan at https://rapidapi.com.',
        compileOutput: null,
        time: null,
        memory: null
      };
    }

    return {
      status: 'error',
      statusMessage: 'Network Connection Failed',
      stdout: null,
      stderr: error?.message || 'Connection timed out or returned a transient network error.',
      compileOutput: null,
      time: null,
      memory: null
    };
  }
};
