import React from 'react';
import NotesViewer from '../../features/notes/NotesViewer';

/**
 * DSNotesPage — Page entry point for Data Structure Notes.
 * Route: /curriculum/semester-2/data-structures/notes
 *
 * To add notes for another subject, create a similar page component
 * and pass a different pdfUrl + metadata.
 */
const DSNotesPage = () => {
  return (
    <NotesViewer
      pdfUrl={`${process.env.PUBLIC_URL}/notes/semester2/DS_Notes.pdf`}
      subjectTitle="Data Structures"
      subjectCode="BCA-202"
    />
  );
};

export default DSNotesPage;
