import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';

/**
 * Send a notification (Future module stub)
 * @param {string} uid 
 * @param {string} title 
 * @param {string} message 
 */
export const sendNotification = async (uid, title, message) => {
  try {
    const notifId = `${uid}_${Date.now()}`;
    const docRef = doc(db, 'notifications', notifId);
    await setDoc(docRef, {
      uid,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

/**
 * Fetch notifications for user
 * @param {string} uid 
 */
export const getUserNotifications = async (uid) => {
  try {
    const notifQuery = query(collection(db, 'notifications'), where('uid', '==', uid));
    const snap = await getDocs(notifQuery);
    return snap.docs.map(d => d.data());
  } catch (error) {
    console.error("Error reading notifications:", error);
    return [];
  }
};
