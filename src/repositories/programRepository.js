import { 
  collection, doc, getDocs, setDoc, deleteDoc, query, where, onSnapshot, writeBatch 
} from 'firebase/firestore';
import db from '../firebase/firestore';
import { ALL_SEEDED_PROGRAMS } from '../constants/programsSeed';

const PROGRAMS_COLLECTION = 'programs';

/**
 * Fetch all programs from Firestore, seeding them if the collection is empty.
 */
export const getAllPrograms = async () => {
  const collRef = collection(db, PROGRAMS_COLLECTION);
  const snap = await getDocs(collRef);
  
  if (snap.empty) {
    console.log('Programs collection is empty, seeding default programs...');
    await seedPrograms();
    // Fetch again after seeding
    const freshSnap = await getDocs(collRef);
    return freshSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Seeds all initial programs into Firestore.
 */
export const seedPrograms = async () => {
  const batch = writeBatch(db);
  ALL_SEEDED_PROGRAMS.forEach(prog => {
    const docRef = doc(db, PROGRAMS_COLLECTION, prog.id);
    batch.set(docRef, prog);
  });
  await batch.commit();
  console.log('Successfully seeded programs collection in Firestore!');
};

/**
 * Listen to user program bookmarks in real time.
 */
export const listenToProgramBookmarks = (uid, callback) => {
  const collRef = collection(db, 'users', uid, 'programBookmarks');
  return onSnapshot(collRef, (snap) => {
    const bookmarks = [];
    snap.forEach((doc) => {
      bookmarks.push({ id: doc.id, ...doc.data() });
    });
    callback(bookmarks);
  }, (err) => {
    console.error('Program bookmarks subscription failed:', err);
  });
};

/**
 * Listen to user program completion status in real time.
 */
export const listenToProgramProgress = (uid, callback) => {
  const collRef = collection(db, 'users', uid, 'programProgress');
  return onSnapshot(collRef, (snap) => {
    const progress = [];
    snap.forEach((doc) => {
      progress.push({ id: doc.id, ...doc.data() });
    });
    callback(progress);
  }, (err) => {
    console.error('Program progress subscription failed:', err);
  });
};

/**
 * Set program bookmark state.
 */
export const saveProgramBookmark = async (uid, programId, bookmarked) => {
  const docRef = doc(db, 'users', uid, 'programBookmarks', programId);
  if (bookmarked) {
    await setDoc(docRef, { bookmarked: true, bookmarkedAt: new Date().toISOString() });
  } else {
    await deleteDoc(docRef);
  }
};

/**
 * Set program completion state.
 */
export const saveProgramCompletion = async (uid, programId, completed) => {
  const docRef = doc(db, 'users', uid, 'programProgress', programId);
  if (completed) {
    await setDoc(docRef, { completed: true, completedAt: new Date().toISOString() });
  } else {
    await deleteDoc(docRef);
  }
};
