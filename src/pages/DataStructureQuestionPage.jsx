import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataStructureQuestionTemplate from '../components/learning/DataStructureQuestionTemplate';
import { DS_UNIT1_QUESTIONS, DS_UNIT1_CONTENT } from '../data/ds_unit1_questions';

const DataStructureQuestionPage = () => {
  const navigate = useNavigate();
  const { questionSlug } = useParams();

  // Slug normalization
  const rawParam = (questionSlug || '').trim();
  const normalizedSlug = rawParam.toLowerCase();

  const question = DS_UNIT1_QUESTIONS.find(q => 
    q.slug.toLowerCase() === normalizedSlug ||
    String(q.id) === normalizedSlug ||
    q.slug.toLowerCase() === normalizedSlug.replace(/[^a-z0-9]+/g, '-')
  );

  const matchedSlug = question ? question.slug : (DS_UNIT1_CONTENT[normalizedSlug] ? normalizedSlug : 'q1-data-structures-introduction-classification');
  const content = DS_UNIT1_CONTENT[matchedSlug] || (question ? DS_UNIT1_CONTENT[question.slug] : null);

  const activeQuestion = question || (content ? {
    id: 1,
    questionNumber: 'Question 01',
    title: content.title || 'What is a Data Structure?',
    desc: 'Definition of data structure and taxonomy.',
    difficulty: 'Beginner',
    duration: '20 min read',
    slug: matchedSlug
  } : null);

  // Question navigation calculation
  const currentIndex = activeQuestion ? DS_UNIT1_QUESTIONS.findIndex(q => q.slug === activeQuestion.slug) : -1;
  const prevQuestion = currentIndex > 0 ? DS_UNIT1_QUESTIONS[currentIndex - 1] : null;
  const nextQuestion = (currentIndex >= 0 && currentIndex < DS_UNIT1_QUESTIONS.length - 1) ? DS_UNIT1_QUESTIONS[currentIndex + 1] : null;

  const handleNavigateQuestion = (slug) => {
    navigate(`/curriculum/semester-2/data-structures/unit-1/question/${slug}`);
    window.scrollTo(0, 0);
  };

  if (!activeQuestion || !content) {
    return (
      <DataStructureQuestionTemplate
        isError={true}
        errorMessage={`Question "${questionSlug}" could not be located in Unit 1.`}
        subjectTitle="Data Structures"
        subjectCode="BCA-202"
        subjectPath="/curriculum/semester-2/data-structures/unit-1"
      />
    );
  }

  return (
    <DataStructureQuestionTemplate
      questionNumber={activeQuestion.questionNumber}
      questionTitle={activeQuestion.title}
      difficulty={activeQuestion.difficulty}
      readTime={activeQuestion.duration || '20 min read'}
      subjectTitle="Data Structures"
      subjectCode="BCA-202"
      subjectPath="/curriculum/semester-2/data-structures/unit-1"
      progressPercent={Math.round(((currentIndex + 1) / DS_UNIT1_QUESTIONS.length) * 100)}
      theory={content.theory || ''}
      explanation={content.explanation || ''}
      diagram={content.diagram || ''}
      keyPoints={content.keyPoints || []}
      summary={content.summary || ''}
      prevQuestion={prevQuestion}
      nextQuestion={nextQuestion}
      onNavigateQuestion={handleNavigateQuestion}
    />
  );
};

export default DataStructureQuestionPage;
