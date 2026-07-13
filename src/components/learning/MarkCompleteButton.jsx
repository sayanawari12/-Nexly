import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const MarkCompleteButton = ({ isCompleted, onClick, disabled }) => {
  return (
    <button 
      className={`sticky-panel-action-btn complete-btn ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={isCompleted ? 'Mark Incomplete' : 'Mark as Complete'}
    >
      {isCompleted ? (
        <CheckCircle2 size={18} className="icon-success" />
      ) : (
        <Circle size={18} className="icon-pending" />
      )}
      <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
    </button>
  );
};

export default MarkCompleteButton;
