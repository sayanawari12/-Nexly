import React, { memo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import useLazyVisible from './hooks/useLazyVisible';

/* Configure PDF.js worker */
if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    window.location.origin + `${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;
}

/**
 * LazyThumbnail — renders a small-scale PDF page ONLY when scrolled into view.
 *
 * Props:
 *   pdfUrl     {string}  — URL of the PDF to render from.
 *   pageNumber {number}  — 1-indexed page to render.
 *   width      {number}  — Rendered pixel width of the thumbnail canvas.
 */
const LazyThumbnail = memo(({ pdfUrl, pageNumber, width = 240 }) => {
  const { ref, isVisible } = useLazyVisible({ rootMargin: '300px' });

  return (
    <div className="qc-thumb-root" ref={ref}>
      {isVisible ? (
        <Document
          file={pdfUrl}
          loading={<div className="qc-thumb-skeleton"><div className="qc-thumb-shimmer" /></div>}
          error={<div className="qc-thumb-error">⚠️</div>}
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
          }}
        >
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<div className="qc-thumb-skeleton"><div className="qc-thumb-shimmer" /></div>}
            error={<div className="qc-thumb-error">⚠️</div>}
          />
        </Document>
      ) : (
        /* Placeholder — same dimensions as the rendered canvas */
        <div className="qc-thumb-skeleton">
          <div className="qc-thumb-shimmer" />
        </div>
      )}
    </div>
  );
});

LazyThumbnail.displayName = 'LazyThumbnail';

export default LazyThumbnail;
