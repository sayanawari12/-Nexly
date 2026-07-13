import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import { 
  collection, query, where, onSnapshot, doc 
} from 'firebase/firestore';
import { saveUserProgress, getUserProfile, updateUserProfile } from '../services/userDatabase';
import { 
  startLesson, 
  completeLesson, 
  getProgressStats, 
  getLastOpenedLesson, 
  getResumeLesson, 
  calculateCompletionPercentage 
} from '../services/progress/progressService';
import { listenToUserBookmarks } from '../repositories/bookmarkRepository';
import { listenToUserNotes } from '../repositories/notesRepository';
import { listenToLearningState } from '../repositories/learningStateRepository';
import { useLearning } from './LearningContext';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const { semesters, subjects, units, lessons } = useLearning();

  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [inProgressLessons, setInProgressLessons] = useState(new Set());
  const [progressList, setProgressList] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Bookmarks & Notes state
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Continue Learning State
  const [learningState, setLearningState] = useState(null);

  // Sync user profile data in real-time from Firestore
  useEffect(() => {
    if (!user) {
      setProfileData(null);
      setCompletedLessons(new Set());
      setInProgressLessons(new Set());
      setProgressList([]);
      setBookmarks([]);
      setNotes([]);
      setLearningState(null);
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
      const inProgressSet = new Set();
      
      querySnap.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...data });
        
        const lessonIdStr = String(data.lessonId);
        if (data.status === 'completed') {
          completedSet.add(lessonIdStr);
          if (!isNaN(data.lessonId)) {
            completedSet.add(Number(data.lessonId));
          }
        } else if (data.status === 'in-progress' || data.status === 'revisit') {
          inProgressSet.add(lessonIdStr);
          if (!isNaN(data.lessonId)) {
            inProgressSet.add(Number(data.lessonId));
          }
        }
      });
      
      setProgressList(list);
      setCompletedLessons(completedSet);
      setInProgressLessons(inProgressSet);
      setLoadingProgress(false);
    }, (err) => {
      console.error("Real-time progress subscription failed", err);
      setLoadingProgress(false);
    });

    // 3. Subscribe to secure user subcollection bookmarks in real time
    const unsubscribeBookmarks = listenToUserBookmarks(user.uid, (data) => {
      setBookmarks(data);
    });

    // 4. Subscribe to secure user subcollection notes in real time
    const unsubscribeNotes = listenToUserNotes(user.uid, (data) => {
      setNotes(data);
    });

    // 5. Subscribe to continue learning state in real time
    const unsubscribeLearningState = listenToLearningState(user.uid, (data) => {
      setLearningState(data);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeProgress();
      unsubscribeBookmarks();
      unsubscribeNotes();
      unsubscribeLearningState();
    };
  }, [user]);

  // Derived progress statistics
  const stats = useMemo(() => {
    return getProgressStats(progressList);
  }, [progressList]);

  // Derived last opened lesson ID
  const lastOpenedLesson = useMemo(() => {
    return getLastOpenedLesson(progressList);
  }, [progressList]);

  // Derived bookmark count
  const bookmarkCount = useMemo(() => {
    return bookmarks.length;
  }, [bookmarks]);

  // Derived latest notes sorted by modification date
  const latestNotes = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }, [notes]);

  // Roadmap engine calculations
  const semesterProgress = useMemo(() => {
    const { calculateSemesterProgress } = require('../services/roadmap/roadmapService');
    return calculateSemesterProgress('semester-2', subjects, units, lessons, completedLessons);
  }, [completedLessons, subjects, units, lessons]);

  const subjectProgress = useMemo(() => {
    const { getRoadmapStatistics } = require('../services/roadmap/roadmapService');
    return getRoadmapStatistics(subjects, units, lessons, completedLessons, inProgressLessons);
  }, [completedLessons, inProgressLessons, subjects, units, lessons]);

  const overallProgress = useMemo(() => {
    const { calculateOverallProgress } = require('../services/roadmap/roadmapService');
    return calculateOverallProgress(lessons, completedLessons);
  }, [completedLessons, lessons]);

  const completedSubjects = useMemo(() => {
    const completedSet = new Set();
    subjects.forEach(subject => {
      const stats = subjectProgress[subject.id];
      if (stats && stats.percentage === 100) {
        completedSet.add(subject.id);
      }
    });
    return completedSet;
  }, [subjectProgress, subjects]);

  const completedUnits = useMemo(() => {
    const completedSet = new Set();
    const { calculateUnitProgress } = require('../services/roadmap/roadmapService');
    units.forEach(unit => {
      const stats = calculateUnitProgress(unit.id, lessons, completedLessons, inProgressLessons);
      if (stats && stats.percentage === 100) {
        completedSet.add(unit.id);
      }
    });
    return completedSet;
  }, [completedLessons, inProgressLessons, units, lessons]);

  const remainingLessons = useMemo(() => {
    const completedIds = new Set(progressList.filter(p => p.status === 'completed').map(p => p.lessonId));
    return lessons.filter(l => !completedIds.has(String(l.id)) && !completedIds.has(Number(l.id)));
  }, [progressList, lessons]);

  // Helper to calculate percentage dynamically for UI
  const getSubjectPercentage = (subjectId, totalLessonsCount) => {
    if (!totalLessonsCount) return 0;
    const subjectCompleted = progressList.filter(p => p.subjectId === subjectId && p.status === 'completed').length;
    return calculateCompletionPercentage(subjectCompleted, totalLessonsCount);
  };

  // Automatically track opening of a lesson
  const markLessonInProgress = async (lessonId, subjectId = 'c-programming', unitId = 'c-unit-1', semesterId = 'semester-2') => {
    if (!user || !lessonId) return;
    try {
      await startLesson(user.uid, String(lessonId), subjectId, unitId, semesterId);
    } catch (err) {
      console.error("Error setting lesson in-progress in context:", err);
    }
  };

  // Toggle completion state (Mark Done)
  const toggleLessonComplete = async (lessonId, subjectId = 'c-programming', unitId = 'c-unit-1', semesterId = 'semester-2') => {
    if (!user || !lessonId) return;
    const lessonStr = String(lessonId);
    const wasCompleted = completedLessons.has(lessonStr) || ( !isNaN(lessonId) && completedLessons.has(Number(lessonId)) );
    const nextState = !wasCompleted;

    try {
      // 1. Save completion to progress collection
      await completeLesson(user.uid, lessonStr, subjectId, unitId, semesterId, nextState);

      // 2. Update user stats atomically inside user profile document for gamification
      if (profileData) {
        const stats = profileData.learningStats || {};
        const currentCount = stats.lessonsCompleted || 0;
        
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
      console.error("Error toggling lesson completion in context:", err);
      throw err;
    }
  };

  // Resume learning helper
  const resumeLearning = (navigate) => {
    if (learningState && learningState.currentLessonId) {
      navigate(`/lessons/${learningState.currentLessonId}`);
    } else {
      // Fallback: Navigate to the first C Programming lesson
      navigate('/lessons/c-lesson-1');
    }
  };

  const value = {
    completedLessons,
    inProgressLessons,
    progressList,
    profileData,
    loadingProgress,
    todayCompletedCount: stats.todayCompletedCount,
    weeklyCompletedCount: stats.weeklyCompletedCount,
    lastOpenedLesson,
    getSubjectPercentage,
    markLessonInProgress,
    toggleLessonComplete,
    bookmarks,
    notes,
    bookmarkCount,
    latestNotes,
    isSaving,
    setIsSaving,
    learningState,
    resumeLearning,
    semesterProgress,
    subjectProgress,
    overallProgress,
    completedSubjects,
    completedUnits,
    remainingLessons
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
