import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MasterChapterTemplate from '../components/learning/MasterChapterTemplate';
import { C_CHAPTERS } from './SemesterCSubjectPage';
import { SC_CHAPTER_CONTENT } from '../data/sc_chapter_content';

const SemesterCChapterPage = () => {
  const navigate = useNavigate();
  const { chapterSlug } = useParams();

  // Find chapter metadata and content
  const chapter = C_CHAPTERS.find(c => c.slug === chapterSlug);
  const content = SC_CHAPTER_CONTENT[chapterSlug];

  // Chapter navigation calculation
  const currentIndex = C_CHAPTERS.findIndex(c => c.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? C_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < C_CHAPTERS.length - 1 ? C_CHAPTERS[currentIndex + 1] : null;

  const handleNavigateChapter = (slug) => {
    navigate(`/curriculum/semester-1/problem-solving-using-c/chapter/${slug}`);
    window.scrollTo(0, 0);
  };

  if (!chapter || !content) {
    return (
      <MasterChapterTemplate
        chapterTitle="Chapter Not Found"
        chapterDesc="The requested learning chapter could not be located."
        subjectTitle="Problem Solving Using C"
        subjectCode="BCA-101"
        subjectPath="/curriculum/semester-1/problem-solving-using-c"
      />
    );
  }

  return (
    <MasterChapterTemplate
      chapterId={chapter.id}
      chapterTitle={chapter.title}
      chapterDesc={chapter.desc}
      difficulty={chapter.difficulty}
      estimatedTime={chapter.duration}
      subjectTitle="Problem Solving Using C"
      subjectCode="BCA-101"
      subjectPath="/curriculum/semester-1/problem-solving-using-c"
      language="C"
      filename="main.c"
      theory={content.theory}
      code={content.code}
      output={content.output}
      explanation={content.explanation || []}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      onNavigateChapter={handleNavigateChapter}
    />
  );
};

export default SemesterCChapterPage;
