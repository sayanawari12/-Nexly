import React from 'react';
import { ChevronRight } from 'lucide-react';

const LessonHeader = ({ subjectTitle, unitTitle, lessonTitle }) => {
  return (
    <div className="lesson-viewer-header">
      <div className="lesson-viewer-breadcrumbs">
        <span className="breadcrumb-path">{subjectTitle || 'Subject'}</span>
        <ChevronRight size={12} className="breadcrumb-arrow" />
        <span className="breadcrumb-path">{unitTitle || 'Unit'}</span>
      </div>
      <h1 className="lesson-viewer-title">{lessonTitle || 'Loading Lesson...'}</h1>
    </div>
  );
};

export default LessonHeader;
