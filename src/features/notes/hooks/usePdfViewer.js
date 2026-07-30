import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * usePdfViewer — Centralized state management for the Notes Viewer.
 * Encapsulates: page navigation, zoom, fullscreen, keyboard shortcuts.
 */
const usePdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [fitWidth, setFitWidth] = useState(true);
  const containerRef = useRef(null);
  const pageRefs = useRef([]);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3.0;
  const SCALE_STEP = 0.15;

  /* ─── Document load handlers ─── */
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setLoadError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    setLoadError('Could not load the PDF. Please try refreshing the page.');
    setIsLoading(false);
    console.error('PDF load error:', error);
  }, []);

  /* ─── Page navigation ─── */
  const goToPage = useCallback((page) => {
    if (!numPages) return;
    const target = Math.max(1, Math.min(page, numPages));
    setCurrentPage(target);
    const el = pageRefs.current[target - 1];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [numPages]);

  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);

  /* ─── Zoom controls ─── */
  const zoomIn = useCallback(() => {
    setFitWidth(false);
    setScale(prev => Math.min(MAX_SCALE, parseFloat((prev + SCALE_STEP).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setFitWidth(false);
    setScale(prev => Math.max(MIN_SCALE, parseFloat((prev - SCALE_STEP).toFixed(2))));
  }, []);

  const resetZoom = useCallback(() => {
    setFitWidth(false);
    setScale(1.2);
  }, []);

  const toggleFitWidth = useCallback(() => {
    setFitWidth(prev => !prev);
  }, []);

  /* ─── Fullscreen ─── */
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  /* ─── Keyboard shortcuts ─── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextPage();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevPage();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextPage, prevPage, zoomIn, zoomOut, resetZoom, toggleFullscreen]);

  /* ─── Intersection Observer to update currentPage on scroll ─── */
  useEffect(() => {
    if (!numPages) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = pageRefs.current.indexOf(entry.target);
            if (idx !== -1) setCurrentPage(idx + 1);
          }
        });
      },
      { threshold: 0.4 }
    );
    pageRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [numPages]);

  return {
    numPages,
    currentPage,
    scale,
    fitWidth,
    isFullscreen,
    isLoading,
    loadError,
    containerRef,
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
    setCurrentPage,
  };
};

export default usePdfViewer;
