import { saveNotificationEntry, getNotificationsByQuery } from '../../repositories/notificationRepository';

/**
 * Send a notification (Future module stub)
 * @param {string} uid 
 * @param {string} title 
 * @param {string} message 
 */
export const sendNotification = async (uid, title, message) => {
  const notifId = `${uid}_${Date.now()}`;
  const data = {
    uid,
    title,
    message,
    read: false,
    createdAt: new Date().toISOString()
  };
  await saveNotificationEntry(notifId, data);
};

/**
 * Fetch notifications for user
 * @param {string} uid 
 */
export const getUserNotifications = async (uid) => {
  return getNotificationsByQuery(uid);
};
