import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, FileCode, Code, CheckCircle, 
  FileText, Award, User, CornerDownLeft, ArrowDown, ArrowUp, X,
  Compass, Flame, Clock, Sparkles, Download, Briefcase, ChevronRight
} from 'lucide-react';
import { searchPlatformIndex } from '../../services/searchService';
import '../../styles/SearchModal.css';

const quickNavigationShortcuts = [
  { id: 'qn-1', title: 'Continue Learning: C Pointers', desc: 'Step 14: Pointers & Address Arithmetic', category: 'Continue Learning', type: 'technology', path: '/technologies/c' },
  { id: 'qn-2', title: 'Open Student Dashboard', desc: 'View overall study metrics and progress analytics.', category: 'Quick Navigation', type: 'navigation', path: '/dashboard' },
  { id: 'qn-3', title: 'Explore Interactive Roadmaps', desc: 'Visual step-by-step curriculum node trees.', category: 'Quick Navigation', type: 'navigation', path: '/roadmap' },
  { id: 'qn-4', title: 'Browse Study Resources', desc: 'Lab manuals, syllabus, and PYQ PDFs.', category: 'Quick Navigation', type: 'navigation', path: '/resources' }
];

const popularTopics = [
  { id: 'pt-1', label: 'Pointers & Memory', query: 'pointers' },
  { id: 'pt-2', label: 'C++ STL Vectors', query: 'stl' },
  { id: 'pt-3', label: 'Operating System Kernel', query: 'operating system' },
  { id: 'pt-4', label: 'SQL DBMS Queries', query: 'dbms' },
  { id: 'pt-5', label: 'Lab Manual PDF', query: 'lab manual' }
];

export const SearchModal = ({ isOpen, onClose, navigate }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef(null);
  const itemsRef = useRef([]);

  // Debounce search query input (220ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 220);
    return () => clearTimeout(handler);
  }, [query]);

  // Load recent searches from localStorage on mount/open
  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Keyboard listener for Ctrl+K / Cmd+K and ESC
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
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
    setDebouncedQuery('');
    setSelectedIndex(0);
    if (inputRef.current) inputRef.current.focus();
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

  // Execute intelligent search engine query
  const filteredResults = searchPlatformIndex(debouncedQuery);

  // Determine current active list of items
  let activeList = [];
  if (debouncedQuery.trim() === '') {
    const recentMapped = recentSearches.map((term, idx) => ({
      id: `recent-${idx}`,
      title: term,
      desc: 'Recent search history term',
      category: 'Recent Searches',
      type: 'recent',
      searchTerm: term
    }));
    activeList = [...recentMapped, ...quickNavigationShortcuts];
  } else {
    activeList = filteredResults;
  }

  // Bound selected index
  if (selectedIndex >= activeList.length && activeList.length > 0) {
    setSelectedIndex(0);
  }

  // Handle item selection/navigation
  const handleItemClick = (item) => {
    if (item.type === 'recent') {
      setQuery(item.searchTerm);
      setDebouncedQuery(item.searchTerm);
      setSelectedIndex(0);
      return;
    }

    if (query.trim()) {
      saveRecentSearch(query);
    }

    onClose();
    if (item.path) {
      navigate(item.path);
    }
  };

  // Keyboard navigation listener (ArrowUp, ArrowDown, Enter, Tab)
  const handleKeyDown = (e) => {
    if (activeList.length === 0) return;

    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % activeList.length;
      setSelectedIndex(nextIndex);
      itemsRef.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      const prevIndex = (selectedIndex - 1 + activeList.length) % activeList.length;
      setSelectedIndex(prevIndex);
      itemsRef.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleItemClick(activeList[selectedIndex]);
    }
  };

  // Group items by category for rendering headers
  const groupedItems = activeList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Index map for keyboard highlights
  const itemIndexMap = {};
  activeList.forEach((item, index) => {
    itemIndexMap[item.id] = index;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'technology': return <Code size={16} style={{ color: '#c084fc' }} />;
      case 'subject': return <BookOpen size={16} style={{ color: '#60a5fa' }} />;
      case 'chapter': return <FileText size={16} style={{ color: '#34d399' }} />;
      case 'program': return <FileCode size={16} style={{ color: '#f59e0b' }} />;
      case 'download': return <Download size={16} style={{ color: '#a855f7' }} />;
      case 'interview': return <Briefcase size={16} style={{ color: '#f43f5e' }} />;
      case 'navigation': return <Compass size={16} style={{ color: '#38bdf8' }} />;
      case 'recent': return <Clock size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Command Palette Search Input Header */}
        <div className="search-modal-header">
          <Search size={20} style={{ color: '#c084fc' }} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search languages, subjects, chapters, programs..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            className="search-modal-input"
            aria-label="Global intelligent search input"
          />
          {query && (
            <button 
              onClick={handleClearQuery}
              className="search-clear-btn"
              aria-label="Clear search text"
            >
              <X size={16} />
            </button>
          )}
          <div className="search-modal-shortcut-hint">
            <span className="search-modal-kbd">ESC</span>
          </div>
        </div>

        {/* Command Palette Body Content */}
        <div className="search-modal-body">
          {activeList.length > 0 ? (
            Object.keys(groupedItems).map((category) => (
              <div key={category} className="search-results-group">
                
                {category === 'Recent Searches' ? (
                  <div className="search-recent-header">
                    <span className="search-results-section-header">Recent Searches</span>
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
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            /* No Results Found State */
            <div className="search-empty-state">
              <div className="search-empty-icon"><Search size={32} style={{ color: 'rgba(255,255,255,0.3)' }} /></div>
              <div className="search-empty-title">No results found for "{query}"</div>
              <div className="search-empty-desc">Check your spelling or try searching popular topics:</div>
              <div className="search-popular-tags">
                {popularTopics.map((pt) => (
                  <button 
                    key={pt.id} 
                    className="search-popular-tag-btn"
                    onClick={() => { setQuery(pt.query); setDebouncedQuery(pt.query); setSelectedIndex(0); }}
                  >
                    <Flame size={12} style={{ color: '#f59e0b' }} /> {pt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Topics Section when search is empty */}
          {!query && (
            <div className="search-popular-section">
              <div className="search-results-section-header">🔥 Popular Topics</div>
              <div className="search-popular-tags">
                {popularTopics.map((pt) => (
                  <button 
                    key={pt.id} 
                    className="search-popular-tag-btn"
                    onClick={() => { setQuery(pt.query); setDebouncedQuery(pt.query); setSelectedIndex(0); }}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Search Footer Keyboard Guidelines */}
        <div className="search-modal-footer">
          <div className="search-footer-tip">
            <kbd className="search-footer-kbd"><ArrowUp size={9} /></kbd>
            <kbd className="search-footer-kbd"><ArrowDown size={9} /></kbd>
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
