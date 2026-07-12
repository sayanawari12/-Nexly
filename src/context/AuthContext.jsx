import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import {
  loginWithEmail,
  signupWithEmail,
  logoutUser,
  resetPasswordEmail,
  loginWithGoogle
} from '../services/firebaseAuth';
import {
  getUserProfile,
  createUserDocument
} from '../services/userDatabase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Synchronously and immediately update Auth context states to keep UI responsive and in-sync
      setUser(currentUser);
      setLoading(false);

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
      }
    });
    
    return unsubscribe;
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

  const getRole = (currentUser) => {
    if (!currentUser) return 'guest';
    if (currentUser.email && currentUser.email.toLowerCase().includes('admin')) {
      return 'admin';
    }
    return 'student';
  };

  const value = {
    user,
    userRole: getRole(user),
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
