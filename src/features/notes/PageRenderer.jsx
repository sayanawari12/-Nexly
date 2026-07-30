import React, { memo } from 'react';
import { Page } from 'react-pdf';

/**
 * PageRenderer — Renders a single PDF page with a themed wrapper.
 * Memoized to prevent unnecessary re-renders when only unrelated state changes.
 */
const PageRenderer = memo(({ pageNumber, scale, fitWidth, containerWidth, pageRef }) => {
  const resolvedWidth = fitWidth && containerWidth > 0 ? containerWidth - 48 : undefined;

  return (
    <div
      className="nv-page-wrapper"
      ref={pageRef}
      data-page={pageNumber}
    >
      {/* Page Number Badge */}
      <div className="nv-page-number-badge">
        <span>{pageNumber}</span>
      </div>

      {/* Actual PDF Page */}
      <Page
        pageNumber={pageNumber}
        scale={fitWidth ? undefined : scale}
        width={resolvedWidth}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        loading={
          <div className="nv-page-skeleton">
            <div className="nv-skeleton-shimmer" />
          </div>
        }
        error={
          <div className="nv-page-error">
            <span>⚠️ Page {pageNumber} failed to load.</span>
          </div>
        }
      />
    </div>
  );
});

PageRenderer.displayName = 'PageRenderer';

export default PageRenderer;
