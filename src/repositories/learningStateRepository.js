import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save or update the active continue learning state.
 */
export const saveLearningStateEntry = async (uid, data) => {
  const docRef = doc(db, 'users', uid, 'learningState', 'current');
  await setDoc(docRef, data, { merge: true });
};

/**
 * Read the current continue learning state.
 */
export const getLearningStateEntry = async (uid) => {
  const docRef = doc(db, 'users', uid, 'learningState', 'current');
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};

/**
 * Subscribe to the continue learning state in real time.
 */
export const listenToLearningState = (uid, callback) => {
  const docRef = doc(db, 'users', uid, 'learningState', 'current');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (err) => {
    console.error('Learning state snapshot listener failed:', err);
  });
};
