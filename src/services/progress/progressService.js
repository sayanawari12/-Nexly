import { 
  saveProgressEntry, 
  getProgressEntry, 
  updateProgressEntry 
} from '../../repositories/progressRepository';

/**
 * Generate a unique progress entry ID.
 */
const getProgressId = (uid, lessonId) => `${uid}_${lessonId}`;

/**
 * Triggered automatically when a student opens a lesson.
 * Sets status to "in-progress" if it was not started.
 * Updates lastOpened timestamp.
 */
export const startLesson = async (uid, lessonId, subjectId, unitId, semesterId) => {
  if (!uid || !lessonId) return;
  const progressId = getProgressId(uid, lessonId);
  const existingProgress = await getProgressEntry(progressId);
  const now = new Date().toISOString();

  if (existingProgress) {
    const currentStatus = existingProgress.status;
    let nextStatus = currentStatus;

    if (currentStatus === 'completed') {
      nextStatus = 'revisit';
    } else if (currentStatus !== 'revisit') {
      nextStatus = 'in-progress';
    }

    const updatedData = {
      status: nextStatus,
      lastOpened: now,
      updatedAt: now
    };
    await updateProgressEntry(progressId, updatedData);
  } else {
    // New progress entry
    const newProgress = {
      uid,
      lessonId,
      subjectId,
      unitId,
      semesterId,
      status: 'in-progress',
      startedAt: now,
      lastOpened: now,
      completedAt: null,
      timeSpent: 0,
      bookmark: false,
      notesCount: 0,
      xpReward: 100, // Prepared for future XP system
      updatedAt: now
    };
    await saveProgressEntry(progressId, newProgress);
  }
};

/**
 * Triggered when a student clicks the "Mark Complete" toggle.
 * Sets status to "completed" or toggles back to "in-progress"/"revisit".
 */
export const completeLesson = async (uid, lessonId, subjectId, unitId, semesterId, nextCompletedState = true) => {
  if (!uid || !lessonId) return;
  const progressId = getProgressId(uid, lessonId);
  const existingProgress = await getProgressEntry(progressId);
  const now = new Date().toISOString();

  const data = {
    uid,
    lessonId,
    subjectId,
    unitId,
    semesterId,
    status: nextCompletedState ? 'completed' : 'in-progress',
    completedAt: nextCompletedState ? now : null,
    updatedAt: now
  };

  if (!existingProgress) {
    data.startedAt = now;
    data.lastOpened = now;
    data.timeSpent = 0;
    data.bookmark = false;
    data.notesCount = 0;
    data.xpReward = 100;
  }

  await saveProgressEntry(progressId, data);
};

/**
 * Increment or update the time spent reading a lesson.
 */
export const updateTimeSpent = async (uid, lessonId, additionalTime) => {
  if (!uid || !lessonId) return;
  const progressId = getProgressId(uid, lessonId);
  const existingProgress = await getProgressEntry(progressId);

  if (existingProgress) {
    const currentSeconds = existingProgress.timeSpent || 0;
    await updateProgressEntry(progressId, {
      timeSpent: currentSeconds + additionalTime,
      updatedAt: new Date().toISOString()
    });
  }
};

/**
 * Calculate completion percentage.
 */
export const calculateCompletionPercentage = (completedCount, totalCount) => {
  if (!totalCount || totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
};

/**
 * Returns statistics for dashboard rendering.
 */
export const getProgressStats = (progressList) => {
  if (!Array.isArray(progressList)) {
    return { completedCount: 0, inProgressCount: 0, todayCompletedCount: 0, weeklyCompletedCount: 0 };
  }

  const completed = progressList.filter(p => p.status === 'completed');
  const inProgress = progressList.filter(p => p.status === 'in-progress' || p.status === 'revisit');
  
  const today = new Date().toDateString();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const todayCompleted = completed.filter(p => {
    if (!p.completedAt) return false;
    return new Date(p.completedAt).toDateString() === today;
  });

  const weeklyCompleted = completed.filter(p => {
    if (!p.completedAt) return false;
    return new Date(p.completedAt) >= oneWeekAgo;
  });

  return {
    completedCount: completed.length,
    inProgressCount: inProgress.length,
    todayCompletedCount: todayCompleted.length,
    weeklyCompletedCount: weeklyCompleted.length
  };
};

/**
 * Returns the last opened lesson ID from the progress list.
 */
export const getLastOpenedLesson = (progressList) => {
  if (!progressList || progressList.length === 0) return null;
  const sorted = [...progressList].sort((a, b) => {
    return new Date(b.lastOpened || 0) - new Date(a.lastOpened || 0);
  });
  return sorted[0] ? sorted[0].lessonId : null;
};

/**
 * Calculate resume lesson ID. Returns the last opened lesson that is not completed.
 */
export const getResumeLesson = (progressList, lessons) => {
  if (!progressList || progressList.length === 0) return null;
  const sorted = [...progressList].sort((a, b) => {
    return new Date(b.lastOpened || 0) - new Date(a.lastOpened || 0);
  });
  
  const resumeItem = sorted.find(p => p.status === 'in-progress' || p.status === 'revisit');
  if (resumeItem) return resumeItem.lessonId;

  const completedIds = new Set(progressList.filter(p => p.status === 'completed').map(p => p.lessonId));
  const unstarted = lessons.find(l => !completedIds.has(l.id));
  return unstarted ? unstarted.id : null;
};

/**
 * Backward compatible progress saver.
 */
export const saveUserProgress = async (uid, subjectId, lessonId, percentage, completed) => {
  await completeLesson(uid, lessonId, subjectId, 'c-unit-1', 'semester-2', completed);
};

