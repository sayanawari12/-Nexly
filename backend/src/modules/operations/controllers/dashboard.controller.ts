import { Response } from 'express';
import { prisma } from '../../../config/database';
import { MonitoringService } from '../services/monitoring.service';
import { ApiResponse } from '../../../utils/response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class DashboardController {
  private readonly monitoringService: MonitoringService;

  constructor() {
    this.monitoringService = new MonitoringService();
  }

  /**
   * Compiles administrative metrics summary count details (optimized)
   */
  public getSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const [usersCount, problemsCount, submissionsCount, contestsCount, activeIncidents] = await prisma.$transaction([
      prisma.user.count(),
      prisma.problem.count({ where: { isDeleted: false } }),
      prisma.submission.count(),
      prisma.contest.count(),
      prisma.platformIncident.count({ where: { status: 'OPEN', isDeleted: false } }),
    ]);

    res.status(200).json(
      ApiResponse.success({
        usersCount,
        problemsCount,
        submissionsCount,
        contestsCount,
        activeIncidents,
      })
    );
  };

  /**
   * Returns hardware and system health indicators
   */
  public getHealth = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const health = await this.monitoringService.getHealthReport();
    res.status(200).json(ApiResponse.success(health));
  };

  /**
   * Prometheus scrapable text response endpoint
   */
  public getMetrics = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const metrics = await this.monitoringService.getPrometheusMetrics();
    res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
    res.status(200).send(metrics);
  };
}
export default DashboardController;
