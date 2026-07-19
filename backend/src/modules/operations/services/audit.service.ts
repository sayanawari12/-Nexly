import crypto from 'crypto';
import { Request } from 'express';
import { PlatformAuditLog } from '@prisma/client';
import { OperationsRepository } from '../repositories/operations.repository';
import { RequestContext } from '../../../utils/context';
import logger from '../../../utils/logger';

export class AuditService {
  private readonly repo: OperationsRepository;

  constructor(repo = new OperationsRepository()) {
    this.repo = repo;
  }

  /**
   * Logs a platform operation, computing the cryptographic chain hash value linking it to previous logs
   */
  public async logAction(params: {
    actorId?: string;
    action: string;
    resource: string;
    beforeState?: any;
    afterState?: any;
    req?: Request;
  }): Promise<PlatformAuditLog> {
    const { actorId, action, resource, beforeState, afterState, req } = params;

    // Resolve request metadata
    const ipAddress = req ? (req.ip || req.socket.remoteAddress || '127.0.0.1') : '127.0.0.1';
    const userAgent = req ? (req.headers['user-agent'] as string) : 'system';
    const correlationId = RequestContext.get('requestId') || 'system-runner';

    // 1. Fetch latest log to read previous hash
    const latestLog = await this.repo.getLatestAuditLog();
    const prevHash = latestLog ? latestLog.hash : '';

    // 2. Concatenate cells parameters to calculate SHA-256 integrity block
    const actorStr = actorId || '';
    const beforeStr = beforeState ? JSON.stringify(beforeState) : '';
    const afterStr = afterState ? JSON.stringify(afterState) : '';

    const payload = `${actorStr}:${action}:${resource}:${beforeStr}:${afterStr}:${prevHash}`;
    const hash = crypto.createHash('sha256').update(payload).digest('hex');

    // 3. Write to PostgreSQL database
    const log = await this.repo.writeAuditLog({
      actorId: actorId || null,
      action,
      resource,
      beforeState: beforeState || null,
      afterState: afterState || null,
      ipAddress,
      userAgent: userAgent || null,
      correlationId: correlationId || null,
      hash,
      prevHash: prevHash || null,
    });

    logger.info({
      eventName: 'AUDIT_LOG_WRITTEN',
      action,
      resource,
      hash,
    });

    return log;
  }

  /**
   * Scans and verifies the cryptographic chain integrity (blockchain validation strategy)
   */
  public async verifyAuditChain(): Promise<boolean> {
    const logs = await this.repo.getAuditLogs();
    
    // Check logs chronologically (reverse retrieve list order)
    const chronoLogs = [...logs].reverse();

    for (let i = 0; i < chronoLogs.length; i++) {
      const current = chronoLogs[i];
      const prevHash = i === 0 ? null : chronoLogs[i - 1].hash;

      if (current.prevHash !== prevHash) {
        logger.error({
          eventName: 'AUDIT_CHAIN_CORRUPTED',
          message: 'Previous hash mismatch.',
          logId: current.id,
          expectedPrevHash: prevHash,
          actualPrevHash: current.prevHash,
        });
        return false;
      }

      // Recompute hash
      const actorStr = current.actorId || '';
      const beforeStr = current.beforeState ? JSON.stringify(current.beforeState) : '';
      const afterStr = current.afterState ? JSON.stringify(current.afterState) : '';
      const prevHashStr = prevHash || '';
      const payload = `${actorStr}:${current.action}:${current.resource}:${beforeStr}:${afterStr}:${prevHashStr}`;
      const recomputedHash = crypto.createHash('sha256').update(payload).digest('hex');

      if (current.hash !== recomputedHash) {
        logger.error({
          eventName: 'AUDIT_CHAIN_TAMPERED',
          message: 'Recomputed hash mismatch.',
          logId: current.id,
          savedHash: current.hash,
          recomputedHash,
        });
        return false;
      }
    }

    return true;
  }
}
export default AuditService;
