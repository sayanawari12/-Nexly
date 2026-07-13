import { saveQuizHistoryEntry } from '../../repositories/quizRepository';

/**
 * Save student quiz history.
 * @param {string} uid 
 * @param {string} quizId 
 * @param {number} score 
 * @param {number} accuracy 
 */
export const saveQuizHistory = async (uid, quizId, score, accuracy) => {
  const historyId = `${uid}_${quizId}_${Date.now()}`;
  const data = {
    uid,
    quizId,
    score,
    accuracy,
    completedAt: new Date().toISOString()
  };
  await saveQuizHistoryEntry(historyId, data);
};
