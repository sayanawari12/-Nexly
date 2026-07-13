import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useLearning } from '../context/LearningContext';
import { useProgress } from '../context/ProgressContext';
import { checkIsBookmarked, addUserBookmark, removeUserBookmark } from '../services/lesson/lessonService';
import LessonViewer from '../components/learning/LessonViewer';
import '../styles/LessonViewerPage.css';

const LessonViewerPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const {
    semesters,
    subjects,
    units,
    lessons,
    activeSemesterId,
    setActiveSemesterId,
    activeSubjectId,
    setActiveSubjectId,
    activeUnitId,
    setActiveUnitId,
    activeLessonId,
    setActiveLessonId,
    activeLesson,
    prevLesson,
    nextLesson,
    loadingLearning
  } = useLearning();

  const {
    completedLessons,
    toggleLessonComplete,
    loadingProgress,
    markLessonInProgress
  } = useProgress();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);

  // 1. Deep linking / route sync: Set active lesson from parameter
  useEffect(() => {
    if (lessonId) {
      setActiveLessonId(lessonId);
    }
  }, [lessonId, setActiveLessonId]);

  // 2. Automatically resolve parent hierarchy (Subject -> Semester -> Unit) of loaded lesson
  useEffect(() => {
    if (activeLessonId && lessons.length > 0) {
      const lesson = lessons.find(l => l.id === activeLessonId);
      if (lesson) {
        const unit = units.find(u => u.id === lesson.unitId);
        if (unit) {
          setActiveUnitId(unit.id);
          const subject = subjects.find(s => s.id === unit.subjectId);
          if (subject) {
            if (activeSubjectId !== subject.id) {
              setActiveSubjectId(subject.id);
            }
            if (activeSemesterId !== subject.semesterId) {
              setActiveSemesterId(subject.semesterId);
            }
          }
        }
      }
    }
  }, [activeLessonId, lessons, units, subjects, activeSubjectId, activeSemesterId, setActiveUnitId, setActiveSubjectId, setActiveSemesterId]);

  // 2.5 Auto-mark the lesson as "In Progress" when it is opened
  useEffect(() => {
    if (user && activeLessonId && activeSubjectId && activeUnitId && activeSemesterId) {
      markLessonInProgress(activeLessonId, activeSubjectId, activeUnitId, activeSemesterId);
    }
  }, [user, activeLessonId, activeSubjectId, activeUnitId, activeSemesterId, markLessonInProgress]);

  // 3. Track Subject Changes to redirect to first lesson of newly selected subject
  useEffect(() => {
    if (activeSubjectId && lessons.length > 0 && units.length > 0) {
      const currentLesson = lessons.find(l => l.id === activeLessonId);
      const lessonUnit = currentLesson ? units.find(u => u.id === currentLesson.unitId) : null;
      
      // If active lesson doesn't belong to active subject, redirect to first lesson of active subject
      if (!lessonUnit || lessonUnit.subjectId !== activeSubjectId) {
        const subjectUnits = units.filter(u => u.subjectId === activeSubjectId);
        if (subjectUnits.length > 0) {
          // Sort units by order
          const sortedUnits = [...subjectUnits].sort((a, b) => (a.order || 0) - (b.order || 0));
          const firstUnit = sortedUnits[0];
          const unitLessons = lessons.filter(l => l.unitId === firstUnit.id);
          
          if (unitLessons.length > 0) {
            const sortedLessons = [...unitLessons].sort((a, b) => (a.order || 0) - (b.order || 0));
            const firstLesson = sortedLessons[0];
            navigate(`/lessons/${firstLesson.id}`, { replace: true });
          }
        }
      }
    }
  }, [activeSubjectId, activeLessonId, lessons, units, navigate]);

  // 4. Fetch Bookmark Status on active lesson/user change
  useEffect(() => {
    if (user && activeLessonId) {
      const fetchBookmark = async () => {
        setLoadingBookmark(true);
        try {
          const bookmarked = await checkIsBookmarked(user.uid, activeLessonId);
          setIsBookmarked(bookmarked);
        } catch (err) {
          console.error('Error fetching bookmark state:', err);
        } finally {
          setLoadingBookmark(false);
        }
      };
      fetchBookmark();
    }
  }, [user, activeLessonId]);

  // Toggle Bookmark Handler
  const handleToggleBookmark = async () => {
    if (!user || !activeLessonId) return;
    try {
      if (isBookmarked) {
        await removeUserBookmark(user.uid, activeLessonId);
        setIsBookmarked(false);
      } else {
        await addUserBookmark(user.uid, activeLessonId);
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error('Error toggling bookmark status:', err);
    }
  };

  // Toggle Lesson Completion Handler
  const handleToggleComplete = async () => {
    if (!activeLessonId) return;
    try {
      await toggleLessonComplete(activeLessonId, activeSubjectId);
    } catch (err) {
      console.error('Error toggling complete status:', err);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/lessons/${id}`);
  };

  const handleLessonSelect = (id) => {
    navigate(`/lessons/${id}`);
  };

  if (loadingLearning || loadingProgress || !activeLesson) {
    return (
      <div className="lesson-viewer-loading-container">
        <div className="skeleton-grid">
          <div className="skeleton-sidebar"></div>
          <div className="skeleton-main">
            <div className="skeleton-title"></div>
            <div className="skeleton-meta"></div>
            <div className="skeleton-body-line"></div>
            <div className="skeleton-body-line"></div>
            <div className="skeleton-body-line"></div>
          </div>
          <div className="skeleton-sticky"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-viewer-page-wrapper">
      <LessonViewer
        semesters={semesters}
        subjects={subjects}
        units={units}
        lessons={lessons}
        activeSemesterId={activeSemesterId}
        setActiveSemesterId={setActiveSemesterId}
        activeSubjectId={activeSubjectId}
        setActiveSubjectId={setActiveSubjectId}
        activeLessonId={activeLessonId}
        onLessonSelect={handleLessonSelect}
        activeLesson={activeLesson}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        onNavigate={handleNavigate}
        completedLessons={completedLessons}
        onToggleComplete={handleToggleComplete}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        uid={user?.uid}
      />
    </div>
  );
};

export default LessonViewerPage;
