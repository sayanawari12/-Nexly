import React, { useState, useEffect, useRef } from 'react';
import { FileText, Save, Check, Trash2, Loader2 } from 'lucide-react';
import { getUserNote, saveUserNote } from '../../services/lesson/lessonService';

const NotesShortcut = ({ uid, lessonId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notesText, setNotesText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const saveTimeoutRef = useRef(null);
  const textRef = useRef(notesText);

  // Sync text ref to avoid closure issues in beforeunload
  useEffect(() => {
    textRef.current = notesText;
  }, [notesText]);

  // Fetch note when lesson changes
  useEffect(() => {
    if (!uid || !lessonId) return;

    const loadNote = async () => {
      setLoading(true);
      try {
        const noteContent = await getUserNote(uid, lessonId);
        setNotesText(noteContent || '');
        setSaveStatus('');
      } catch (err) {
        console.error('Error loading user notes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [uid, lessonId]);

  // Trigger save operation
  const triggerSave = async (textToSave) => {
    if (!uid || !lessonId) return;
    setIsSaving(true);
    setSaveStatus('Saving...');
    try {
      await saveUserNote(uid, lessonId, textToSave);
      setSaveStatus('Saved');
    } catch (err) {
      console.error('Autosave notes failed:', err);
      setSaveStatus('Error');
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced typing handler
  const handleTextChange = (e) => {
    const val = e.target.value;
    setNotesText(val);
    setSaveStatus('Saving...');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      triggerSave(val);
    }, 1000); // 1-second debounce delay
  };

  // Auto-save on blur
  const handleBlur = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    triggerSave(notesText);
  };

  // Save before unload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (saveStatus === 'Saving...') {
        saveUserNote(uid, lessonId, textRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [uid, lessonId, saveStatus]);

  // Delete note from Firestore
  const handleDelete = async () => {
    if (!uid || !lessonId || !notesText.trim()) return;
    if (window.confirm('Are you sure you want to delete this note?')) {
      setLoading(true);
      setSaveStatus('Saving...');
      try {
        const { deleteNotes } = await import('../../services/notes/notesService');
        await deleteNotes(uid, lessonId);
        setNotesText('');
        setSaveStatus('Saved');
      } catch (err) {
        console.error('Delete notes failed:', err);
        setSaveStatus('Error');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusDisplayClass = () => {
    if (saveStatus === 'Saving...') return 'status-saving';
    if (saveStatus === 'Saved') return 'status-saved';
    if (saveStatus === 'Error') return 'status-error';
    return '';
  };

  return (
    <div className={`sticky-panel-notes-wrapper ${isOpen ? 'open' : ''}`}>
      <button 
        className="sticky-panel-action-btn notes-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Personal Notes"
      >
        <FileText size={18} />
        <span>Personal Notes</span>
        {notesText.trim().length > 0 && <span className="notes-indicator">●</span>}
      </button>

      {isOpen && (
        <div className="notes-editor-container">
          <textarea
            className="notes-textarea"
            value={notesText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            placeholder="Type your study notes here... (auto-saves on typing)"
            disabled={loading}
          />
          <div className="notes-editor-footer">
            <span className={`save-status-text ${getStatusDisplayClass()}`}>
              {saveStatus}
            </span>
            <div className="notes-footer-actions">
              <span className="char-counter">
                {notesText.length} chars
              </span>
              {notesText.trim().length > 0 && (
                <button 
                  className="notes-delete-btn" 
                  onClick={handleDelete}
                  disabled={loading || isSaving}
                  title="Delete Note"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesShortcut;
