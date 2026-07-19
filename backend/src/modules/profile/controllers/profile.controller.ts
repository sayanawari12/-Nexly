import { Response } from 'express';
import { ProfileRepository } from '../repositories/profile.repository';
import { LeaderboardService } from '../services/leaderboard.service';
import { RatingService } from '../services/rating.service';
import { AnalyticsService } from '../services/analytics.service';
import { ApiResponse } from '../../../utils/response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { ForbiddenError, NotFoundError, UnauthorizedError } from '../../../errors';
import { UpdatePreferenceSchema, GetLeaderboardSchema, GetSeasonalLeaderboardSchema, GetLeaderboardAroundUserSchema } from '../validators/profile.validator';

export class ProfileController {
  private readonly repo: ProfileRepository;
  private readonly leaderboardService: LeaderboardService;
  private readonly ratingService: RatingService;
  private readonly analyticsService: AnalyticsService;

  constructor() {
    this.repo = new ProfileRepository();
    this.leaderboardService = new LeaderboardService();
    this.ratingService = new RatingService();
    this.analyticsService = new AnalyticsService();
  }

  /**
   * Fetches user dashboard profile (optimized via cached projections snapshots)
   */
  public getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = (req.params.userId as string) || req.user?.id;
    if (!userId) {
      throw new UnauthorizedError('Identity context not resolved.');
    }

    let snapshot = await this.repo.getProfileSnapshot(userId);
    if (!snapshot) {
      // Rebuild on cache-miss fallback
      await this.analyticsService.generateProfileSnapshot(userId);
      snapshot = await this.repo.getProfileSnapshot(userId);
    }

    if (!snapshot) {
      throw new NotFoundError('Profile details not found.');
    }

    res.status(200).json(ApiResponse.success(snapshot.snapshotData));
  };

  /**
   * Preferences controller methods
   */
  public getPreferences = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new UnauthorizedError();
    const pref = await this.repo.getOrCreatePreferences(req.user.id);
    res.status(200).json(ApiResponse.success(pref));
  };

  public updatePreferences = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new UnauthorizedError();
    const validated = UpdatePreferenceSchema.parse(req.body);
    const pref = await this.repo.updatePreferences(req.user.id, validated);
    res.status(200).json(ApiResponse.success(pref));
  };

  /**
   * Notifications controller methods
   */
  public getNotifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new UnauthorizedError();
    const notifications = await this.repo.getNotifications(req.user.id);
    res.status(200).json(ApiResponse.success(notifications));
  };

  public markNotificationRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new UnauthorizedError();
    const id = req.params.notificationId as string;
    await this.repo.markNotificationRead(req.user.id, id);
    res.status(200).json(ApiResponse.success({ message: 'Notification marked as read.' }));
  };

  /**
   * Leaderboard controller methods
   */
  public getLeaderboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const validated = GetLeaderboardSchema.parse(req.query);
    const standings = await this.leaderboardService.getLeaderboard(validated.type, validated.limit, validated.offset);
    res.status(200).json(ApiResponse.success(standings));
  };

  public getSeasonalLeaderboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const validated = GetSeasonalLeaderboardSchema.parse(req.query);
    const standings = await this.leaderboardService.getSeasonalLeaderboard(validated.seasonId, validated.limit, validated.offset);
    res.status(200).json(ApiResponse.success(standings));
  };

  public getLeaderboardAroundMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new UnauthorizedError();
    const validated = GetLeaderboardAroundUserSchema.parse(req.query);
    const standings = await this.leaderboardService.getLeaderboardAroundUser(req.user.id, validated.type, validated.limitAroundUser);
    res.status(200).json(ApiResponse.success(standings));
  };

  /**
   * Cache Rebuilder (Admin only, idempotent recovery)
   */
  public rebuildCaches = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can trigger leaderboard cache rebuilds.');
    }

    await this.leaderboardService.rebuildAllCaches();
    res.status(200).json(ApiResponse.success({ message: 'Leaderboard caches successfully rebuilt from Postgres.' }));
  };

  /**
   * Ratings Replay Engine (Admin only, idempotent recalculations)
   */
  public triggerRatingsReplay = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can trigger rating history replays.');
    }

    // Fire-and-forget background execution or synchronous confirmation depending on call logic
    // We execute synchronously here for test validations
    await this.ratingService.replayAllRatings();
    res.status(200).json(ApiResponse.success({ message: 'Ratings replay recalculation successfully completed.' }));
  };
}
export default ProfileController;
