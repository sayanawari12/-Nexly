"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = require("../config");
const context_1 = require("./context");
exports.logger = (0, pino_1.default)({
    level: config_1.config.logger.level,
    // Auto-inject correlation tracking parameters into structured JSON logs
    mixin() {
        const requestId = context_1.RequestContext.getRequestId();
        const userId = context_1.RequestContext.get('userId');
        return {
            ...(requestId && { requestId }),
            ...(userId && { userId }),
        };
    },
    transport: config_1.config.app.env !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    } : undefined,
});
exports.default = exports.logger;
