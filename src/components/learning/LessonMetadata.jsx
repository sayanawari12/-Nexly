import React from 'react';
import { Clock, Trophy, Calendar, Award } from 'lucide-react';

const LessonMetadata = ({ difficulty, estimatedTime, xp, updatedAt }) => {
  const formattedDate = updatedAt 
    ? new Date(updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="lesson-viewer-metadata">
      <div className="metadata-row">
        <span className={`difficulty-badge-large ${difficulty?.toLowerCase() || 'easy'}`}>
          <Award size={14} style={{ marginRight: '4px' }} />
          {difficulty || 'Easy'}
        </span>
        
        <span className="metadata-tag">
          <Clock size={14} />
          {estimatedTime || '15 mins'}
        </span>

        <span className="metadata-tag xp-reward">
          <Trophy size={14} />
          {xp || 100} XP
        </span>

        <span className="metadata-tag date-updated">
          <Calendar size={14} />
          Updated: {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default LessonMetadata;
