import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionViewer from '../../features/questions/QuestionViewer';

const LIST_PATH   = '/curriculum/semester-2/data-structures/questions';
const VIEWER_BASE = '/curriculum/semester-2/data-structures/questions';
const TOTAL       = 55;

/**
 * DSQuestionViewerPage — Route entry for one DS question.
 * Route: /curriculum/semester-2/data-structures/questions/:questionNumber
 *
 * The :questionNumber param is validated here; invalid values redirect to the list.
 */
const DSQuestionViewerPage = () => {
  const { questionNumber: raw } = useParams();
  const navigate = useNavigate();

  const num = parseInt(raw, 10);

  /* Guard — redirect to list if param is invalid */
  if (isNaN(num) || num < 1 || num > TOTAL) {
    navigate(LIST_PATH, { replace: true });
    return null;
  }

  return (
    <QuestionViewer
      questionNumber={num}
      totalQuestions={TOTAL}
      pdfUrl={`${process.env.PUBLIC_URL}/notes/semester2/DS_Notes.pdf`}
      subjectTitle="Data Structures"
      subjectCode="BCA-202"
      listPath={LIST_PATH}
      viewerBasePath={VIEWER_BASE}
    />
  );
};

export default DSQuestionViewerPage;
