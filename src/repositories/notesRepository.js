import { doc, getDoc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save or update a note entry.
 */
export const saveNoteEntry = async (uid, lessonId, data) => {
  const docRef = doc(db, 'users', uid, 'notes', lessonId);
  await setDoc(docRef, data, { merge: true });
};

/**
 * Delete a note entry.
 */
export const deleteNoteEntry = async (uid, lessonId) => {
  const docRef = doc(db, 'users', uid, 'notes', lessonId);
  await deleteDoc(docRef);
};

/**
 * Fetch a single note.
 */
export const getNoteEntry = async (uid, lessonId) => {
  const docRef = doc(db, 'users', uid, 'notes', lessonId);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/**
 * Subscribe to all personal notes in real time.
 */
export const listenToUserNotes = (uid, callback) => {
  const collRef = collection(db, 'users', uid, 'notes');
  return onSnapshot(collRef, (snapshot) => {
    const notes = [];
    snapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    callback(notes);
  }, (err) => {
    console.error('Notes subscription failed:', err);
  });
};
