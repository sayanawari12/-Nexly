import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import QuestionCard from './QuestionCard';
import './styles/QuestionsPage.css';

/**
 * QuestionsPage — Searchable grid of question cards.
 *
 * Props:
 *   subjectTitle    {string}  e.g. "Data Structures"
 *   subjectCode     {string}  e.g. "BCA-202"
 *   semesterLabel   {string}  e.g. "Semester 2"
 *   pdfUrl          {string}  Public URL of the PDF
 *   totalQuestions  {number}  Total pages / questions
 *   viewerBasePath  {string}  Route prefix for individual question viewer
 *   backPath        {string}  Route to navigate back to
 */
const QuestionsPage = ({
  subjectTitle = 'Data Structures',
  subjectCode = 'BCA-202',
  semesterLabel = 'Semester 2',
  pdfUrl,
  totalQuestions = 55,
  viewerBasePath = '/curriculum/semester-2/data-structures/questions',
  backPath = '/curriculum/semester-2/data-structures',
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  /* Build the question list — numbers 1..totalQuestions */
  const allQuestions = useMemo(
    () => Array.from({ length: totalQuestions }, (_, i) => i + 1),
    [totalQuestions]
  );

  /* Filter by search — supports "Q01", "01", "1", "question 1" etc. */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allQuestions;
    return allQuestions.filter((n) => {
      const padded = String(n).padStart(String(totalQuestions).length, '0');
      return (
        String(n).includes(q) ||
        padded.includes(q) ||
        `q${padded}`.includes(q) ||
        `question ${n}`.includes(q) ||
        `question ${padded}`.includes(q)
      );
    });
  }, [search, allQuestions, totalQuestions]);

  const handleCardClick = useCallback((questionNumber) => {
    navigate(`${viewerBasePath}/${questionNumber}`);
    window.scrollTo(0, 0);
  }, [navigate, viewerBasePath]);

  /* Stagger container variants */
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
  };

  return (
    <StudentLayout>
      <div className="qp-root">
        <div className="qp-inner">

          {/* ── Breadcrumb ── */}
          <nav className="qp-breadcrumb" aria-label="Breadcrumb">
            <span className="qp-crumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
            <ChevronRight size={12} className="qp-crumb-sep" />
            <span className="qp-crumb-link" onClick={() => navigate('/dashboard')}>{semesterLabel}</span>
            <ChevronRight size={12} className="qp-crumb-sep" />
            <span className="qp-crumb-link" onClick={() => navigate(backPath)}>{subjectTitle}</span>
            <ChevronRight size={12} className="qp-crumb-sep" />
            <span className="qp-crumb-active">Questions</span>
          </nav>

          {/* ── Page Header ── */}
          <div className="qp-header">
            <div className="qp-title-group">
              <div className="qp-subject-badge">
                <BookOpen size={12} />
                {subjectCode} · {semesterLabel}
              </div>
              <h1 className="qp-page-title">Questions</h1>
              <p className="qp-page-subtitle">
                {totalQuestions} questions · Each card is one PDF page from your notes
              </p>
            </div>

            {/* Search */}
            <div className="qp-search-wrap">
              <Search size={15} className="qp-search-icon" />
              <input
                id="qp-search-input"
                type="text"
                className="qp-search-input"
                placeholder={`Search questions…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search questions"
                autoComplete="off"
              />
            </div>
          </div>

          {/* ── Results meta ── */}
          <div className="qp-results-meta">
            <span className="qp-results-dot" />
            {filtered.length === totalQuestions
              ? `Showing all ${totalQuestions} questions`
              : `${filtered.length} of ${totalQuestions} questions`}
          </div>

          {/* ── Grid ── */}
          {filtered.length > 0 ? (
            <motion.div
              className="qp-grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((n) => (
                <QuestionCard
                  key={n}
                  questionNumber={n}
                  totalQuestions={totalQuestions}
                  pdfUrl={pdfUrl}
                  onClick={() => handleCardClick(n)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="qp-no-results">
              <div className="qp-no-results-icon">🔍</div>
              <div className="qp-no-results-text">
                No questions match "<strong>{search}</strong>"
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default QuestionsPage;
