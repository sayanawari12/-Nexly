import React from 'react';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import './learning.css'; // Let's keep a shared stylesheet for learning components

const LessonCard = ({ lesson, isCompleted, isActive, onClick }) => {
  const { title, difficulty, estimatedTime, xp } = lesson;

  return (
    <div 
      className={`lesson-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className="lesson-card-header">
        <div className="lesson-icon-wrapper">
          {isCompleted ? (
            <CheckCircle className="icon-completed" size={18} />
          ) : (
            <BookOpen className="icon-unread" size={18} />
          )}
        </div>
        <div className="lesson-card-details">
          <h4 className="lesson-card-title">{title}</h4>
          <div className="lesson-card-meta">
            <span className="meta-item">
              <Clock size={12} />
              {estimatedTime || '10 mins'}
            </span>
            <span className="meta-item">
              <Trophy size={12} />
              {xp || 100} XP
            </span>
            <span className={`difficulty-badge ${difficulty?.toLowerCase()}`}>
              {difficulty || 'Easy'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
