import React from 'react';

const ProgrammingStatsCard = ({ completedCount, totalCount, completionPercentage }) => {
  return (
    <div className="hub-stats-card">
      <div className="stats-header">
        <span className="stats-label">Mastery Progress</span>
        <span className="stats-value">{completedCount}/{totalCount} Solved</span>
      </div>
      <div className="hub-progress-bar-bg">
        <div 
          className="hub-progress-bar-fill" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="stats-footer">
        <span>{completionPercentage}% complete</span>
        <span className="xp-badge">+{completedCount * 100} XP Earned</span>
      </div>
    </div>
  );
};

export default ProgrammingStatsCard;
