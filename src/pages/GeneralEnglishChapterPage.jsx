import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralEnglishChapterTemplate from '../components/learning/GeneralEnglishChapterTemplate';
import { ENGLISH_CHAPTERS, ENGLISH_CHAPTER_CONTENT } from '../data/general_english_chapters';

const GeneralEnglishChapterPage = () => {
  const navigate = useNavigate();
  const { chapterSlug } = useParams();

  // Parameter normalization
  const rawParam = (chapterSlug || '').trim();
  const normalizedSlug = rawParam.toLowerCase();

  const chapter = ENGLISH_CHAPTERS.find(c => 
    c.slug.toLowerCase() === normalizedSlug ||
    String(c.id) === normalizedSlug ||
    c.slug.toLowerCase() === normalizedSlug.replace(/[^a-z0-9]+/g, '-')
  );

  const matchedSlug = chapter ? chapter.slug : (ENGLISH_CHAPTER_CONTENT[normalizedSlug] ? normalizedSlug : 'introduction-to-communication');
  const content = ENGLISH_CHAPTER_CONTENT[matchedSlug] || (chapter ? ENGLISH_CHAPTER_CONTENT[chapter.slug] : null);

  const activeChapter = chapter || (content ? {
    id: 1,
    title: content.title || 'Introduction to Communication',
    desc: 'Master verbal, non-verbal, and written communication for academic & career success.',
    difficulty: 'Beginner',
    duration: '20 min read',
    slug: matchedSlug
  } : null);

  // Chapter navigation calculation
  const currentIndex = activeChapter ? ENGLISH_CHAPTERS.findIndex(c => c.slug === activeChapter.slug) : -1;
  const prevChapter = currentIndex > 0 ? ENGLISH_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = (currentIndex >= 0 && currentIndex < ENGLISH_CHAPTERS.length - 1) ? ENGLISH_CHAPTERS[currentIndex + 1] : null;

  const handleNavigateChapter = (slug) => {
    navigate(`/curriculum/semester-1/general-english/chapter/${slug}`);
    window.scrollTo(0, 0);
  };

  if (!activeChapter || !content) {
    return (
      <GeneralEnglishChapterTemplate
        isError={true}
        errorMessage={`Chapter "${chapterSlug}" could not be located in the General English curriculum.`}
        subjectTitle="General English"
        subjectCode="BCA-104"
        subjectPath="/curriculum/semester-1/general-english"
      />
    );
  }

  return (
    <GeneralEnglishChapterTemplate
      chapterId={activeChapter.id}
      chapterTitle={activeChapter.title}
      chapterDesc={activeChapter.desc}
      difficulty={activeChapter.difficulty}
      readTime={activeChapter.duration || '20 min read'}
      subjectTitle="General English"
      subjectCode="BCA-104"
      subjectPath="/curriculum/semester-1/general-english"
      progressPercent={25}
      intro={content.intro || ''}
      theory={content.theory || ''}
      examples={content.examples || []}
      exercises={content.exercises || []}
      mistakes={content.mistakes || []}
      tips={content.tips || []}
      summary={content.summary || ''}
      quiz={content.quiz || []}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      onNavigateChapter={handleNavigateChapter}
    />
  );
};

export default GeneralEnglishChapterPage;
