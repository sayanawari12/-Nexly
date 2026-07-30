import React from 'react';
import QuestionsPage from '../../features/questions/QuestionsPage';

const VIEWER_BASE = '/curriculum/semester-2/data-structures/questions';

/**
 * DSQuestionsListPage — Route entry for the DS Questions grid.
 * Route: /curriculum/semester-2/data-structures/questions
 */
const DSQuestionsListPage = () => (
  <QuestionsPage
    subjectTitle="Data Structures"
    subjectCode="BCA-202"
    semesterLabel="Semester 2"
    pdfUrl={`${process.env.PUBLIC_URL}/notes/semester2/DS_Notes.pdf`}
    totalQuestions={55}
    viewerBasePath={VIEWER_BASE}
    backPath="/curriculum/semester-2/data-structures"
  />
);

export default DSQuestionsListPage;
