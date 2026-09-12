"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bullmq_1 = require("bullmq");
const queue_config_1 = require("../config/queue.config");
const logger_1 = require("../../../utils/logger");
const context_1 = require("../../../utils/context");
const errors_1 = require("../../../errors");
class QueueService {
    submissionQueue;
    maxQueueDepth = 1000;
    reserveCapacity = 200; // Contest reserve capacity slots
    constructor() {
        this.submissionQueue = new bullmq_1.Queue('submission-queue', queue_config_1.defaultQueueOptions);
    }
    /**
     * Generates a unique, deterministic job ID hash for deduplication.
     */
    generateJobId(userId, problemId, sourceCode) {
        return crypto_1.default
            .createHash('sha256')
            .update(`${userId}:${problemId}:${sourceCode}`)
            .digest('hex');
    }
    /**
     * Pushes a submission execution job to the BullMQ stream, applying load shedding.
     */
    async addSubmissionJob(userId, payload, priority = 10 // Standard practice priority (Contests priority = 1)
    ) {
        // 1. Admission Control & Load Shedding checks
        const counts = await this.submissionQueue.getJobCounts();
        const currentDepth = (counts.waiting || 0) + (counts.active || 0);
        // Shed load if queue exceeds capacity, reserving remaining slots for contest users
        if (currentDepth >= this.maxQueueDepth) {
            throw new errors_1.ServiceUnavailableError('Code execution engine is currently overloaded. Please try again.');
        }
        if (priority > 1 && currentDepth >= (this.maxQueueDepth - this.reserveCapacity)) {
            logger_1.logger.warn({
                eventName: 'QUEUE_LOAD_SHED_PRACTICE',
                currentDepth,
                message: 'Practice submission rejected early under load shedding parameters to protect contests.',
            });
            throw new errors_1.ServiceUnavailableError('Practice executions are temporarily throttled to prioritize live contests.');
        }
        // 2. Generate unique deterministic job id to prevent duplicate enqueues
        const jobId = this.generateJobId(userId, payload.problemId, payload.sourceCode);
        // 3. Inject request context for distributed logging tracing
        const requestId = context_1.RequestContext.getRequestId();
        const jobPayload = {
            ...payload,
            userId,
            schemaVersion: 1, // Current payload schema version
            requestId,
            correlationId: requestId,
        };
        const job = await this.submissionQueue.add('submission', jobPayload, {
            jobId,
            priority,
        });
        logger_1.logger.info({
            eventName: 'QUEUE_JOB_ENQUEUED',
            jobId: job.id,
            submissionId: payload.submissionId,
            currentDepth,
        });
        return job.id;
    }
    /**
     * Retrieves active metrics for monitoring telemetry.
     */
    async getQueueMetrics() {
        const counts = await this.submissionQueue.getJobCounts();
        return {
            waiting: counts.waiting,
            active: counts.active,
            completed: counts.completed,
            failed: counts.failed,
            delayed: counts.delayed,
        };
    }
}
exports.QueueService = QueueService;
exports.default = QueueService;
