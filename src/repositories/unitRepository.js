import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, orderBy 
} from 'firebase/firestore';
import db from '../firebase/firestore';

const COLLECTION_NAME = 'units';

/**
 * Fetch a single unit by ID.
 */
export const getUnit = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Fetch units filtered by subjectId, ordered by order.
 */
export const getUnitsBySubject = async (subjectId) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('subjectId', '==', subjectId),
    orderBy('order', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const units = [];
  querySnapshot.forEach((doc) => {
    units.push({ id: doc.id, ...doc.data() });
  });
  return units;
};

/**
 * Fetch all units.
 */
export const getAllUnits = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  const units = [];
  querySnapshot.forEach((doc) => {
    units.push({ id: doc.id, ...doc.data() });
  });
  return units;
};

/**
 * Create or overwrite a unit document.
 */
export const createUnit = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await setDoc(docRef, data);
};

/**
 * Update dynamic fields in a unit document.
 */
export const updateUnit = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

/**
 * Delete a unit document.
 */
export const deleteUnit = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
