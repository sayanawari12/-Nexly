import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, FileCode, Code, CheckCircle, 
  FileText, Award, User, CornerDownLeft, ArrowDown, ArrowUp, X 
} from 'lucide-react';
import '../../styles/SearchModal.css';

const searchDatabase = [
  { id: '1', title: 'History of C Language', desc: 'Explore the foundations and development of C.', category: 'Lessons', type: 'lesson', path: '/technologies/c' },
  { id: '2', title: 'C Compiling Process', desc: 'Understanding preprocessing, compilation, assembly, and linking.', category: 'Lessons', type: 'lesson', path: '/technologies/c' },
  { id: '3', title: 'C Programming Roadmap', desc: 'From basic loops to advanced dynamic memory management.', category: 'Roadmaps', type: 'roadmap', path: '/' },
  { id: '4', title: 'Hello World and Syntax', desc: 'Write and dissect your very first C program.', category: 'Programs', type: 'program', path: '/technologies/c' },
  { id: '5', title: 'Dynamic Pointer Swapping', desc: 'Pass pointers to modify variables in scope.', category: 'Programs', type: 'program', path: '/technologies/c' },
  { id: '6', title: 'Loops and Control Structures Quiz', desc: 'Test your understanding of nested loops and branches.', category: 'Quizzes', type: 'quiz', path: '/' },
  { id: '7', title: 'Semester 2 Lab Manual PDF', desc: 'Official lab assignment program codes and syllabus.', category: 'Notes & PDFs', type: 'note', path: '/' },
  { id: '8', title: 'Linked List Implementation Guides', desc: 'Step-by-step PDF detailing single and doubly linked lists.', category: 'Notes & PDFs', type: 'note', path: '/' },
  { id: '9', title: 'C Advanced Structures Certificate', desc: 'Official completion certificate for system structures.', category: 'Certificates', type: 'certificate', path: '/' },
  { id: '10', title: 'View Student Portfolio', desc: 'See your learning stats, streaks, and certificates.', category: 'Profile', type: 'profile', path: '/' }
];

const quickActions = [
  { id: 'q1', title: 'Continue Learning', desc: 'Jump back into your last active lesson.', category: 'Quick Actions', type: 'action', path: '/' },
  { id: 'q2', title: 'Open Dashboard', desc: 'View your general learning progress metrics.', category: 'Quick Actions', type: 'action', path: '/' },
  { id: 'q3', title: 'Open Certificates', desc: 'Access your earned department credentials.', category: 'Quick Actions', type: 'action', path: '/' },
  { id: 'q4', title: 'Open Bookmarks', desc: 'See your bookmarked programs and notes.', category: 'Quick Actions', type: 'action', path: '/' },
  { id: 'q5', title: 'Open Roadmaps', desc: 'Browse the interactive curriculum nodes.', category: 'Quick Actions', type: 'action', path: '/' }
];

const SearchModal = ({ isOpen, onClose, navigate }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef(null);
  const itemsRef = useRef([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bca_recent_searches');
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      } else {
        setRecentSearches([]);
      }
    } catch (e) {
      console.error("Failed to load recent searches", e);
      setRecentSearches([]);
    }
  }, [isOpen]);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clear query
  const handleClearQuery = () => {
    setQuery('');
    setSelectedIndex(0);
  };

  // Save to recent searches
  const saveRecentSearch = (term) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim().slice(0, 35);
    const updated = [cleanTerm, ...recentSearches.filter(t => t !== cleanTerm)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('bca_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Clear all recent searches
  const handleClearAllRecent = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('bca_recent_searches');
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Results
  const filteredResults = query.trim()
    ? searchDatabase.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Determine current active list of items
  let activeList = [];
  if (query.trim() === '') {
    // If empty query: show Recent Searches (mapped to action format) + Quick Actions
    const recentMapped = recentSearches.map((term, idx) => ({
      id: `r-${idx}`,
      title: term,
      desc: 'Recent search term',
      category: 'Recent Searches',
      type: 'recent',
      searchTerm: term
    }));
    activeList = [...recentMapped, ...quickActions];
  } else {
    activeList = filteredResults;
  }

  // Handle index out of bounds on list updates
  if (selectedIndex >= activeList.length && activeList.length > 0) {
    setSelectedIndex(0);
  }

  // Handle click on item
  const handleItemClick = (item) => {
    if (item.type === 'recent') {
      setQuery(item.searchTerm);
      setSelectedIndex(0);
      return;
    }

    // Save search query if it matches results
    if (query.trim()) {
      saveRecentSearch(query);
    }

    onClose();
    navigate(item.path);
  };

  // Keyboard navigation listeners
  const handleKeyDown = (e) => {
    if (activeList.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % activeList.length;
      setSelectedIndex(nextIndex);
      itemsRef.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (selectedIndex - 1 + activeList.length) % activeList.length;
      setSelectedIndex(prevIndex);
      itemsRef.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleItemClick(activeList[selectedIndex]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % activeList.length;
      setSelectedIndex(nextIndex);
      itemsRef.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
    }
  };

  // Group items by category to render
  const groupedItems = activeList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Map item IDs to their flat index for scrolling and highlight selection
  let flatIndexCounter = 0;
  const itemIndexMap = {};
  activeList.forEach((item, index) => {
    itemIndexMap[item.id] = index;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'lesson': return <BookOpen size={16} />;
      case 'roadmap': return <FileCode size={16} />;
      case 'program': return <Code size={16} />;
      case 'quiz': return <CheckCircle size={16} />;
      case 'note': return <FileText size={16} />;
      case 'certificate': return <Award size={16} />;
      case 'profile': return <User size={16} />;
      case 'recent': return <Search size={16} style={{ color: 'rgba(255,255,255,0.25)' }} />;
      default: return <CornerDownLeft size={16} />;
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Search Input Header */}
        <div className="search-modal-header">
          <Search size={20} style={{ color: 'var(--primary-purple)' }} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search lessons, roadmaps, programs, quizzes..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            className="search-modal-input"
          />
          {query && (
            <button 
              onClick={handleClearQuery}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          )}
          <div className="search-modal-shortcut-hint">
            <span className="search-modal-kbd">ESC</span>
          </div>
        </div>

        {/* Modal Results List Body */}
        <div className="search-modal-body">
          {activeList.length > 0 ? (
            Object.keys(groupedItems).map((category, groupIdx) => (
              <div key={category} className="search-results-group">
                {category === 'Recent Searches' ? (
                  <div className="search-recent-header">
                    <span className="search-results-section-header" style={{ margin: 0 }}>Recent Searches</span>
                    <button className="search-recent-clear-btn" onClick={handleClearAllRecent}>Clear Recents</button>
                  </div>
                ) : (
                  <div className="search-results-section-header">{category}</div>
                )}
                
                {groupedItems[category].map((item) => {
                  const flatIndex = itemIndexMap[item.id];
                  const isSelected = selectedIndex === flatIndex;

                  return (
                    <button
                      key={item.id}
                      ref={el => itemsRef.current[flatIndex] = el}
                      className={`search-result-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                    >
                      <div className="search-result-item-content">
                        <span className="search-result-icon-wrapper">
                          {getIcon(item.type)}
                        </span>
                        <div className="search-result-details">
                          <span className="search-result-title">{item.title}</span>
                          <span className="search-result-desc">{item.desc}</span>
                        </div>
                      </div>
                      <div className="search-result-meta">
                        <span className="search-result-badge">{item.type}</span>
                        <span className="search-result-enter-hint">
                          <CornerDownLeft size={10} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            /* Empty State Suggestion */
            <div className="search-empty-state">
              <div className="search-empty-title">No results found for "{query}"</div>
              <div className="search-empty-desc">Check the spelling or try selecting one of these categories instead:</div>
              <div className="search-empty-actions">
                <button className="search-empty-btn" onClick={() => { setQuery('Roadmap'); setSelectedIndex(0); }}>🗺 Roadmaps</button>
                <button className="search-empty-btn" onClick={() => { setQuery('History'); setSelectedIndex(0); }}>📚 Lessons</button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Search Footer Guidelines */}
        <div className="search-modal-footer">
          <div className="search-footer-tip">
            <kbd className="search-footer-kbd"><ArrowUp size={8} /></kbd>
            <kbd className="search-footer-kbd"><ArrowDown size={8} /></kbd>
            <span>Navigate</span>
          </div>
          <div className="search-footer-tip">
            <kbd className="search-footer-kbd">↵ Enter</kbd>
            <span>Select</span>
          </div>
          <div className="search-footer-tip">
            <kbd className="search-footer-kbd">ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
