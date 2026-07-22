import { Role } from '@prisma/client';

export interface SystemHealthReport {
  api: 'UP' | 'DOWN';
  postgres: 'UP' | 'DOWN';
  redis: 'UP' | 'DOWN';
  workers: 'UP' | 'DOWN';
  cpuUsagePercent: number;
  memoryUsageMb: number;
  diskFreeBytes: number;
  postgresConnectionsCount: number;
  queueBacklogSize: number;
}

export interface PlatformTimelineEntry {
  id: string;
  type: 'ANNOUNCEMENT' | 'INCIDENT' | 'AUDIT_ACTION' | 'DEPLOYMENT';
  title: string;
  content: string;
  timestamp: Date;
  metadata?: any;
}

export interface ApiKeyProvider {
  validateKey(key: string, scopes: string[]): Promise<boolean>;
  rotateKey(keyId: string): Promise<string>;
  revokeKey(keyId: string): Promise<void>;
}

// Operations domain events
export interface UserSuspendedEvent {
  userId: string;
  suspendedBy: string;
  reason: string;
  until?: Date;
}

export interface ProblemApprovedEvent {
  problemId: string;
  approvedBy: string;
}

export interface ContestArchivedEvent {
  contestId: string;
  archivedBy: string;
}

export interface IncidentResolvedEvent {
  incidentId: string;
  resolvedBy: string;
  postmortem?: string;
}
