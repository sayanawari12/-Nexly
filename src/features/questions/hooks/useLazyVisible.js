import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useLazyVisible — fires when the attached ref enters the viewport.
 * Used to defer thumbnail rendering until the card is actually scrolled into view.
 *
 * @param {object}  options
 * @param {string}  options.rootMargin  CSS margin for the intersection root (default "200px")
 * @param {number}  options.threshold   0–1 fraction of the element that must be visible
 * @returns {{ ref: RefCallback, isVisible: boolean }}
 */
const useLazyVisible = ({ rootMargin = '200px', threshold = 0.01 } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const elementRef = useRef(null);

  const ref = useCallback((node) => {
    // Disconnect any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (!node) return;

    elementRef.current = node;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing — thumbnail never needs to unload
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, [rootMargin, threshold]);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useLazyVisible;
