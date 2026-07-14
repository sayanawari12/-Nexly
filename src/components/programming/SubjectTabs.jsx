import React from 'react';

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

const SubjectTabs = ({ activeSubject, onSubjectChange }) => {
  return (
    <nav className="subject-nav-scroll">
      <div className="subject-tabs">
        {Object.entries(SUBJECT_MAP).map(([id, label]) => (
          <button
            key={id}
            onClick={() => onSubjectChange(id)}
            className={`subject-tab ${activeSubject === id ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SubjectTabs;
