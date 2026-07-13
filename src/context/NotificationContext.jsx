import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getUserNotifications, sendNotification } from '../services/notification/notificationService';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Load initial user notifications
    getUserNotifications(user.uid).then(list => {
      setNotifications(list);
      setUnreadCount(list.filter(n => !n.read).length);
    }).catch(err => console.error("Failed to load notifications", err));
  }, [user]);

  const triggerNotification = async (title, message) => {
    if (!user) return;
    await sendNotification(user.uid, title, message);
    const newNotif = {
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, triggerNotification, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
