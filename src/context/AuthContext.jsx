import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { connectSocket, disconnectSocket } from '../services/socketService';
import { API_BASE_URL } from '../config/api.config';
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
        let apexUserId = null;
        let userRole = 'student';

        try {
          console.log("✅ Firebase user detected:", currentUser.email);
          const idToken = await currentUser.getIdToken();
          console.log("✅ ID TOKEN retrieved");

          let response = null;
          for (let attempt = 0; attempt < 3; attempt++) {
            try {
              response = await axios.post(
                `${API_BASE_URL}/auth/firebase`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${idToken}`,
                  },
                  withCredentials: true,
                  timeout: 15000,
                }
              );
              if (response?.data?.data?.accessToken) break;
            } catch (err) {
              console.warn(`Attempt ${attempt + 1} for token exchange notice:`, err.message);
              if (attempt < 2) await new Promise((r) => setTimeout(r, 2000));
            }
          }

          if (response?.data?.data) {
            console.log("✅ BACKEND RESPONSE:", response.data);
            const data = response.data.data;

            if (data.accessToken) {
              console.log("✅ Access token received");

              localStorage.setItem('apex_token', data.accessToken);

              if (data.refreshToken) {
                localStorage.setItem('apex_refresh_token', data.refreshToken);
              }

              connectSocket(data.accessToken);

              apexUserId = data.user?.id;
              userRole = data.user?.role?.toLowerCase() || 'student';
            }
          } else {
            console.warn("⚠️ Backend token exchange did not return access token");
          }
        } catch (error) {
          console.warn('⚠️ Backend token exchange error:', error.message);
        }

        const fallbackName =
          currentUser.displayName ||
          currentUser.email?.split('@')[0] ||
          'Student';

        const initialProfile = {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || fallbackName,
          photoURL: currentUser.photoURL || '',
          apexUserId: apexUserId || currentUser.uid,
          role: userRole,
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

              setProfile((prev) => ({
                ...prev,
                ...baseProfile,
                apexUserId: apexUserId || prev?.apexUserId || currentUser.uid,
                role: baseProfile.role?.toLowerCase() || userRole || 'student',
              }));
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

      console.log('❌ Clearing session for unauthenticated state');

      localStorage.removeItem('apex_token');
      localStorage.removeItem('apex_refresh_token');

      disconnectSocket();

      setProfile(null);
      setUser(null);
      setLoading(false);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      await handleAuthChange(currentUser);
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

  // Stable function references — never recreated on re-render
  const login = useCallback((email, password) => {
    return loginWithEmail(email, password);
  }, []);

  const signup = useCallback((email, password) => {
    return signupWithEmail(email, password);
  }, []);

  const logout = useCallback(async () => {
    try {
      const devRefreshToken = localStorage.getItem('apex_refresh_token');
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
  }, []);

  const resetPassword = useCallback((email) => {
    return resetPasswordEmail(email);
  }, []);

  const loginGoogle = useCallback(() => {
    return loginWithGoogle();
  }, []);

  const getRole = useCallback((currentUser, currentProfile) => {
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
  }, []);

  // Memoize the context value — children only re-render when user, profile,
  // or loading actually changes, not on every parent render.
  const value = useMemo(() => ({
    user,
    profile,
    userRole: getRole(user, profile),
    loading,
    login,
    signup,
    logout,
    resetPassword,
    loginGoogle,
  }), [user, profile, loading, getRole, login, signup, logout, resetPassword, loginGoogle]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};