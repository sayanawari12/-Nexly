import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MasterChapterTemplate from '../components/learning/MasterChapterTemplate';
import { C_CHAPTERS } from './SemesterCSubjectPage';
import { SC_CHAPTER_CONTENT } from '../data/sc_chapter_content';

const SemesterCChapterPage = () => {
  const navigate = useNavigate();
  const { chapterSlug } = useParams();

  // Normalize parameter for robust lookup (slug, numeric id, or title variant)
  const rawParam = (chapterSlug || '').trim();
  const normalizedSlug = rawParam.toLowerCase();

  const chapter = C_CHAPTERS.find(c => 
    c.slug.toLowerCase() === normalizedSlug ||
    String(c.id) === normalizedSlug ||
    c.slug.toLowerCase() === normalizedSlug.replace(/[^a-z0-9]+/g, '-')
  );

  const matchedSlug = chapter ? chapter.slug : (SC_CHAPTER_CONTENT[normalizedSlug] ? normalizedSlug : 'introduction-to-c');
  const content = SC_CHAPTER_CONTENT[matchedSlug] || (chapter ? SC_CHAPTER_CONTENT[chapter.slug] : null);

  const activeChapter = chapter || (content ? {
    id: 1,
    title: content.title || 'Introduction to C',
    desc: 'Master the fundamentals of C programming from scratch.',
    difficulty: 'Beginner',
    duration: '20 min',
    slug: matchedSlug
  } : null);

  // Chapter navigation calculation
  const currentIndex = activeChapter ? C_CHAPTERS.findIndex(c => c.slug === activeChapter.slug) : -1;
  const prevChapter = currentIndex > 0 ? C_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = (currentIndex >= 0 && currentIndex < C_CHAPTERS.length - 1) ? C_CHAPTERS[currentIndex + 1] : null;

  const handleNavigateChapter = (slug) => {
    navigate(`/curriculum/semester-1/problem-solving-using-c/chapter/${slug}`);
    window.scrollTo(0, 0);
  };

  if (!activeChapter || !content) {
    return (
      <MasterChapterTemplate
        isError={true}
        errorMessage={`Chapter "${chapterSlug}" could not be located in the C Programming curriculum.`}
        subjectTitle="Problem Solving Using C"
        subjectCode="BCA-101"
        subjectPath="/curriculum/semester-1/problem-solving-using-c"
      />
    );
  }

  return (
    <MasterChapterTemplate
      chapterId={activeChapter.id}
      chapterTitle={activeChapter.title}
      chapterDesc={activeChapter.desc}
      difficulty={activeChapter.difficulty}
      estimatedTime={activeChapter.duration}
      subjectTitle="Problem Solving Using C"
      subjectCode="BCA-101"
      subjectPath="/curriculum/semester-1/problem-solving-using-c"
      language="C"
      filename="main.c"
      theory={content.theory || ''}
      code={content.code || ''}
      output={content.output || ''}
      explanation={content.explanation || []}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      onNavigateChapter={handleNavigateChapter}
    />
  );
};

export default SemesterCChapterPage;
