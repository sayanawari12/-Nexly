import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
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

  // 1. Set active lesson ID from parameter
  useEffect(() => {
    if (lessonId) {
      setActiveLessonId(lessonId);
    }
  }, [lessonId, setActiveLessonId]);

  // 1.5 Auto-initialize subject if not set
  useEffect(() => {
    if (!activeSubjectId && subjects.length > 0) {
      setActiveSubjectId(subjects[0].id);
    }
  }, [activeSubjectId, subjects, setActiveSubjectId]);

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

  // 2.6 Auto-save current learning state when a lesson is opened
  useEffect(() => {
    if (user && activeLessonId && activeSubjectId && activeUnitId && activeSemesterId) {
      const updateState = async () => {
        try {
          const { updateLastOpenedLesson } = await import('../services/learningState/learningStateService');
          const isComp = completedLessons.has(activeLessonId) || completedLessons.has(Number(activeLessonId));
          const lesson = lessons.find(l => l.id === activeLessonId);
          const estTime = lesson ? lesson.estimatedTime : '15 mins';
          
          await updateLastOpenedLesson(
            user.uid,
            activeLessonId,
            activeSubjectId,
            activeUnitId,
            activeSemesterId,
            isComp ? 100 : 30,
            estTime,
            isComp
          );
        } catch (err) {
          console.error('Error updating continue learning state:', err);
        }
      };
      updateState();
    }
  }, [user, activeLessonId, activeSubjectId, activeUnitId, activeSemesterId, completedLessons, lessons]);

  // 3. Fetch Bookmark Status on active lesson/user change
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

  // Handlers
  const handleToggleBookmark = async () => {
    if (!user || !activeLessonId) return;
    setLoadingBookmark(true);
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
    } finally {
      setLoadingBookmark(false);
    }
  };

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

  // 4. Loading Skeleton State
  if (loadingLearning || loadingProgress) {
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

  // 5. Error State (Never render a blank black screen when lesson is missing!)
  if (!activeLesson) {
    return (
      <div className="lesson-viewer-page-wrapper" style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        <div className="mc-error-state-card glass-card" style={{ maxWidth: 500, width: '100%' }}>
          <AlertTriangle size={42} style={{ color: '#f59e0b', marginBottom: 16 }} />
          <h2 className="error-title">Lesson Not Found</h2>
          <p className="error-desc">
            The requested lesson could not be loaded. Please return to your curriculum workspace.
          </p>
          <button 
            className="btn-primary-purple" 
            onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
          >
            Go to Problem Solving Using C
          </button>
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
        loadingBookmark={loadingBookmark}
        uid={user?.uid}
      />
    </div>
  );
};

export default LessonViewerPage;
