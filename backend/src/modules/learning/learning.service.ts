import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../errors';

const prisma = new PrismaClient();

export class LearningService {
  /**
   * Retrieves all technologies with their associated tracks and skills.
   */
  public async listTechnologies() {
    return prisma.technology.findMany({
      orderBy: { order: 'asc' },
      include: {
        tracks: {
          orderBy: { order: 'asc' },
        },
        skills: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Retrieves modules and lessons for a specific track.
   */
  public async getTrackModules(trackId: string, userId?: string) {
    const track = await prisma.track.findUnique({
      where: { id: trackId },
      include: {
        technology: true,
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                skills: {
                  include: {
                    skill: true,
                  },
                },
                userProgress: userId ? {
                  where: { userId },
                } : false,
              },
            },
          },
        },
      },
    });

    if (!track) {
      throw new NotFoundError('Track not found.');
    }

    return track;
  }

  /**
   * Marks a lesson as completed for an authenticated user.
   */
  public async markLessonComplete(userId: string, lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundError('Lesson not found.');
    }

    const progress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return progress;
  }

  /**
   * Fetches practice problems auto-matched to a lesson via shared skills (LessonSkill -> Skill -> ProblemSkill -> Problem).
   */
  public async getRecommendedProblemsForLesson(lessonId: string) {
    const lessonSkills = await prisma.lessonSkill.findMany({
      where: { lessonId },
      select: { skillId: true },
    });

    const skillIds = lessonSkills.map((ls) => ls.skillId);

    if (skillIds.length === 0) {
      return [];
    }

    const problemSkills = await prisma.problemSkill.findMany({
      where: {
        skillId: { in: skillIds },
      },
      include: {
        problem: true,
        skill: true,
      },
    });

    // Deduplicate problems by ID
    const problemMap = new Map<string, any>();
    for (const ps of problemSkills) {
      if (!problemMap.has(ps.problem.id)) {
        problemMap.set(ps.problem.id, {
          ...ps.problem,
          matchedSkill: ps.skill.name,
        });
      }
    }

    return Array.from(problemMap.values());
  }
}

export default LearningService;
