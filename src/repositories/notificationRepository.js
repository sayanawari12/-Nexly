import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save user notification message entry.
 */
export const saveNotificationEntry = async (notifId, data) => {
  const docRef = doc(db, 'notifications', notifId);
  await setDoc(docRef, data);
};

/**
 * Get user notification list matching selector query.
 */
export const getNotificationsByQuery = async (uid) => {
  const colRef = collection(db, 'notifications');
  const q = query(colRef, where('uid', '==', uid));
  const querySnap = await getDocs(q);
  return querySnap.docs.map(doc => doc.data());
};
