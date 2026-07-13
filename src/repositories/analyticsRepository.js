import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Fetch all learning progress session records for analytics calculations.
 */
export const getUserStudySessions = async (uid) => {
  const q = query(collection(db, 'progress'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
