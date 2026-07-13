import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

/**
 * Save student quiz history.
 * @param {string} uid 
 * @param {string} quizId 
 * @param {number} score 
 * @param {number} accuracy 
 */
export const saveQuizHistory = async (uid, quizId, score, accuracy) => {
  try {
    const historyId = `${uid}_${quizId}_${Date.now()}`;
    const docRef = doc(db, 'quizHistory', historyId);
    await setDoc(docRef, {
      uid,
      quizId,
      score,
      accuracy,
      completedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving quiz history document:", error);
    throw error;
  }
};
