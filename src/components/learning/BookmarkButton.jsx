import React from 'react';
import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ isBookmarked, onClick }) => {
  return (
    <button 
      className={`sticky-panel-action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={onClick}
      aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
    >
      <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Lesson'}</span>
    </button>
  );
};

export default BookmarkButton;
