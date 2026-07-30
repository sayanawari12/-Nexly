import React, { useCallback, useRef, useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import StudentLayout from '../../layouts/StudentLayout';
import NotesToolbar from './NotesToolbar';
import PageRenderer from './PageRenderer';
import usePdfViewer from './hooks/usePdfViewer';
import './styles/NotesViewer.css';

/* ── Configure PDF.js worker (supports local /public asset with CDN fallback) ── */
pdfjs.GlobalWorkerOptions.workerSrc =
  window.location.origin + `${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;

/**
 * NotesViewer — Reusable, production-ready PDF reader component.
 *
 * Props:
 *   pdfUrl       {string}  — Absolute or relative URL to the PDF file.
 *   subjectTitle {string}  — Display title shown in the toolbar.
 *   subjectCode  {string}  — Subject code shown as a badge.
 *
 * To use for a different subject, simply pass a different pdfUrl.
 */
const NotesViewer = ({ pdfUrl, subjectTitle = 'Notes', subjectCode = '' }) => {
  const scrollAreaRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  /* Measure container width for Fit Width mode */
  const measureContainer = useCallback((node) => {
    if (node) {
      containerRef.current = node;
      const ro = new ResizeObserver(([entry]) => {
        setContainerWidth(entry.contentRect.width);
      });
      ro.observe(node);
    }
  }, []);

  const {
    numPages,
    currentPage,
    scale,
    fitWidth,
    isFullscreen,
    isLoading,
    loadError,
    pageRefs,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    goToPage,
    prevPage,
    nextPage,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFitWidth,
    toggleFullscreen,
  } = usePdfViewer();

  const progressPercent = numPages ? Math.round((currentPage / numPages) * 100) : 0;

  const shortcuts = [
    { keys: ['←', '→'], label: 'Navigate pages' },
    { keys: ['+', '−'], label: 'Zoom' },
    { keys: ['F'], label: 'Fullscreen' },
    { keys: ['0'], label: 'Reset zoom' },
  ];

  return (
    <StudentLayout>
      <div className="nv-root" ref={containerRef}>

        {/* ── Toolbar ── */}
        <NotesToolbar
          subjectTitle={subjectTitle}
          subjectCode={subjectCode}
          currentPage={currentPage}
          numPages={numPages}
          scale={scale}
          fitWidth={fitWidth}
          isFullscreen={isFullscreen}
          onPrev={prevPage}
          onNext={nextPage}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
          onToggleFitWidth={toggleFitWidth}
          onToggleFullscreen={toggleFullscreen}
          onGoToPage={goToPage}
        />

        {/* ── Progress Bar ── */}
        {numPages && (
          <div className="nv-progress-bar-track">
            <div
              className="nv-progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* ── Scroll Area ── */}
        <div className="nv-scroll-area" ref={scrollAreaRef}>

          {/* Loading State */}
          {isLoading && !loadError && (
            <div className="nv-loading-overlay">
              <div className="nv-loading-spinner" />
              <div>
                <div className="nv-loading-title">{subjectTitle}</div>
                <div className="nv-loading-text">Loading notes, please wait…</div>
              </div>
            </div>
          )}

          {/* Error State */}
          {loadError && (
            <div className="nv-error-state">
              <div className="nv-error-icon">📄</div>
              <div className="nv-error-title">Could not load notes</div>
              <div className="nv-error-desc">{loadError}</div>
              <button
                className="nv-error-retry"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {/* PDF Document */}
          <div ref={measureContainer}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              error={null}
              options={{
                cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                cMapPacked: true,
              }}
            >
              {numPages && (
                <div className="nv-pages-list">
                  {Array.from({ length: numPages }, (_, i) => (
                    <PageRenderer
                      key={`page-${i + 1}`}
                      pageNumber={i + 1}
                      scale={scale}
                      fitWidth={fitWidth}
                      containerWidth={containerWidth}
                      pageRef={(el) => { pageRefs.current[i] = el; }}
                    />
                  ))}
                </div>
              )}
            </Document>
          </div>
        </div>

        {/* ── Keyboard Shortcuts Footer ── */}
        <div className="nv-shortcuts-bar">
          {shortcuts.map((s, i) => (
            <div key={i} className="nv-shortcut-item">
              {s.keys.map(k => (
                <kbd key={k} className="nv-shortcut-key">{k}</kbd>
              ))}
              <span>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </StudentLayout>
  );
};

export default NotesViewer;
