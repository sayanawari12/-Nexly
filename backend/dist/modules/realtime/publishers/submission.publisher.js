"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionPublisher = void 0;
const socket_gateway_1 = require("../gateways/socket.gateway");
const logger_1 = require("../../../utils/logger");
let gatewayInstance = null;
class SubmissionPublisher {
    /**
     * Retrieves the active SocketGateway reference.
     */
    getGateway() {
        if (!gatewayInstance) {
            gatewayInstance = new socket_gateway_1.SocketGateway();
        }
        return gatewayInstance;
    }
    /**
     * Dispatches a real-time code execution progress update to the user.
     */
    publishSubmissionUpdate(userId, payload) {
        const eventName = 'submission:updated';
        const eventPayload = {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            schemaVersion: 1, // Current payload schema version
            timestamp: Date.now(),
            ...payload,
        };
        try {
            this.getGateway().sendToUser(userId, eventName, eventPayload);
            logger_1.logger.info({
                eventName: 'SUBMISSION_PUBLISHER_SENT',
                userId,
                submissionId: payload.submissionId,
                status: payload.status,
            });
        }
        catch (err) {
            logger_1.logger.error({
                eventName: 'SUBMISSION_PUBLISHER_FAILED',
                userId,
                submissionId: payload.submissionId,
                error: err.message,
            });
        }
    }
}
exports.SubmissionPublisher = SubmissionPublisher;
exports.default = SubmissionPublisher;
