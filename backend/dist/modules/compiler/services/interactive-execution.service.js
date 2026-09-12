"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveExecutionService = exports.InteractiveExecutionService = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const os_1 = __importDefault(require("os"));
const logger_1 = require("../../../utils/logger");
const MAX_EXECUTION_TIME_MS = 15000; // 15s hard timeout cap
const MAX_CODE_BYTES = 64 * 1024; // 64KB max code size
const MAX_STDIN_BYTES = 10 * 1024; // 10KB max stdin cap
const MAX_OUTPUT_BYTES = 256 * 1024; // 256KB max accumulated stdout/stderr cap
class InteractiveExecutionService {
    activeSessions = new Map();
    /**
     * Sanitized minimal environment variables allowlist.
     * Prevents user code from reading DATABASE_URL, REDIS_URL, JWT_SECRET, or Render API keys.
     */
    getSanitizedEnv(sessionDir) {
        return {
            PATH: process.env.PATH || '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            TMP: sessionDir,
            TEMP: sessionDir,
            TMPDIR: sessionDir,
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            PYTHONUNBUFFERED: '1', // Ensures Python input prompts flush immediately to stdout
        };
    }
    /**
     * Starts a real-time interactive execution session
     */
    async startSession(options) {
        const { sessionId, userId, language, code, onStdout, onStderr, onExit, onError } = options;
        // Check code size limit
        if (!code || Buffer.byteLength(code, 'utf-8') > MAX_CODE_BYTES) {
            onError('Code size exceeds maximum limit of 64KB.');
            return;
        }
        // Enforce 1 active session per user & terminate any existing session for this socket/session ID
        for (const [existingSessionId, existingSession] of this.activeSessions.entries()) {
            if (existingSession.userId === userId || existingSessionId === sessionId) {
                await this.stopSession(existingSessionId, 'CONCURRENT_SESSION_TERMINATED');
            }
        }
        const baseTmpDir = path_1.default.join(os_1.default.tmpdir(), 'nexly_exec');
        if (!(0, fs_1.existsSync)(baseTmpDir)) {
            try {
                (0, fs_1.mkdirSync)(baseTmpDir, { recursive: true, mode: 0o700 });
            }
            catch (e) {
                // Fallback
            }
        }
        const sessionDir = path_1.default.join(baseTmpDir, `session_${sessionId}_${Date.now()}`);
        try {
            await promises_1.default.mkdir(sessionDir, { recursive: true, mode: 0o700 });
        }
        catch (err) {
            logger_1.logger.error({ eventName: 'INTERACTIVE_SESSION_DIR_ERROR', sessionId, error: err.message });
            onError('Failed to initialize execution environment.');
            return;
        }
        const session = {
            sessionId,
            userId,
            language: language.toLowerCase().trim(),
            tempDir: sessionDir,
            childProcess: null,
            startTime: Date.now(),
            timer: null,
            accumulatedOutputBytes: 0,
            accumulatedStdinBytes: 0,
            isTerminated: false,
            onStdout,
            onStderr,
            onExit,
            onError,
        };
        this.activeSessions.set(sessionId, session);
        // Enforce hard wall-clock 15s timeout
        session.timer = setTimeout(() => {
            if (this.activeSessions.has(sessionId)) {
                logger_1.logger.warn({ eventName: 'INTERACTIVE_TIMEOUT', sessionId, userId });
                session.onStdout('\n[Execution Timed Out (15s limit exceeded)]\n');
                this.stopSession(sessionId, 'TIMED_OUT');
            }
        }, MAX_EXECUTION_TIME_MS);
        try {
            await this.prepareAndSpawn(session, code);
        }
        catch (err) {
            logger_1.logger.error({ eventName: 'INTERACTIVE_SPAWN_ERROR', sessionId, error: err.message });
            session.onError(`Execution Setup Failed: ${err.message}`);
            await this.cleanupSession(sessionId);
        }
    }
    /**
     * Prepares files, compiles if necessary, and spawns the unbuffered execution process
     */
    async prepareAndSpawn(session, code) {
        const { sessionDir } = { sessionDir: session.tempDir };
        const lang = session.language;
        const sanitizedEnv = this.getSanitizedEnv(sessionDir);
        let command = '';
        let args = [];
        if (lang === 'python' || lang === 'py' || lang === 'python3') {
            const filePath = path_1.default.join(sessionDir, 'main.py');
            await promises_1.default.writeFile(filePath, code, 'utf-8');
            command = process.platform === 'win32' ? 'python' : 'python3';
            args = ['-u', filePath];
        }
        else if (lang === 'javascript' || lang === 'js') {
            const filePath = path_1.default.join(sessionDir, 'main.js');
            await promises_1.default.writeFile(filePath, code, 'utf-8');
            command = 'node';
            args = [filePath];
        }
        else if (lang === 'c') {
            const srcPath = path_1.default.join(sessionDir, 'main.c');
            const binPath = path_1.default.join(sessionDir, process.platform === 'win32' ? 'main.exe' : 'main');
            await promises_1.default.writeFile(srcPath, code, 'utf-8');
            // Compile C source code
            const compileErr = await this.compileCode(`gcc -O2 "${srcPath}" -o "${binPath}"`, sessionDir, sanitizedEnv);
            if (compileErr) {
                session.onStderr(compileErr);
                session.onExit({ exitCode: 1, executionTimeMs: Date.now() - session.startTime, memoryKb: 0, status: 'COMPILE_ERROR' });
                await this.cleanupSession(session.sessionId);
                return;
            }
            command = binPath;
            args = [];
        }
        else if (lang === 'cpp' || lang === 'c++') {
            const srcPath = path_1.default.join(sessionDir, 'main.cpp');
            const binPath = path_1.default.join(sessionDir, process.platform === 'win32' ? 'main.exe' : 'main');
            await promises_1.default.writeFile(srcPath, code, 'utf-8');
            // Compile C++ source code
            const compileErr = await this.compileCode(`g++ -O2 "${srcPath}" -o "${binPath}"`, sessionDir, sanitizedEnv);
            if (compileErr) {
                session.onStderr(compileErr);
                session.onExit({ exitCode: 1, executionTimeMs: Date.now() - session.startTime, memoryKb: 0, status: 'COMPILE_ERROR' });
                await this.cleanupSession(session.sessionId);
                return;
            }
            command = binPath;
            args = [];
        }
        else if (lang === 'java') {
            const srcPath = path_1.default.join(sessionDir, 'Main.java');
            await promises_1.default.writeFile(srcPath, code, 'utf-8');
            // Compile Java source code
            const compileErr = await this.compileCode(`javac "${srcPath}"`, sessionDir, sanitizedEnv);
            if (compileErr) {
                session.onStderr(compileErr);
                session.onExit({ exitCode: 1, executionTimeMs: Date.now() - session.startTime, memoryKb: 0, status: 'COMPILE_ERROR' });
                await this.cleanupSession(session.sessionId);
                return;
            }
            command = 'java';
            args = ['-Xmx128m', '-cp', sessionDir, 'Main'];
        }
        else {
            throw new Error(`Unsupported interactive language: '${lang}'`);
        }
        if (session.isTerminated)
            return;
        logger_1.logger.info({
            eventName: 'INTERACTIVE_PROCESS_SPAWN',
            sessionId: session.sessionId,
            userId: session.userId,
            language: lang,
            command,
            args,
        });
        const child = (0, child_process_1.spawn)(command, args, {
            cwd: sessionDir,
            env: sanitizedEnv,
            detached: process.platform !== 'win32', // Allows process group killing on Unix/Linux
            stdio: ['pipe', 'pipe', 'pipe'],
        });
        session.childProcess = child;
        // Handle Stdout Data
        child.stdout?.on('data', (chunk) => {
            if (session.isTerminated)
                return;
            const str = chunk.toString('utf-8');
            session.accumulatedOutputBytes += Buffer.byteLength(str, 'utf-8');
            if (session.accumulatedOutputBytes > MAX_OUTPUT_BYTES) {
                session.onStdout('\n[Output limit exceeded (256KB cap reached). Terminating process.]\n');
                this.stopSession(session.sessionId, 'OUTPUT_LIMIT_EXCEEDED');
                return;
            }
            session.onStdout(str);
        });
        // Handle Stderr Data
        child.stderr?.on('data', (chunk) => {
            if (session.isTerminated)
                return;
            const str = chunk.toString('utf-8');
            session.accumulatedOutputBytes += Buffer.byteLength(str, 'utf-8');
            if (session.accumulatedOutputBytes > MAX_OUTPUT_BYTES) {
                session.onStderr('\n[Output limit exceeded (256KB cap reached). Terminating process.]\n');
                this.stopSession(session.sessionId, 'OUTPUT_LIMIT_EXCEEDED');
                return;
            }
            session.onStderr(str);
        });
        // Handle Spawn Errors
        child.on('error', (err) => {
            if (session.isTerminated)
                return;
            logger_1.logger.error({ eventName: 'INTERACTIVE_CHILD_ERROR', sessionId: session.sessionId, error: err.message });
            session.onError(`Process Execution Failed: ${err.message}`);
            this.cleanupSession(session.sessionId);
        });
        // Handle Process Exit
        child.on('close', (code) => {
            if (session.isTerminated)
                return;
            session.isTerminated = true;
            const durationMs = Date.now() - session.startTime;
            logger_1.logger.info({
                eventName: 'INTERACTIVE_PROCESS_EXIT',
                sessionId: session.sessionId,
                exitCode: code,
                durationMs,
            });
            session.onExit({
                exitCode: code,
                executionTimeMs: durationMs,
                memoryKb: 4096, // Estimate / reporting
                status: code === 0 ? 'COMPLETED' : 'RUNTIME_ERROR',
            });
            this.cleanupSession(session.sessionId);
        });
    }
    /**
     * Helper to compile C, C++, or Java code
     */
    compileCode(cmd, cwd, env) {
        return new Promise((resolve) => {
            (0, child_process_1.exec)(cmd, { cwd, env, timeout: 8000 }, (error, stdout, stderr) => {
                if (error) {
                    resolve(stderr || stdout || error.message);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    /**
     * Writes stdin data to the active running child process
     */
    writeStdin(sessionId, input, userId) {
        const session = this.activeSessions.get(sessionId);
        if (!session || !session.childProcess || session.isTerminated) {
            return;
        }
        // Enforce session ownership
        if (userId && session.userId !== userId) {
            logger_1.logger.warn({ eventName: 'INTERACTIVE_UNAUTHORIZED_STDIN', sessionId, userId, sessionUserId: session.userId });
            return;
        }
        const inputStr = input.endsWith('\n') ? input : `${input}\n`;
        const inputBytes = Buffer.byteLength(inputStr, 'utf-8');
        session.accumulatedStdinBytes += inputBytes;
        if (session.accumulatedStdinBytes > MAX_STDIN_BYTES) {
            session.onError('Stdin size limit exceeded (10KB max cap).');
            this.stopSession(sessionId, 'STDIN_LIMIT_EXCEEDED');
            return;
        }
        try {
            session.childProcess.stdin?.write(inputStr);
        }
        catch (err) {
            logger_1.logger.error({ eventName: 'INTERACTIVE_STDIN_WRITE_FAILED', sessionId, error: err.message });
        }
    }
    /**
     * Immediately stops a running session and kills the process tree
     */
    async stopSession(sessionId, statusOverride, userId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        // Enforce session ownership
        if (userId && session.userId !== userId) {
            logger_1.logger.warn({ eventName: 'INTERACTIVE_UNAUTHORIZED_STOP', sessionId, userId, sessionUserId: session.userId });
            return;
        }
        session.isTerminated = true;
        if (session.timer) {
            clearTimeout(session.timer);
            session.timer = null;
        }
        if (session.childProcess && !session.childProcess.killed) {
            try {
                if (process.platform !== 'win32' && session.childProcess.pid) {
                    // Kill the entire process group (parent and all sub-processes/threads)
                    process.kill(-session.childProcess.pid, 'SIGKILL');
                }
                else {
                    session.childProcess.kill('SIGKILL');
                }
            }
            catch (err) {
                try {
                    session.childProcess.kill('SIGKILL');
                }
                catch (e) {
                    // Process already dead
                }
            }
        }
        if (statusOverride) {
            session.onExit({
                exitCode: 137,
                executionTimeMs: Date.now() - session.startTime,
                memoryKb: 0,
                status: statusOverride,
            });
        }
        await this.cleanupSession(sessionId);
    }
    /**
     * Cleans up timer, map entry, and removes session temporary directory
     */
    async cleanupSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session)
            return;
        if (session.timer) {
            clearTimeout(session.timer);
            session.timer = null;
        }
        this.activeSessions.delete(sessionId);
        // Delete session directory cleanly
        if (session.tempDir && (0, fs_1.existsSync)(session.tempDir)) {
            try {
                await promises_1.default.rm(session.tempDir, { recursive: true, force: true });
            }
            catch (err) {
                try {
                    (0, fs_1.rmSync)(session.tempDir, { recursive: true, force: true });
                }
                catch (e) {
                    // Ignore
                }
            }
        }
    }
}
exports.InteractiveExecutionService = InteractiveExecutionService;
exports.interactiveExecutionService = new InteractiveExecutionService();
exports.default = exports.interactiveExecutionService;
