"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const database_1 = require("../../../config/database");
const os_1 = __importDefault(require("os"));
const queue_config_1 = require("../../queue/config/queue.config");
class MonitoringService {
    redis;
    constructor() {
        this.redis = (0, queue_config_1.createRedisInstance)();
    }
    /**
     * Asserts service health and aggregates hardware statistics
     */
    async getHealthReport() {
        const report = {
            timestamp: new Date(),
            status: 'HEALTHY',
            services: {},
            system: {},
        };
        // 1. Check PostgreSQL
        try {
            await database_1.prisma.$queryRaw `SELECT 1`;
            report.services.postgres = { status: 'UP' };
        }
        catch (err) {
            report.services.postgres = { status: 'DOWN', error: err.message };
            report.status = 'UNHEALTHY';
        }
        // 2. Check Redis
        try {
            const ping = await this.redis.ping();
            report.services.redis = { status: ping === 'PONG' ? 'UP' : 'DOWN' };
        }
        catch (err) {
            report.services.redis = { status: 'DOWN', error: err.message };
            report.status = 'UNHEALTHY';
        }
        // 4. Check Queue Backlog Size (BullMQ submissions queue)
        try {
            const depth = await this.redis.llen('bull:submissions:wait');
            report.services.submissionsQueue = {
                status: 'UP',
                depth,
            };
        }
        catch (err) { }
        // 5. Aggregates system metrics
        report.system = {
            cpuFreePercent: os_1.default.freemem() / os_1.default.totalmem(),
            memoryTotalMb: os_1.default.totalmem() / (1024 * 1024),
            memoryFreeMb: os_1.default.freemem() / (1024 * 1024),
            loadAverage: os_1.default.loadavg(),
            platform: os_1.default.platform(),
            uptimeSeconds: process.uptime(),
        };
        return report;
    }
    /**
     * Generates Prometheus scrapable metrics page payload
     */
    async getPrometheusMetrics() {
        const health = await this.getHealthReport();
        const metrics = [];
        // System metrics
        metrics.push('# HELP apex_system_uptime_seconds System runtime uptime in seconds');
        metrics.push('# TYPE apex_system_uptime_seconds gauge');
        metrics.push(`apex_system_uptime_seconds ${health.system.uptimeSeconds}`);
        metrics.push('# HELP apex_memory_free_bytes Free memory bytes');
        metrics.push('# TYPE apex_memory_free_bytes gauge');
        metrics.push(`apex_memory_free_bytes ${Math.round(health.system.memoryFreeMb * 1024 * 1024)}`);
        // Services statuses (1 = UP, 0 = DOWN)
        const pgUp = health.services.postgres?.status === 'UP' ? 1 : 0;
        metrics.push('# HELP apex_service_up Status of core database PostgreSQL');
        metrics.push('# TYPE apex_service_up gauge');
        metrics.push(`apex_service_up{service="postgres"} ${pgUp}`);
        const redisUp = health.services.redis?.status === 'UP' ? 1 : 0;
        metrics.push(`apex_service_up{service="redis"} ${redisUp}`);
        // Queue depth
        const queueDepth = health.services.submissionsQueue?.depth || 0;
        metrics.push('# HELP apex_queue_depth Active jobs waiting inside execution queue');
        metrics.push('# TYPE apex_queue_depth gauge');
        metrics.push(`apex_queue_depth{queue="submissions"} ${queueDepth}`);
        return metrics.join('\n');
    }
    async close() {
        await this.redis.quit();
    }
}
exports.MonitoringService = MonitoringService;
exports.default = MonitoringService;
