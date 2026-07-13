import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Fetch a raw document snap by path and document ID.
 */
export const getById = async (col, id) => {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

/**
 * Create or replace a document in a collection.
 */
export const save = async (col, id, data) => {
  const docRef = doc(db, col, id);
  await setDoc(docRef, data);
  return data;
};

/**
 * Update subset of document fields.
 */
export const update = async (col, id, data) => {
  const docRef = doc(db, col, id);
  await updateDoc(docRef, data);
};

/**
 * Query documents by field equality.
 */
export const queryByField = async (col, field, value) => {
  const colRef = collection(db, col);
  const q = query(colRef, where(field, '==', value));
  const querySnap = await getDocs(q);
  return querySnap.docs.map(doc => doc.data());
};
