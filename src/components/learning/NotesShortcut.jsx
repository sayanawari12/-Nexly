import React, { useState, useEffect } from 'react';
import { FileText, Save, Check } from 'lucide-react';
import { getUserNote, saveUserNote } from '../../services/lesson/lessonService';

const NotesShortcut = ({ uid, lessonId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notesText, setNotesText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch note when lesson changes or when panel is opened
  useEffect(() => {
    if (!uid || !lessonId) return;

    const loadNote = async () => {
      setLoading(true);
      try {
        const noteContent = await getUserNote(uid, lessonId);
        setNotesText(noteContent || '');
      } catch (err) {
        console.error('Error loading user notes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [uid, lessonId]);

  const handleSave = async () => {
    if (!uid || !lessonId) return;
    setIsSaving(true);
    setSaveStatus('Saving...');
    try {
      await saveUserNote(uid, lessonId, notesText);
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      console.error('Error saving user notes:', err);
      setSaveStatus('Failed');
    } finally {
      setIsSaving(false);
    }
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
            onChange={(e) => setNotesText(e.target.value)}
            onBlur={handleSave}
            placeholder="Type your study notes here... (auto-saves on blur)"
            disabled={loading}
          />
          <div className="notes-editor-footer">
            <span className="save-status-text">{saveStatus}</span>
            <button 
              className="notes-save-btn" 
              onClick={handleSave}
              disabled={isSaving || loading}
            >
              {saveStatus === 'Saved!' ? <Check size={12} /> : <Save size={12} />}
              <span>Save</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesShortcut;
