import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, Search, Filter, BookOpen, Star, CheckCircle, 
  Clock, ArrowRight, Play, RotateCcw, Award, ChevronRight,
  TrendingUp, Sparkles, HelpCircle
} from 'lucide-react';
import { useProgram } from '../context/ProgramContext';
import StudentLayout from '../layouts/StudentLayout';
import '../styles/ProgrammingHub.css';

const SUBJECT_MAP = {
  'all': 'All Subjects',
  'c-programming': 'C Programming',
  'cpp': 'C++',
  'java': 'Java',
  'python': 'Python',
  'data-structures': 'Data Structures',
  'operating-system': 'Operating System',
  'dbms': 'DBMS',
  'computer-networks': 'Computer Networks'
};

const ProgrammingHub = () => {
  const navigate = useNavigate();
  const { 
    filteredPrograms, 
    programs, 
    bookmarkedIds, 
    completedIds, 
    loading, 
    filters, 
    setFilters, 
    toggleBookmark, 
    toggleCompletion,
    recentPrograms
  } = useProgram();

  const [activeSubject, setActiveSubject] = useState('all');

  // Handle subject tab change
  const handleSubjectChange = (subjectId) => {
    setActiveSubject(subjectId);
    setFilters(prev => ({
      ...prev,
      subject: subjectId,
      category: 'all' // Reset category on subject change
    }));
  };

  // Derive unique categories for the active subject
  const categories = useMemo(() => {
    const subset = activeSubject === 'all' 
      ? programs 
      : programs.filter(p => p.subject === activeSubject);
    const unique = new Set(subset.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(unique)];
  }, [programs, activeSubject]);

  // Update filters in context
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Calculate stats
  const totalCount = programs.length;
  const completedCount = completedIds.size;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <StudentLayout>
        <div className="hub-loading-container">
          <div className="skeleton-title"></div>
          <div className="skeleton-tabs"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="hub-wrapper">
        <div className="hub-container">
          
          {/* Header Dashboard section */}
          <header className="hub-header slide-up-in">
            <div className="header-info-col">
              <div className="title-row">
                <Code2 className="header-icon" size={32} />
                <h1 className="hub-title">Interactive Programming Hub</h1>
              </div>
              <p className="hub-desc">
                Compile your understanding across multiple subjects. Select concepts, solve curated syntax structures, and track compiler execution outputs.
              </p>
            </div>
            
            {/* Stats Card */}
            <div className="hub-stats-card">
              <div className="stats-header">
                <span className="stats-label">Mastery Progress</span>
                <span className="stats-value">{completedCount}/{totalCount} Solved</span>
              </div>
              <div className="hub-progress-bar-bg">
                <div 
                  className="hub-progress-bar-fill" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="stats-footer">
                <span>{completionPercentage}% complete</span>
                <span className="xp-badge">+{completedCount * 100} XP Earned</span>
              </div>
            </div>
          </header>

          {/* Search bar */}
          <section className="search-filter-section">
            <div className="search-box-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search programs by name, tags, category..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="search-input"
              />
            </div>
          </section>

          {/* Subject Navigation Tabs */}
          <nav className="subject-nav-scroll">
            <div className="subject-tabs">
              {Object.entries(SUBJECT_MAP).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => handleSubjectChange(id)}
                  className={`subject-tab ${activeSubject === id ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {/* Grid filter layout */}
          <div className="hub-layout-grid">
            
            {/* Main content column */}
            <main className="hub-main-col">
              
              {/* Dropdown Filters Bar */}
              <section className="filter-dropdowns-bar">
                <div className="filter-group">
                  <label className="filter-label">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => cat !== 'all' && (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Status</label>
                  <select
                    value={filters.completed}
                    onChange={(e) => handleFilterChange('completed', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Bookmarked</label>
                  <select
                    value={filters.bookmarked}
                    onChange={(e) => handleFilterChange('bookmarked', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Programs</option>
                    <option value="bookmarked">Bookmarked</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="filter-select"
                  >
                    <option value="Alphabetical">Alphabetical</option>
                    <option value="Newest">Newest</option>
                  </select>
                </div>
              </section>

              {/* Programs list cards */}
              <div className="programs-list">
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map(prog => {
                    const isBookmarked = bookmarkedIds.has(prog.id);
                    const isCompleted = completedIds.has(prog.id);
                    
                    let diffClass = 'diff-easy';
                    if (prog.difficulty === 'Medium') diffClass = 'diff-medium';
                    else if (prog.difficulty === 'Hard') diffClass = 'diff-hard';

                    return (
                      <article key={prog.id} className="program-card">
                        <div className="card-top-row">
                          <span className="card-subject-tag">
                            {SUBJECT_MAP[prog.subject] || prog.subject}
                          </span>
                          <div className="card-actions-wrapper">
                            <button 
                              onClick={() => toggleBookmark(prog.id)}
                              className={`action-btn-bookmark ${isBookmarked ? 'active' : ''}`}
                              aria-label="Bookmark program"
                            >
                              <Star size={16} fill={isBookmarked ? '#fbbf24' : 'none'} />
                            </button>
                            <button 
                              onClick={() => toggleCompletion(prog.id)}
                              className={`action-btn-complete ${isCompleted ? 'active' : ''}`}
                              aria-label="Toggle completion state"
                            >
                              <CheckCircle size={16} fill={isCompleted ? '#10b981' : 'none'} />
                            </button>
                          </div>
                        </div>

                        <h3 className="card-program-title">{prog.title}</h3>
                        <p className="card-program-desc">{prog.description}</p>

                        <div className="card-metadata-row">
                          <span className={`diff-badge ${diffClass}`}>{prog.difficulty}</span>
                          <span className="meta-item"><Clock size={12} /> {prog.estimatedTime || '15 mins'}</span>
                          <span className="meta-item"><BookOpen size={12} /> {prog.category}</span>
                        </div>

                        <div className="card-footer-row">
                          <div className="tags-list">
                            {prog.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="meta-tag">#{tag}</span>
                            ))}
                          </div>
                          <button 
                            onClick={() => navigate(`/practice/programs/${prog.id}`)}
                            className="btn-solve"
                          >
                            Solve Code <ArrowRight size={14} />
                          </button>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="empty-programs-state">
                    <h3>No Programs Found</h3>
                    <p>Try modifying your search or filter inputs to locate programs.</p>
                    <button 
                      onClick={() => {
                        setFilters({
                          subject: 'all',
                          difficulty: 'all',
                          category: 'all',
                          completed: 'all',
                          bookmarked: 'all',
                          searchQuery: '',
                          sortBy: 'Alphabetical'
                        });
                        setActiveSubject('all');
                      }}
                      className="btn-reset-filters"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </main>

            {/* Sidebar Column: Recent programs & info guides */}
            <aside className="hub-sidebar-col">
              
              {/* Recent Programs */}
              <div className="sidebar-card">
                <h3 className="sidebar-title"><Clock size={16} /> Resume Practicing</h3>
                {recentPrograms.length > 0 ? (
                  <ul className="recent-list">
                    {recentPrograms.map(p => (
                      <li key={p.id} className="recent-item">
                        <div className="recent-info">
                          <span className="recent-name">{p.title}</span>
                          <span className="recent-subject">{SUBJECT_MAP[p.subject]}</span>
                        </div>
                        <button 
                          onClick={() => navigate(`/practice/programs/${p.id}`)}
                          className="btn-recent-go"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="recent-empty">
                    <p>Your recently solved programs will be shown here for quick access.</p>
                  </div>
                )}
              </div>

              {/* Tips & Guides */}
              <div className="sidebar-card info-card">
                <div className="info-header">
                  <Sparkles size={16} className="sparkle-icon" />
                  <h3 className="sidebar-title">Gamified Rewards</h3>
                </div>
                <p className="info-desc">
                  Every program solved grants you <strong>+100 XP</strong> and boosts your overall status. Complete subjects to unlock specialization certificates.
                </p>
                <div className="info-footer">
                  <HelpCircle size={14} /> Future compiler support coming soon!
                </div>
              </div>
            </aside>

          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default ProgrammingHub;
