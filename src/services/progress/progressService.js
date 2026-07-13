import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

/**
 * Save user learning progress.
 * @param {string} uid 
 * @param {string} roadmapId 
 * @param {string} lessonId 
 * @param {number} percentage 
 * @param {boolean} completed 
 */
export const saveUserProgress = async (uid, roadmapId, lessonId, percentage, completed) => {
  try {
    const progressId = `${uid}_${roadmapId}_${lessonId}`;
    const docRef = doc(db, 'progress', progressId);
    await setDoc(docRef, {
      uid,
      roadmapId,
      lessonId,
      completed,
      percentage,
      lastOpened: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user progress document:", error);
    throw error;
  }
};
