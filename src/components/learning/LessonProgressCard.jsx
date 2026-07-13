import React from 'react';
import { BarChart2, Clock } from 'lucide-react';

const LessonProgressCard = ({ completedCount, totalCount, timeRemaining }) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="sticky-panel-progress-card">
      <div className="progress-card-title-row">
        <BarChart2 size={16} className="progress-card-icon" />
        <span className="progress-card-title">Subject Progress</span>
        <span className="progress-card-percentage">{percent}%</span>
      </div>
      
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
      </div>

      <div className="progress-card-stats">
        <span>{completedCount} of {totalCount} lessons completed</span>
      </div>

      {timeRemaining && (
        <div className="progress-card-eta">
          <Clock size={14} />
          <span>Est. Remaining: {timeRemaining}</span>
        </div>
      )}
    </div>
  );
};

export default LessonProgressCard;
