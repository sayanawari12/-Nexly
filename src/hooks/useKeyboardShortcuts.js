import { useEffect } from 'react';

/**
 * Custom hook to register global window key binds.
 * Includes layout target gating so Monaco command overrides take precedence.
 */
export const useKeyboardShortcuts = ({ onRun, onSave }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Yield precedence to Monaco Editor commands if key occurs inside edit zone
      const activeEl = document.activeElement;
      const isFocusedInMonaco = activeEl && (
        activeEl.classList.contains('inputarea') || 
        activeEl.closest('.monaco-editor')
      );

      if (isFocusedInMonaco) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (onRun) onRun();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (onSave) onSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRun, onSave]);
};
