import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import { 
  collection, query, where, onSnapshot, doc, getDoc, updateDoc 
} from 'firebase/firestore';
import { saveUserProgress, getUserProfile, updateUserProfile } from '../services/userDatabase';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [progressList, setProgressList] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Sync user profile data in real-time from Firestore
  useEffect(() => {
    if (!user) {
      setProfileData(null);
      setCompletedLessons(new Set());
      setProgressList([]);
      setLoadingProgress(false);
      return;
    }

    setLoadingProgress(true);

    // 1. Subscribe to Profile updates in real-time
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
    }, (err) => console.error("Real-time profile subscription failed", err));

    // 2. Subscribe to Progress collection in real-time
    const progressColl = collection(db, 'progress');
    const progressQuery = query(progressColl, where('uid', '==', user.uid));
    
    const unsubscribeProgress = onSnapshot(progressQuery, (querySnap) => {
      const list = [];
      const completedSet = new Set();
      
      querySnap.forEach((doc) => {
        const data = doc.data();
        list.push(data);
        if (data.completed) {
          // Store both string representation and numeric if applicable for maximum compatibility
          completedSet.add(String(data.lessonId));
          if (!isNaN(data.lessonId)) {
            completedSet.add(Number(data.lessonId));
          }
        }
      });
      
      setProgressList(list);
      setCompletedLessons(completedSet);
      setLoadingProgress(false);
    }, (err) => {
      console.error("Real-time progress subscription failed", err);
      setLoadingProgress(false);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeProgress();
    };
  }, [user]);

  // Mark a step/lesson completed or uncompleted for a specific subject (defaults to c-programming)
  const toggleLessonComplete = async (lessonId, subjectId = 'c-programming') => {
    if (!user) return;
    const lessonStr = String(lessonId);
    const wasCompleted = completedLessons.has(lessonStr) || ( !isNaN(lessonId) && completedLessons.has(Number(lessonId)) );
    const nextState = !wasCompleted;

    try {
      // 1. Update progress entry in Firestore progress collection
      await saveUserProgress(
        user.uid,
        subjectId,
        lessonStr,
        nextState ? 100 : 0,
        nextState
      );

      // 2. Update stats atomically in Firestore user profile
      if (profileData) {
        const stats = profileData.learningStats || {};
        const currentCount = stats.lessonsCompleted || 0;
        
        // Calculate new streak count
        let newStreak = stats.currentStreak || 5;
        if (nextState) {
          newStreak = newStreak + 1;
        }

        const nextCount = nextState ? currentCount + 1 : Math.max(0, currentCount - 1);
        const xpChange = nextState ? 100 : -100;
        const newXP = Math.max(0, (stats.xp || 0) + xpChange);
        const newLevel = Math.max(1, Math.floor(newXP / 1000) + 1);

        await updateUserProfile(user.uid, {
          'learningStats.lessonsCompleted': nextCount,
          'learningStats.xp': newXP,
          'learningStats.level': newLevel,
          'learningStats.currentStreak': newStreak,
          'lastOpenedLesson': lessonStr
        });
      }
    } catch (err) {
      console.error("Error toggling C lesson state:", err);
      throw err;
    }
  };

  const value = {
    completedLessons,
    progressList,
    profileData,
    loadingProgress,
    toggleLessonComplete
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used inside a ProgressProvider');
  }
  return context;
};
