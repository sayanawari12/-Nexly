import { Redis } from 'ioredis';
import { prisma } from '../../../config/database';
import { config } from '../../../config';
import axios from 'axios';
import os from 'os';
import logger from '../../../utils/logger';

export class MonitoringService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(config.queue.redisUrl);
  }

  /**
   * Asserts service health and aggregates hardware statistics
   */
  public async getHealthReport(): Promise<any> {
    const report: any = {
      timestamp: new Date(),
      status: 'HEALTHY',
      services: {},
      system: {},
    };

    // 1. Check PostgreSQL
    try {
      await prisma.$queryRaw`SELECT 1`;
      report.services.postgres = { status: 'UP' };
    } catch (err: any) {
      report.services.postgres = { status: 'DOWN', error: err.message };
      report.status = 'UNHEALTHY';
    }

    // 2. Check Redis
    try {
      const ping = await this.redis.ping();
      report.services.redis = { status: ping === 'PONG' ? 'UP' : 'DOWN' };
    } catch (err: any) {
      report.services.redis = { status: 'DOWN', error: err.message };
      report.status = 'UNHEALTHY';
    }

    // 3. Check Judge0
    try {
      const judgeRes = await axios.get('http://localhost:2358/teachers', {
        timeout: 3000,
      });
      report.services.judge0 = { status: 'UP' };
    } catch (err: any) {
      report.services.judge0 = { status: 'DOWN', error: err.message };
      // Do not mark system UNHEALTHY if Judge0 is down
    }

    // 4. Check Queue Backlog Size (BullMQ submissions queue)
    try {
      const depth = await this.redis.llen('bull:submissions:wait');
      report.services.submissionsQueue = {
        status: 'UP',
        depth,
      };
    } catch (err) {}

    // 5. Aggregates system metrics
    report.system = {
      cpuFreePercent: os.freemem() / os.totalmem(),
      memoryTotalMb: os.totalmem() / (1024 * 1024),
      memoryFreeMb: os.freemem() / (1024 * 1024),
      loadAverage: os.loadavg(),
      platform: os.platform(),
      uptimeSeconds: process.uptime(),
    };

    return report;
  }

  /**
   * Generates Prometheus scrapable metrics page payload
   */
  public async getPrometheusMetrics(): Promise<string> {
    const health = await this.getHealthReport();
    const metrics: string[] = [];

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

    const j0Up = health.services.judge0?.status === 'UP' ? 1 : 0;
    metrics.push(`apex_service_up{service="judge0"} ${j0Up}`);

    // Queue depth
    const queueDepth = health.services.submissionsQueue?.depth || 0;
    metrics.push('# HELP apex_queue_depth Active jobs waiting inside execution queue');
    metrics.push('# TYPE apex_queue_depth gauge');
    metrics.push(`apex_queue_depth{queue="submissions"} ${queueDepth}`);

    return metrics.join('\n');
  }

  public async close(): Promise<void> {
    await this.redis.quit();
  }
}

export default MonitoringService;