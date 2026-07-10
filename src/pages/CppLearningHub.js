import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Bookmark, 
  Clock, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Code2, 
  Terminal, 
  Play, 
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { CPP_TOPICS } from './CppLessons';
import '../styles/CppLearningHub.css';

const CppLearningHub = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll for the top reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0.1
      }
    );

    CPP_TOPICS.forEach((topic) => {
      const el = document.getElementById(topic.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]); // Re-run when searchQuery changes to catch updated list elements

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110; // offset for top sticky bars
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  // Filter topics based on search
  const filteredTopics = CPP_TOPICS.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cpp-hub-wrapper">
      {/* Scroll Progress Bar at the top of the viewport */}
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="cpp-hub-container">
        
        {/* Left Sticky Sidebar (Desktop Only) */}
        <aside className="cpp-sidebar">
          <button 
            className="back-btn" 
            onClick={() => navigate('/')} 
            style={{ 
              marginBottom: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              fontSize: '0.9rem',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          {/* Search bar inside sidebar */}
          <div className="cpp-search-wrapper">
            <Search className="cpp-search-icon" size={18} />
            <input 
              type="text" 
              className="cpp-search-input" 
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation Links list */}
          <nav className="cpp-nav-menu">
            <ul className="cpp-topic-list">
              {filteredTopics.map((topic) => {
                const isActive = topic.id === activeId;
                return (
                  <li key={topic.id}>
                    <button 
                      className={`cpp-topic-btn ${isActive ? 'active' : ''}`}
                      onClick={() => scrollToSection(topic.id)}
                    >
                      <span className="dot-indicator" />
                      <span>{topic.title}</span>
                    </button>
                  </li>
                );
              })}
              {filteredTopics.length === 0 && (
                <div className="cpp-empty-search">No matching topics</div>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="cpp-main-content">
          
          {/* Mobile Back Button & Search Bar */}
          <div className="cpp-mobile-header-nav" style={{ display: 'none' }}>
            <button className="back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="cpp-search-wrapper" style={{ margin: 0, flexGrow: 1 }}>
              <Search className="cpp-search-icon" size={16} />
              <input 
                type="text" 
                className="cpp-search-input" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Sticky Tab bar */}
          <div className="cpp-mobile-tabs-container">
            <div className="cpp-mobile-tabs">
              {filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  className={`cpp-mobile-tab-btn ${topic.id === activeId ? 'active' : ''}`}
                  onClick={() => scrollToSection(topic.id)}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>

          {/* Page Header */}
          <header className="cpp-page-header glass-card">
            <div className="cpp-header-top">
              <div>
                <span className="section-tag" style={{ marginBottom: '8px' }}>Learning Hub</span>
                <h1 className="cpp-page-title text-gradient-purple">C++ Programming</h1>
                <p className="cpp-page-subtitle">Learn C++ from Beginner to Advanced</p>
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  className="btn-premium-purple"
                  onClick={() => navigate('/technologies/cpp/quiz')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px', fontSize: '0.9rem' }}
                >
                  <Zap size={16} /> Take Coding Quiz
                </button>

                <button 
                  className={`cpp-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Bookmark Course"
                >
                  <Bookmark size={20} fill={isBookmarked ? 'var(--primary-purple)' : 'none'} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>
            </div>

            {/* Metadata and progress tracker row */}
            <div className="cpp-header-metadata-row">
              <div className="cpp-meta-badge">
                <Sliders size={15} />
                <span>Difficulty: Beginner → Advanced</span>
              </div>
              
              <div className="cpp-meta-badge">
                <Clock size={15} />
                <span>Est. Duration: 15 Hours</span>
              </div>

              {/* 0% Progress Bar as requested */}
              <div className="cpp-header-progress-box">
                <div className="progress-labels">
                  <span>Progress</span>
                  <span className="progress-percentage">0%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </header>

          {/* Content sections stack */}
          <div className="cpp-sections-stack">
            {filteredTopics.map((topic, index) => {
              const prev = index > 0 ? filteredTopics[index - 1] : null;
              const next = index < filteredTopics.length - 1 ? filteredTopics[index + 1] : null;

              return (
                <section 
                  key={topic.id} 
                  id={topic.id} 
                  className="cpp-topic-section glass-card"
                >
                  {/* Topic Title */}
                  <h2 className="cpp-section-heading text-gradient">{topic.title}</h2>
                  
                  {/* Placeholder Text */}
                  <p className="cpp-section-placeholder">This content will be added later.</p>

                  {/* Empty Placeholders Grid as requested */}
                  <div className="cpp-placeholders-grid">
                    
                    {/* 1. Notes */}
                    <div className="cpp-placeholder-card glass-card">
                      <div className="card-header-icon-title">
                        <FileText size={18} className="card-icon" />
                        <h4 className="card-title">Notes</h4>
                      </div>
                      <div className="card-empty-body" />
                    </div>

                    {/* 2. Code Example */}
                    <div className="cpp-placeholder-card glass-card">
                      <div className="card-header-icon-title">
                        <Code2 size={18} className="card-icon" />
                        <h4 className="card-title">Code Example</h4>
                      </div>
                      <div className="card-empty-body" />
                    </div>

                    {/* 3. Output */}
                    <div className="cpp-placeholder-card glass-card">
                      <div className="card-header-icon-title">
                        <Terminal size={18} className="card-icon" />
                        <h4 className="card-title">Output</h4>
                      </div>
                      <div className="card-empty-body" />
                    </div>

                    {/* 4. Practice Programs */}
                    <div className="cpp-placeholder-card glass-card">
                      <div className="card-header-icon-title">
                        <Play size={18} className="card-icon" />
                        <h4 className="card-title">Practice Programs</h4>
                      </div>
                      <div className="card-empty-body" />
                    </div>

                    {/* 5. Interview Questions */}
                    <div className="cpp-placeholder-card glass-card">
                      <div className="card-header-icon-title">
                        <HelpCircle size={18} className="card-icon" />
                        <h4 className="card-title">Interview Questions</h4>
                      </div>
                      <div className="card-empty-body" />
                    </div>

                  </div>

                  {/* Section navigation buttons */}
                  <div className="cpp-section-nav-footer">
                    {prev ? (
                      <button 
                        className="btn-section-prev"
                        onClick={() => scrollToSection(prev.id)}
                      >
                        <span className="btn-label">
                          <ChevronLeft size={14} /> Previous Topic
                        </span>
                        <span className="btn-title">{prev.title}</span>
                      </button>
                    ) : (
                      <div style={{ flex: 1 }} />
                    )}

                    {next ? (
                      <button 
                        className="btn-section-next"
                        onClick={() => scrollToSection(next.id)}
                      >
                        <span className="btn-label">
                          Next Topic <ChevronRight size={14} />
                        </span>
                        <span className="btn-title">{next.title}</span>
                      </button>
                    ) : (
                      <div style={{ flex: 1 }} />
                    )}
                  </div>

                </section>
              );
            })}

            {filteredTopics.length === 0 && (
              <div className="cpp-no-results glass-card">
                <Sparkles size={32} style={{ color: 'var(--accent-glow)', marginBottom: '16px' }} />
                <h3>No Topics Found</h3>
                <p>Try searching for another programming concept.</p>
              </div>
            )}
          </div>

        </main>

      </div>
    </div>
  );
};

export default CppLearningHub;
