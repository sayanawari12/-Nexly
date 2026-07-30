import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Maximize2, Minimize2, AlignJustify, ArrowLeft, RotateCcw,
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import { formatQuestionLabel } from './utils/questionsConfig';
import './styles/QuestionsPage.css';

/* Reuse worker already copied to /public */
if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.15;

/**
 * QuestionViewer — shows ONLY a single PDF page with full navigation.
 *
 * Props:
 *   questionNumber  {number}  Current 1-indexed question/page to display.
 *   totalQuestions  {number}  Total page count.
 *   pdfUrl          {string}  Public URL of the PDF.
 *   subjectTitle    {string}  Display name of the subject.
 *   subjectCode     {string}  E.g. "BCA-202".
 *   listPath        {string}  Route back to the Questions list page.
 *   viewerBasePath  {string}  Route base for navigating prev/next questions.
 */
const QuestionViewer = ({
  questionNumber,
  totalQuestions,
  pdfUrl,
  subjectTitle = 'Data Structures',
  subjectCode = 'BCA-202',
  listPath = '/curriculum/semester-2/data-structures/questions',
  viewerBasePath = '/curriculum/semester-2/data-structures/questions',
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1.2);
  const [fitWidth, setFitWidth] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  /* Measure container for fit-width mode */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* Fullscreen listener */
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  /* Reset loading state when question changes */
  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
  }, [questionNumber]);

  /* Navigation helpers */
  const goPrev = useCallback(() => {
    if (questionNumber > 1) {
      navigate(`${viewerBasePath}/${questionNumber - 1}`);
      window.scrollTo(0, 0);
    }
  }, [questionNumber, navigate, viewerBasePath]);

  const goNext = useCallback(() => {
    if (questionNumber < totalQuestions) {
      navigate(`${viewerBasePath}/${questionNumber + 1}`);
      window.scrollTo(0, 0);
    }
  }, [questionNumber, totalQuestions, navigate, viewerBasePath]);

  /* Zoom helpers */
  const zoomIn = useCallback(() => {
    setFitWidth(false);
    setScale(p => Math.min(MAX_SCALE, parseFloat((p + SCALE_STEP).toFixed(2))));
  }, []);
  const zoomOut = useCallback(() => {
    setFitWidth(false);
    setScale(p => Math.max(MIN_SCALE, parseFloat((p - SCALE_STEP).toFixed(2))));
  }, []);
  const resetZoom = useCallback(() => { setFitWidth(false); setScale(1.2); }, []);
  const toggleFitWidth = useCallback(() => setFitWidth(p => !p), []);

  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  /* Keyboard shortcuts */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      switch (e.key) {
        case 'ArrowLeft':  case 'ArrowUp':   e.preventDefault(); goPrev(); break;
        case 'ArrowRight': case 'ArrowDown': e.preventDefault(); goNext(); break;
        case '+': case '=': e.preventDefault(); zoomIn(); break;
        case '-':           e.preventDefault(); zoomOut(); break;
        case '0':           e.preventDefault(); resetZoom(); break;
        case 'f': case 'F': toggleFullscreen(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, zoomIn, zoomOut, resetZoom, toggleFullscreen]);

  const label = formatQuestionLabel(questionNumber, totalQuestions);
  const progress = Math.round((questionNumber / totalQuestions) * 100);
  const resolvedWidth = fitWidth && containerWidth > 0 ? containerWidth - 48 : undefined;

  return (
    <StudentLayout>
      <div className="qv-root">

        {/* ── Toolbar ── */}
        <div className="qv-toolbar">

          {/* Left */}
          <div className="qv-toolbar-left">
            <button
              className="qv-back-btn"
              onClick={() => navigate(listPath)}
              aria-label="Back to questions list"
            >
              <ArrowLeft size={15} />
              <span>All Questions</span>
            </button>
            <span className="qv-toolbar-badge">{label}</span>
            <h1 className="qv-toolbar-title">{subjectTitle} · {subjectCode}</h1>
          </div>

          {/* Center — Prev / Next */}
          <div className="qv-toolbar-center">
            <button
              className="qv-nav-btn"
              onClick={goPrev}
              disabled={questionNumber <= 1}
              aria-label="Previous question"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', minWidth: 60, textAlign: 'center' }}>
              {questionNumber} / {totalQuestions}
            </span>
            <button
              className="qv-nav-btn"
              onClick={goNext}
              disabled={questionNumber >= totalQuestions}
              aria-label="Next question"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right — Zoom + Fullscreen */}
          <div className="qv-toolbar-right">
            <button className="qv-ctrl-btn" onClick={zoomOut} disabled={scale <= MIN_SCALE} title="Zoom Out (−)" aria-label="Zoom out">
              <ZoomOut size={16} />
            </button>
            <button className="qv-ctrl-btn qv-zoom-label" onClick={resetZoom} title="Reset zoom (0)" aria-label="Reset zoom">
              {fitWidth ? 'Fit' : `${Math.round(scale * 100)}%`}
            </button>
            <button className="qv-ctrl-btn" onClick={zoomIn} disabled={scale >= MAX_SCALE} title="Zoom In (+)" aria-label="Zoom in">
              <ZoomIn size={16} />
            </button>
            <div className="qv-divider" />
            <button
              className={`qv-ctrl-btn ${fitWidth ? 'active' : ''}`}
              onClick={toggleFitWidth}
              title="Fit Width"
              aria-label="Fit Width"
            >
              <AlignJustify size={16} />
            </button>
            <button
              className="qv-ctrl-btn"
              onClick={toggleFullscreen}
              title="Fullscreen (F)"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* ── Reading Progress Bar ── */}
        <div className="qv-progress-track">
          <div className="qv-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* ── Page Counter Strip ── */}
        <div className="qv-page-counter">
          Question <strong>{label}</strong> &nbsp;·&nbsp; Page {questionNumber} of {totalQuestions}
        </div>

        {/* ── PDF Scroll Area ── */}
        <div className="qv-scroll-area">

          {/* Loading state */}
          {isLoading && !loadError && (
            <div className="qv-loading">
              <div className="qv-loading-spinner" />
              <div className="qv-loading-text">Loading {label}…</div>
            </div>
          )}

          {/* Error state */}
          {loadError && (
            <div className="qv-error">
              <div className="qv-error-icon">📄</div>
              <div className="qv-error-title">Could not load this question</div>
              <div className="qv-error-desc">{loadError}</div>
              <button className="qv-retry-btn" onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {/* PDF Document — loads only the one page needed */}
          <div className="qv-page-container" ref={containerRef}>
            <Document
              file={pdfUrl}
              onLoadSuccess={() => setIsLoading(false)}
              onLoadError={(e) => {
                setLoadError('PDF could not be loaded. Please refresh.');
                setIsLoading(false);
              }}
              loading={null}
              error={null}
              options={{
                cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                cMapPacked: true,
              }}
            >
              <div className="qv-page-wrapper">
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <Page
                    pageNumber={questionNumber}
                    scale={fitWidth ? undefined : scale}
                    width={resolvedWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onRenderSuccess={() => setIsLoading(false)}
                    loading={<div style={{ height: 400 }} />}
                    error={<div className="qv-error-icon">⚠️</div>}
                  />
                </motion.div>
              </div>
            </Document>
          </div>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <div className="qv-bottom-nav">
          <button
            className="qv-nav-btn"
            onClick={goPrev}
            disabled={questionNumber <= 1}
            aria-label="Previous question"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div style={{ textAlign: 'center' }}>
            <div className="qv-bottom-info">
              <strong>{label}</strong> of {totalQuestions} questions
            </div>
            <div className="qv-kbd-hint">
              <span className="qv-kbd-item"><kbd className="qv-kbd-key">←</kbd><kbd className="qv-kbd-key">→</kbd><span>Navigate</span></span>
              <span className="qv-kbd-item"><kbd className="qv-kbd-key">+</kbd><kbd className="qv-kbd-key">−</kbd><span>Zoom</span></span>
              <span className="qv-kbd-item"><kbd className="qv-kbd-key">F</kbd><span>Fullscreen</span></span>
            </div>
          </div>

          <button
            className="qv-nav-btn"
            onClick={goNext}
            disabled={questionNumber >= totalQuestions}
            aria-label="Next question"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </StudentLayout>
  );
};

export default QuestionViewer;
