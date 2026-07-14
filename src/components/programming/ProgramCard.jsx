import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Star, CheckCircle, ArrowRight } from 'lucide-react';

const SUBJECT_MAP = {
  'all': 'All Subjects',
  'c-programming': 'C Programming',
  'cpp': 'C++',
  'java': 'Java',
  'python': 'Python',
  'data-structures': 'Data Structures',
  'operating-system': 'Operating System',
  'dbms': 'DBMS',
  'computer-networks': 'Computer Networks'
};

const ProgramCard = React.memo(({ 
  program, 
  isBookmarked, 
  isCompleted, 
  onToggleBookmark, 
  onToggleCompletion 
}) => {
  const navigate = useNavigate();

  let diffClass = 'diff-easy';
  if (program.difficulty === 'Medium') diffClass = 'diff-medium';
  else if (program.difficulty === 'Hard') diffClass = 'diff-hard';

  return (
    <article className="program-card">
      <div className="card-top-row">
        <span className="card-subject-tag">
          {SUBJECT_MAP[program.subject] || program.subject}
        </span>
        <div className="card-actions-wrapper">
          <button 
            onClick={() => onToggleBookmark(program.id)}
            className={`action-btn-bookmark ${isBookmarked ? 'active' : ''}`}
            aria-label="Bookmark program"
          >
            <Star size={16} fill={isBookmarked ? '#fbbf24' : 'none'} />
          </button>
          <button 
            onClick={() => onToggleCompletion(program.id)}
            className={`action-btn-complete ${isCompleted ? 'active' : ''}`}
            aria-label="Toggle completion state"
          >
            <CheckCircle size={16} fill={isCompleted ? '#10b981' : 'none'} />
          </button>
        </div>
      </div>

      <h3 className="card-program-title">{program.title}</h3>
      <p className="card-program-desc">{program.description}</p>

      <div className="card-metadata-row">
        <span className={`diff-badge ${diffClass}`}>{program.difficulty}</span>
        <span className="meta-item"><Clock size={12} /> {program.estimatedTime || '15 mins'}</span>
        <span className="meta-item"><BookOpen size={12} /> {program.category}</span>
      </div>

      <div className="card-footer-row">
        <div className="tags-list">
          {program.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="meta-tag">#{tag}</span>
          ))}
        </div>
        <button 
          onClick={() => navigate(`/practice/programs/${program.id}`)}
          className="btn-solve"
        >
          Solve Code <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
});

ProgramCard.displayName = 'ProgramCard';

export default ProgramCard;
