import React from 'react';
import LessonCard from './LessonCard';

const LessonList = ({ lessons, completedLessons, activeLessonId, onLessonSelect }) => {
  if (!lessons || lessons.length === 0) {
    return <div className="no-lessons-text">No lessons available in this section.</div>;
  }

  return (
    <div className="lesson-list-container">
      {lessons.map((lesson) => {
        const isCompleted = completedLessons?.has(lesson.id) || completedLessons?.has(Number(lesson.id)) || false;
        const isActive = activeLessonId === lesson.id;
        
        return (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={isCompleted}
            isActive={isActive}
            onClick={() => onLessonSelect && onLessonSelect(lesson.id)}
          />
        );
      })}
    </div>
  );
};

export default LessonList;
