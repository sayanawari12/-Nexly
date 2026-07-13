import { saveProgressEntry } from '../../repositories/progressRepository';

/**
 * Save user learning progress.
 * @param {string} uid 
 * @param {string} roadmapId 
 * @param {string} lessonId 
 * @param {number} percentage 
 * @param {boolean} completed 
 */
export const saveUserProgress = async (uid, roadmapId, lessonId, percentage, completed) => {
  const progressId = `${uid}_${roadmapId}_${lessonId}`;
  const data = {
    uid,
    roadmapId,
    lessonId,
    completed,
    percentage,
    lastOpened: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await saveProgressEntry(progressId, data);
};
