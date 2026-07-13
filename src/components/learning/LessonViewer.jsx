import React, { useState } from 'react';
import { Menu, X, ArrowLeft, ArrowRight, Bookmark, FileText, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import LessonHeader from './LessonHeader';
import LessonMetadata from './LessonMetadata';
import LessonContent from './LessonContent';
import LessonProgressCard from './LessonProgressCard';
import BookmarkButton from './BookmarkButton';
import MarkCompleteButton from './MarkCompleteButton';
import NotesShortcut from './NotesShortcut';
import LessonNavigation from './LessonNavigation';

const LessonViewer = ({
  semesters,
  subjects,
  units,
  lessons,
  activeSemesterId,
  setActiveSemesterId,
  activeSubjectId,
  setActiveSubjectId,
  activeLessonId,
  onLessonSelect,
  activeLesson,
  prevLesson,
  nextLesson,
  onNavigate,
  completedLessons,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  loadingBookmark,
  uid
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Find active subject details
  const activeSubject = subjects.find(s => s.id === activeSubjectId);
  const activeUnit = activeLesson ? units.find(u => u.id === activeLesson.unitId) : null;

  // Calculate stats for Progress Card
  const totalCount = lessons.length;
  const completedCount = lessons.filter(l => completedLessons?.has(l.id)).length;
  const timeRemainingVal = totalCount > completedCount 
    ? `${(totalCount - completedCount) * 15} mins`
    : 'Completed!';

  return (
    <div className="premium-lesson-viewer-container">
      {/* Mobile Top Navigation Bar */}
      <div className="mobile-viewer-navbar">
        <button 
          className="mobile-menu-toggle-btn"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open Syllabus Menu"
        >
          <Menu size={20} />
          <span>Syllabus</span>
        </button>
        <span className="mobile-active-lesson-title">
          {activeLesson ? activeLesson.title : 'Loading Lesson...'}
        </span>
      </div>

      <div className="viewer-layout-grid">
        {/* Left Column: Syllabus Sidebar */}
        <LessonSidebar
          semesters={semesters}
          subjects={subjects}
          units={units}
          lessons={lessons}
          activeSemesterId={activeSemesterId}
          setActiveSemesterId={setActiveSemesterId}
          activeSubjectId={activeSubjectId}
          setActiveSubjectId={setActiveSubjectId}
          activeLessonId={activeLessonId}
          onLessonSelect={onLessonSelect}
          completedLessons={completedLessons}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Backdrop overlay for mobile drawer */}
        {mobileSidebarOpen && (
          <div 
            className="mobile-sidebar-backdrop"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        )}

        {/* Center Column: Interactive Reading Area */}
        <main className="viewer-center-content">
          <div className="content-readable-box">
            <LessonHeader
              subjectTitle={activeSubject?.title}
              unitTitle={activeUnit?.title}
              lessonTitle={activeLesson?.title}
            />

            <LessonMetadata
              difficulty={activeLesson?.difficulty}
              estimatedTime={activeLesson?.estimatedTime}
              xp={activeLesson?.xp}
              updatedAt={activeLesson?.updatedAt}
            />

            <hr className="lesson-divider" />

            <LessonContent lesson={activeLesson} />

            <hr className="lesson-divider" />

            {/* Bottom inline Navigation for long readers */}
            <LessonNavigation
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              onNavigate={onNavigate}
            />
          </div>
        </main>

        {/* Right Column: Sticky Action Control Board */}
        <aside className="viewer-right-sticky-panel">
          <div className="sticky-panel-card">
            <h4 className="sticky-panel-header">Learning Panel</h4>

            <LessonProgressCard
              completedCount={completedCount}
              totalCount={totalCount}
              timeRemaining={timeRemainingVal}
            />

            <div className="sticky-panel-actions">
              <MarkCompleteButton
                isCompleted={activeLesson ? completedLessons?.has(activeLesson.id) : false}
                onClick={onToggleComplete}
              />

              <BookmarkButton
                isBookmarked={isBookmarked}
                onClick={onToggleBookmark}
                isLoading={loadingBookmark}
              />

              <NotesShortcut
                uid={uid}
                lessonId={activeLessonId}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LessonViewer;
