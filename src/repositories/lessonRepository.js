import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save user private note.
 */
export const saveNoteEntry = async (noteId, data) => {
  const docRef = doc(db, 'notes', noteId);
  await setDoc(docRef, data);
};

/**
 * Fetch user private note.
 */
export const getNoteEntry = async (noteId) => {
  const docRef = doc(db, 'notes', noteId);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};

/**
 * Create user bookmark.
 */
export const saveBookmarkEntry = async (bookmarkId, data) => {
  const docRef = doc(db, 'bookmarks', bookmarkId);
  await setDoc(docRef, data);
};
