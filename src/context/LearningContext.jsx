import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchAllSemesters, fetchSemesterDetails } from '../services/semester/semesterService';
import { fetchAllSubjects, fetchSubjectsForSemester } from '../services/subject/subjectService';
import { fetchUnitsForSubject, fetchAllUnits } from '../services/unit/unitService';
import { fetchLessonsForUnit, fetchAllLessons, getPrevAndNextLesson } from '../services/lesson/lessonService';

const LearningContext = createContext(null);

export const LearningProvider = ({ children }) => {
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [activeSemesterId, setActiveSemesterId] = useState(null);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);

  const [loadingLearning, setLoadingLearning] = useState(false);
  const [error, setError] = useState(null);

  // Initialize and load base Semesters and Subjects
  useEffect(() => {
    const initializeData = async () => {
      setLoadingLearning(true);
      try {
        let semList = await fetchAllSemesters();
        let subList = await fetchAllSubjects();

        if (semList.length === 0) {
          const { seedDatabase } = await import('../services/seeder');
          await seedDatabase();
          semList = await fetchAllSemesters();
          subList = await fetchAllSubjects();
        }

        setSemesters(semList);
        setSubjects(subList);

        if (semList.length > 0) {
          setActiveSemesterId(semList[0].id);
        }
      } catch (err) {
        console.error('Error initializing Learning Engine data:', err);
        setError(err.message);
      } finally {
        setLoadingLearning(false);
      }
    };
    initializeData();
  }, []);

  // Fetch full hierarchy (units & lessons) for the active subject
  useEffect(() => {
    if (!activeSubjectId) {
      setUnits([]);
      setLessons([]);
      return;
    }

    const loadSubjectHierarchy = async () => {
      setLoadingLearning(true);
      try {
        const fetchedUnits = await fetchUnitsForSubject(activeSubjectId);
        setUnits(fetchedUnits);

        // Fetch lessons for all units in parallel
        const lessonPromises = fetchedUnits.map(unit => fetchLessonsForUnit(unit.id));
        const results = await Promise.all(lessonPromises);
        const flattenedLessons = results.flat();
        
        // Sort lessons by order
        const sortedLessons = flattenedLessons.sort((a, b) => (a.order || 0) - (b.order || 0));
        setLessons(sortedLessons);
      } catch (err) {
        console.error('Error loading subject units/lessons:', err);
        setError(err.message);
      } finally {
        setLoadingLearning(false);
      }
    };

    loadSubjectHierarchy();
  }, [activeSubjectId]);

  // Derived state: Active lesson metadata
  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    return lessons.find(l => l.id === activeLessonId) || null;
  }, [lessons, activeLessonId]);

  // Derived state: Next and Previous lessons calculated dynamically using the service helper
  const { prevLesson, nextLesson } = useMemo(() => {
    if (!activeLessonId || lessons.length === 0) {
      return { prevLesson: null, nextLesson: null };
    }
    return getPrevAndNextLesson(activeLessonId, lessons);
  }, [activeLessonId, lessons]);

  const value = {
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
    loadingLearning,
    error
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used inside a LearningProvider');
  }
  return context;
};
