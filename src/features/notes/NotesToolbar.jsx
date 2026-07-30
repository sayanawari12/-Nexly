import React, { memo } from 'react';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Maximize2, Minimize2, AlignJustify, RotateCcw
} from 'lucide-react';

/**
 * NotesToolbar — The fixed top toolbar for the PDF viewer.
 * All actions are passed in as props — no internal state.
 */
const NotesToolbar = memo(({
  subjectTitle,
  subjectCode,
  currentPage,
  numPages,
  scale,
  fitWidth,
  isFullscreen,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFitWidth,
  onToggleFullscreen,
  onGoToPage,
}) => {

  const handlePageInput = (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) onGoToPage(val);
    }
  };

  return (
    <div className="nv-toolbar">
      {/* Left — Subject Info */}
      <div className="nv-toolbar-left">
        <span className="nv-toolbar-badge">{subjectCode}</span>
        <h1 className="nv-toolbar-title">{subjectTitle} — Notes</h1>
      </div>

      {/* Center — Page Navigation */}
      <div className="nv-toolbar-center">
        <button
          className="nv-ctrl-btn"
          onClick={onPrev}
          disabled={currentPage <= 1}
          title="Previous Page (←)"
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="nv-page-indicator">
          <input
            type="number"
            className="nv-page-input"
            defaultValue={currentPage}
            key={currentPage}
            min={1}
            max={numPages || 1}
            onKeyDown={handlePageInput}
            aria-label="Current page number"
          />
          <span className="nv-page-sep">/</span>
          <span className="nv-page-total">{numPages ?? '—'}</span>
        </div>

        <button
          className="nv-ctrl-btn"
          onClick={onNext}
          disabled={!numPages || currentPage >= numPages}
          title="Next Page (→)"
          aria-label="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Right — View Controls */}
      <div className="nv-toolbar-right">
        <button
          className="nv-ctrl-btn"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          title="Zoom Out (−)"
          aria-label="Zoom Out"
        >
          <ZoomOut size={17} />
        </button>

        <button
          className="nv-ctrl-btn nv-zoom-label"
          onClick={onResetZoom}
          title="Reset Zoom (0)"
          aria-label="Reset Zoom"
        >
          {fitWidth ? 'Fit' : `${Math.round(scale * 100)}%`}
        </button>

        <button
          className="nv-ctrl-btn"
          onClick={onZoomIn}
          disabled={scale >= 3.0}
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <ZoomIn size={17} />
        </button>

        <div className="nv-toolbar-divider" />

        <button
          className={`nv-ctrl-btn ${fitWidth ? 'nv-ctrl-active' : ''}`}
          onClick={onToggleFitWidth}
          title="Fit Width"
          aria-label="Fit Width"
        >
          <AlignJustify size={17} />
        </button>

        <button
          className="nv-ctrl-btn"
          onClick={onToggleFullscreen}
          title="Toggle Fullscreen (F)"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      </div>
    </div>
  );
});

NotesToolbar.displayName = 'NotesToolbar';

export default NotesToolbar;
