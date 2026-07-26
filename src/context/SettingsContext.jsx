import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getUserProfile, updateUserProfile } from '../services/user/userService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    publicProfile: true,
    emailSubscription: true
  });

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then(profile => {
      if (profile && profile.preferences) {
        setSettings(profile.preferences);
      }
    }).catch(err => console.error("Failed to load settings", err));
  }, [user]);

  const updateSettings = async (newSettings) => {
    if (!user) return;
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    await updateUserProfile(user.uid, { preferences: merged });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
