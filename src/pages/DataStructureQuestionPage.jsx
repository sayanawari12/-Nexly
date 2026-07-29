import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataStructureQuestionTemplate from '../components/learning/DataStructureQuestionTemplate';
import { DS_FULL_QUESTIONS } from '../data/ds_full_curriculum';

const DataStructureQuestionPage = () => {
  const navigate = useNavigate();
  const { unitId, questionSlug } = useParams();

  const rawParam = (questionSlug || '').trim();
  const normalizedSlug = rawParam.toLowerCase();

  const question = DS_FULL_QUESTIONS.find(q => 
    q.slug.toLowerCase() === normalizedSlug ||
    q.questionNumber.toLowerCase() === normalizedSlug ||
    String(q.id) === normalizedSlug ||
    q.slug.toLowerCase() === normalizedSlug.replace(/[^a-z0-9]+/g, '-')
  );

  const currentIndex = question ? DS_FULL_QUESTIONS.findIndex(q => q.id === question.id) : -1;
  const prevQuestion = currentIndex > 0 ? DS_FULL_QUESTIONS[currentIndex - 1] : null;
  const nextQuestion = (currentIndex >= 0 && currentIndex < DS_FULL_QUESTIONS.length - 1) ? DS_FULL_QUESTIONS[currentIndex + 1] : null;

  const handleNavigateQuestion = (targetQ) => {
    if (!targetQ) return;
    navigate(`/curriculum/semester-2/data-structures/unit-${targetQ.unitId}/question/${targetQ.slug}`);
    window.scrollTo(0, 0);
  };

  if (!question) {
    return (
      <DataStructureQuestionTemplate
        isError={true}
        errorMessage={`Question "${questionSlug}" could not be located.`}
        subjectTitle="Data Structures"
        subjectCode="BCA-202"
        subjectPath="/curriculum/semester-2/data-structures"
      />
    );
  }

  return (
    <DataStructureQuestionTemplate
      unitId={question.unitId}
      questionNumber={question.questionNumber}
      questionTitle={question.title}
      difficulty={question.difficulty || 'Intermediate'}
      readTime={question.duration || '20 min read'}
      subjectTitle="Data Structures"
      subjectCode="BCA-202"
      subjectPath="/curriculum/semester-2/data-structures"
      progressPercent={Math.round(((currentIndex + 1) / DS_FULL_QUESTIONS.length) * 100)}
      theory={question.theory || ''}
      explanation={question.explanation || ''}
      diagram={question.diagram || ''}
      table={question.table || null}
      notes={question.notes || ''}
      keyPoints={question.keyPoints || []}
      summary={question.summary || ''}
      prevQuestion={prevQuestion}
      nextQuestion={nextQuestion}
      onNavigateQuestion={handleNavigateQuestion}
    />
  );
};

export default DataStructureQuestionPage;
