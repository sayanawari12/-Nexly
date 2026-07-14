import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

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

const RecentProgramsCard = ({ recentPrograms }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-card">
      <h3 className="sidebar-title"><Clock size={16} /> Resume Practicing</h3>
      {recentPrograms.length > 0 ? (
        <ul className="recent-list">
          {recentPrograms.map(program => (
            <li key={program.id} className="recent-item">
              <div className="recent-info">
                <span className="recent-name">{program.title}</span>
                <span className="recent-subject">{SUBJECT_MAP[program.subject]}</span>
              </div>
              <button 
                onClick={() => navigate(`/practice/programs/${program.id}`)}
                className="btn-recent-go"
              >
                <ChevronRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="recent-empty">
          <p>Your recently solved programs will be shown here for quick access.</p>
        </div>
      )}
    </div>
  );
};

export default RecentProgramsCard;
