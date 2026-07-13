import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save user learning progress entry.
 */
export const saveProgressEntry = async (progressId, data) => {
  const docRef = doc(db, 'progress', progressId);
  await setDoc(docRef, data, { merge: true });
};
