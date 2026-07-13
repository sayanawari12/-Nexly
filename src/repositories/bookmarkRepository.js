import { doc, getDoc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Save a bookmark entry.
 */
export const saveBookmarkEntry = async (uid, lessonId, data) => {
  const docRef = doc(db, 'users', uid, 'bookmarks', lessonId);
  await setDoc(docRef, data, { merge: true });
};

/**
 * Delete a bookmark entry.
 */
export const deleteBookmarkEntry = async (uid, lessonId) => {
  const docRef = doc(db, 'users', uid, 'bookmarks', lessonId);
  await deleteDoc(docRef);
};

/**
 * Fetch a single bookmark.
 */
export const getBookmarkEntry = async (uid, lessonId) => {
  const docRef = doc(db, 'users', uid, 'bookmarks', lessonId);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/**
 * Subscribe to all bookmarks of a user in real time.
 */
export const listenToUserBookmarks = (uid, callback) => {
  const collRef = collection(db, 'users', uid, 'bookmarks');
  return onSnapshot(collRef, (snapshot) => {
    const bookmarks = [];
    snapshot.forEach((doc) => {
      bookmarks.push({ id: doc.id, ...doc.data() });
    });
    callback(bookmarks);
  }, (err) => {
    console.error('Bookmarks subscription failed:', err);
  });
};
