"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerController = void 0;
const compiler_service_1 = require("../services/compiler.service");
const errors_1 = require("../../../errors");
class CompilerController {
    compilerService;
    constructor(compilerService = new compiler_service_1.CompilerService()) {
        this.compilerService = compilerService;
    }
    execute = async (req, res) => {
        const { language, code, stdin, cpuTimeLimit, memoryLimitKb } = req.body;
        if (!language || typeof language !== 'string') {
            throw new errors_1.ValidationError('Field "language" is required.');
        }
        if (code === undefined || code === null || typeof code !== 'string') {
            throw new errors_1.ValidationError('Field "code" must be a valid string.');
        }
        // Phase 6: Server-side Code Size Safeguards
        if (code.length > 64000) {
            throw new errors_1.ValidationError('Source code size exceeds maximum allowed length of 64KB.');
        }
        if (stdin && typeof stdin === 'string' && stdin.length > 64000) {
            throw new errors_1.ValidationError('Stdin size exceeds maximum allowed length of 64KB.');
        }
        try {
            const result = await this.compilerService.executeCode({
                language,
                code,
                stdin: typeof stdin === 'string' ? stdin : '',
                cpuTimeLimit,
                memoryLimitKb,
            });
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (err) {
            res.status(503).json({
                success: false,
                error: err.message || 'Code execution service is temporarily unavailable.',
            });
        }
    };
}
exports.CompilerController = CompilerController;
exports.default = CompilerController;
