import { Request, Response } from 'express';
import { LearningService } from './learning.service';
import { ApiResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../auth/middleware/auth.middleware';

export class LearningController {
  private readonly learningService: LearningService;

  constructor(learningService = new LearningService()) {
    this.learningService = learningService;
  }

  /**
   * GET /api/v1/learning/technologies
   * List all available technologies with tracks and skills.
   */
  public listTechnologies = async (req: Request, res: Response): Promise<void> => {
    const technologies = await this.learningService.listTechnologies();
    res.status(200).json(ApiResponse.success(technologies));
  };

  /**
   * GET /api/v1/learning/tracks/:trackId/modules
   * Get modules and lessons for a given track.
   */
  public getTrackModules = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const trackId = Array.isArray(req.params.trackId) ? req.params.trackId[0] : req.params.trackId;
    const userId = req.user?.id;
    const track = await this.learningService.getTrackModules(trackId, userId);
    res.status(200).json(ApiResponse.success(track));
  };

  /**
   * POST /api/v1/learning/lessons/:lessonId/complete
   * Mark a lesson as completed for the active authenticated user.
   */
  public markLessonComplete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const lessonId = Array.isArray(req.params.lessonId) ? req.params.lessonId[0] : req.params.lessonId;
    const userId = req.user!.id;
    const progress = await this.learningService.markLessonComplete(userId, lessonId);
    res.status(200).json(ApiResponse.success(progress));
  };

  /**
   * GET /api/v1/learning/lessons/:lessonId/recommended-problems
   * Fetch practice problems matched to the skills taught in a lesson.
   */
  public getRecommendedProblems = async (req: Request, res: Response): Promise<void> => {
    const lessonId = Array.isArray(req.params.lessonId) ? req.params.lessonId[0] : req.params.lessonId;
    const problems = await this.learningService.getRecommendedProblemsForLesson(lessonId);
    res.status(200).json(ApiResponse.success(problems));
  };
}

export default LearningController;
