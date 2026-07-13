import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firestore';

const COLLECTION_NAME = 'progress';

/**
 * Save or create user learning progress entry.
 */
export const saveProgressEntry = async (progressId, data) => {
  const docRef = doc(db, COLLECTION_NAME, progressId);
  await setDoc(docRef, data, { merge: true });
};

/**
 * Fetch a single progress entry by progressId.
 */
export const getProgressEntry = async (progressId) => {
  const docRef = doc(db, COLLECTION_NAME, progressId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Update an existing progress entry.
 */
export const updateProgressEntry = async (progressId, data) => {
  const docRef = doc(db, COLLECTION_NAME, progressId);
  await updateDoc(docRef, data);
};

/**
 * Delete a progress entry.
 */
export const deleteProgressEntry = async (progressId) => {
  const docRef = doc(db, COLLECTION_NAME, progressId);
  await deleteDoc(docRef);
};

/**
 * Set up real-time listener for user's progress.
 */
export const listenToUserProgress = (uid, callback) => {
  const q = query(collection(db, COLLECTION_NAME), where('uid', '==', uid));
  return onSnapshot(q, (snapshot) => {
    const progressList = [];
    snapshot.forEach((doc) => {
      progressList.push({ id: doc.id, ...doc.data() });
    });
    callback(progressList);
  }, (err) => {
    console.error('Progress subscription failed in repository:', err);
  });
};
