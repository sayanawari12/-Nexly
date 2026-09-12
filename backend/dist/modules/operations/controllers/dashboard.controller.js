"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const database_1 = require("../../../config/database");
const monitoring_service_1 = require("../services/monitoring.service");
const response_1 = require("../../../utils/response");
class DashboardController {
    monitoringService;
    constructor() {
        this.monitoringService = new monitoring_service_1.MonitoringService();
    }
    /**
     * Compiles administrative metrics summary count details (optimized)
     */
    getSummary = async (req, res) => {
        const [usersCount, problemsCount, submissionsCount, contestsCount, activeIncidents] = await database_1.prisma.$transaction([
            database_1.prisma.user.count(),
            database_1.prisma.problem.count({ where: { isDeleted: false } }),
            database_1.prisma.submission.count(),
            database_1.prisma.contest.count(),
            database_1.prisma.platformIncident.count({ where: { status: 'OPEN', isDeleted: false } }),
        ]);
        res.status(200).json(response_1.ApiResponse.success({
            usersCount,
            problemsCount,
            submissionsCount,
            contestsCount,
            activeIncidents,
        }));
    };
    /**
     * Returns hardware and system health indicators
     */
    getHealth = async (req, res) => {
        const health = await this.monitoringService.getHealthReport();
        res.status(200).json(response_1.ApiResponse.success(health));
    };
    /**
     * Prometheus scrapable text response endpoint
     */
    getMetrics = async (req, res) => {
        const metrics = await this.monitoringService.getPrometheusMetrics();
        res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
        res.status(200).send(metrics);
    };
}
exports.DashboardController = DashboardController;
exports.default = DashboardController;
