import React from 'react';
import { Bookmark, Loader2 } from 'lucide-react';

const BookmarkButton = ({ isBookmarked, onClick, isLoading }) => {
  return (
    <button 
      className={`sticky-panel-action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={isLoading}
      aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
      )}
      <span>
        {isLoading 
          ? 'Saving...' 
          : isBookmarked 
            ? 'Bookmarked' 
            : 'Bookmark Lesson'}
      </span>
    </button>
  );
};

export default BookmarkButton;
