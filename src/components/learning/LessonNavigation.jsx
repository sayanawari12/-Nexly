import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const LessonNavigation = ({ prevLesson, nextLesson, onNavigate }) => {
  return (
    <div className="lesson-navigation-container">
      <button 
        className="nav-btn prev-btn"
        disabled={!prevLesson}
        onClick={() => prevLesson && onNavigate(prevLesson.id)}
        aria-label="Previous Lesson"
      >
        <ArrowLeft size={16} />
        <div className="nav-btn-text">
          <span className="nav-btn-label">Previous</span>
          <span className="nav-btn-title">{prevLesson ? prevLesson.title : 'First Lesson'}</span>
        </div>
      </button>

      <button 
        className="nav-btn next-btn"
        disabled={!nextLesson}
        onClick={() => nextLesson && onNavigate(nextLesson.id)}
        aria-label="Next Lesson"
      >
        <div className="nav-btn-text">
          <span className="nav-btn-label">Next</span>
          <span className="nav-btn-title">{nextLesson ? nextLesson.title : 'Last Lesson'}</span>
        </div>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default LessonNavigation;
