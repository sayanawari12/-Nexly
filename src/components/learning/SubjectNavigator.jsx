import React from 'react';
import { Book, Award, Code, Database, Globe, Cpu } from 'lucide-react';

const iconMap = {
  Book: Book,
  Award: Award,
  Code: Code,
  Database: Database,
  Globe: Globe,
  Cpu: Cpu
};

const SubjectNavigator = ({ subjects, activeSubjectId, onSubjectSelect }) => {
  if (!subjects || subjects.length === 0) {
    return <div className="no-subjects-text">No subjects available.</div>;
  }

  return (
    <div className="subject-navigator-container">
      {subjects.map((subject) => {
        const IconComponent = iconMap[subject.icon] || Book;
        const isActive = activeSubjectId === subject.id;

        return (
          <button
            key={subject.id}
            className={`subject-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSubjectSelect && onSubjectSelect(subject.id)}
          >
            <IconComponent className="subject-nav-icon" size={18} />
            <span className="subject-nav-title">{subject.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SubjectNavigator;
