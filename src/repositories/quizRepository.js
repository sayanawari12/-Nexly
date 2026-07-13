import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save user quiz history score record.
 */
export const saveQuizHistoryEntry = async (historyId, data) => {
  const docRef = doc(db, 'quizHistory', historyId);
  await setDoc(docRef, data);
};
