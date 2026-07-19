import { SocketGateway } from '../gateways/socket.gateway';
import { logger } from '../../../utils/logger';

let gatewayInstance: SocketGateway | null = null;

export class SubmissionPublisher {
  /**
   * Retrieves the active SocketGateway reference.
   */
  private getGateway(): SocketGateway {
    if (!gatewayInstance) {
      gatewayInstance = new SocketGateway();
    }
    return gatewayInstance;
  }

  /**
   * Dispatches a real-time code execution progress update to the user.
   */
  public publishSubmissionUpdate(
    userId: string,
    payload: {
      submissionId: string;
      status: string;
      executionTime?: number | null;
      memoryUsage?: number | null;
      compileOutput?: string | null;
      runtimeOutput?: string | null;
      sequenceNumber: number;
      correlationId?: string;
    }
  ): void {
    const eventName = 'submission:updated';

    const eventPayload = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      schemaVersion: 1, // Current payload schema version
      timestamp: Date.now(),
      ...payload,
    };

    try {
      this.getGateway().sendToUser(userId, eventName, eventPayload);
      
      logger.info({
        eventName: 'SUBMISSION_PUBLISHER_SENT',
        userId,
        submissionId: payload.submissionId,
        status: payload.status,
      });
    } catch (err: any) {
      logger.error({
        eventName: 'SUBMISSION_PUBLISHER_FAILED',
        userId,
        submissionId: payload.submissionId,
        error: err.message,
      });
    }
  }
}
export default SubmissionPublisher;
