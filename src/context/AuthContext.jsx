import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { connectSocket, disconnectSocket } from '../services/socketService';
import {
  loginWithEmail,
  signupWithEmail,
  logoutUser,
  resetPasswordEmail,
  loginWithGoogle
} from '../services/firebaseAuth';
import {
  createUserDocument
} from '../services/userDatabase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = null;

    const handleAuthChange = async (currentUser) => {
      console.log("========== AUTH STATE ==========");
      console.log(currentUser);

      if (currentUser) {
        try {
          console.log("✅ Firebase user detected");

          const idToken = await currentUser.getIdToken();
          console.log("✅ ID TOKEN:", idToken);

          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1'}/auth/firebase`,
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
              withCredentials: true,
            }
          );

          console.log("✅ BACKEND RESPONSE:", response.data);

          const data = response.data?.data;

          if (data && data.accessToken) {
            console.log("✅ Access token received");

            localStorage.setItem('apex_token', data.accessToken);

            if (data.refreshToken) {
              localStorage.setItem('apex_refresh_token', data.refreshToken);
            }

            connectSocket(data.accessToken);

            const fallbackName =
              currentUser.displayName ||
              currentUser.email?.split('@')[0] ||
              'Student';

            const initialProfile = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || fallbackName,
              photoURL: currentUser.photoURL || '',
              apexUserId: data.user?.id,
              role: data.user?.role?.toLowerCase() || 'student',
            };

            setUser(currentUser);
            setProfile(initialProfile);
            setLoading(false);

            createUserDocument(currentUser.uid, {
              email: currentUser.email,
              displayName: currentUser.displayName || fallbackName,
              photoURL: currentUser.photoURL || '',
            }).catch((err) => {
              console.error(
                'Auto user document synchronization failed:',
                err
              );
            });

            const userDocRef = doc(db, 'users', currentUser.uid);

            unsubscribeProfile = onSnapshot(
              userDocRef,
              (docSnap) => {
                if (docSnap.exists()) {
                  const baseProfile = docSnap.data();

                  setProfile({
                    ...baseProfile,
                    apexUserId: data.user?.id,
                    role:
                      data.user?.role?.toLowerCase() ||
                      baseProfile.role?.toLowerCase() ||
                      'student',
                  });
                }
              },
              (err) => {
                console.error(
                  'Real-time profile subscription notice:',
                  err
                );
              }
            );

            return;
          }

          console.error("❌ Backend didn't return access token");
        } catch (error) {
          console.error('❌ AUTH ERROR:', error);

          if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', error.response.data);
          } else {
            console.error('Message:', error.message);
          }
        }
      }

      console.log('❌ Clearing session');

      localStorage.removeItem('apex_token');
      localStorage.removeItem('apex_refresh_token');

      disconnectSocket();

      setProfile(null);
      setUser(null);
      setLoading(false);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      handleAuthChange(currentUser);
    });

    const handleApexLogout = () => {
      console.log(
        '[AuthContext] Global logout triggered via refresh token rotation failure.'
      );
      logoutUser();
    };

    window.addEventListener('apex-logout', handleApexLogout);

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }

      window.removeEventListener(
        'apex-logout',
        handleApexLogout
      );
    };
  }, []);

  const login = (email, password) => {
    return loginWithEmail(email, password);
  };

  const signup = (email, password) => {
    return signupWithEmail(email, password);
  };
    const logout = async () => {
    try {
      const devRefreshToken = localStorage.getItem('apex_refresh_token');
      const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL ||
        'http://localhost:5000/api/v1';

      const token = localStorage.getItem('apex_token');

      const payload = devRefreshToken
        ? { refreshToken: devRefreshToken }
        : {};

      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        payload,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        }
      );
    } catch (e) {
      console.warn(
        'Backend session invalidation failed during logout:',
        e
      );
    }

    localStorage.removeItem('apex_token');
    localStorage.removeItem('apex_refresh_token');

    disconnectSocket();

    return logoutUser();
  };

  const resetPassword = (email) => {
    return resetPasswordEmail(email);
  };

  const loginGoogle = () => {
    return loginWithGoogle();
  };

  const getRole = (currentUser, currentProfile) => {
    if (currentProfile && currentProfile.role) {
      return currentProfile.role;
    }

    if (!currentUser) {
      return 'guest';
    }

    if (
      currentUser.email &&
      currentUser.email.toLowerCase().includes('admin')
    ) {
      return 'admin';
    }

    return 'student';
  };

  const value = {
    user,
    profile,
    userRole: getRole(user, profile),
    loading,
    login,
    signup,
    logout,
    resetPassword,
    loginGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};