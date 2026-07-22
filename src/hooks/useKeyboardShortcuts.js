import { useEffect } from 'react';

/**
 * Custom hook to register global window key binds.
 */
export const useKeyboardShortcuts = ({ onRun, onSave }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {

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
