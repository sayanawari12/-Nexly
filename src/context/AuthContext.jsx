import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
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

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Automatically check/create or update user profile document in Firestore
        const fallbackName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Student';
        createUserDocument(currentUser.uid, {
          email: currentUser.email,
          displayName: currentUser.displayName || fallbackName,
          photoURL: currentUser.photoURL || ''
        }).catch((err) => {
          console.error("Auto user document synchronization failed in background:", err);
        });

        // Set up real-time profile listener
        const userDocRef = doc(db, 'users', currentUser.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // Document hasn't been created yet, let's use a temporary fallback profile
            setProfile({
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || fallbackName,
              photoURL: currentUser.photoURL || '',
              role: 'student'
            });
          }
          setLoading(false);
        }, (err) => {
          console.error("Real-time profile subscription failed in AuthContext:", err);
          setLoading(false);
        });

      } else {
        setProfile(null);
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setLoading(false);
      }
    });
    
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const login = (email, password) => {
    return loginWithEmail(email, password);
  };

  const signup = (email, password) => {
    return signupWithEmail(email, password);
  };

  const logout = () => {
    return logoutUser();
  };

  const resetPassword = (email) => {
    return resetPasswordEmail(email);
  };

  const loginGoogle = () => {
    return loginWithGoogle();
  };

  const getRole = (currentUser, currentProfile) => {
    if (currentProfile && currentProfile.role) return currentProfile.role;
    if (!currentUser) return 'guest';
    if (currentUser.email && currentUser.email.toLowerCase().includes('admin')) {
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
    loginGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
