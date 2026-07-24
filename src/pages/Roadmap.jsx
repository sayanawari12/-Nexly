import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import { 
  Search, X, Clock, Sparkles, CheckCircle2, ArrowRight, 
  Play, Layers, Compass, Code2, Filter, FolderSearch, ChevronRight, BookOpen
} from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import StudentLayout from '../layouts/StudentLayout';
import useAuth from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import '../styles/RoadmapSection.css';

const LANGUAGES = [
  {
    id: 'c',
    name: 'C',
    title: 'C Programming',
    category: 'System & Core',
    difficulty: 'Beginner',
    time: '15-20 hrs',
    desc: 'Master foundational concepts, low-level memory control, pointers, structures, and compilation.',
    path: '/roadmaps/programming/c',
    svg: TECH_LOGOS.c,
    defaultProgress: 80,
    totalLessons: 26
  },
  {
    id: 'cpp',
    name: 'C++',
    title: 'C++ Systems & OOP',
    category: 'System & Core',
    difficulty: 'Intermediate',
    time: '20-30 hrs',
    desc: 'Object-oriented architecture, STL algorithms, template metaprogramming, and high-performance design.',
    path: '/roadmaps/programming/cpp',
    svg: TECH_LOGOS.cpp,
    defaultProgress: 35,
    totalLessons: 30
  },
  {
    id: 'java',
    name: 'Java',
    title: 'Java Enterprise Tech',
    category: 'Enterprise & OOP',
    difficulty: 'Intermediate',
    time: '25-35 hrs',
    desc: 'Robust object-oriented programming, JVM memory model, multithreading, and backend engineering.',
    path: '/roadmaps/programming/java',
    svg: TECH_LOGOS.java,
    defaultProgress: 15,
    totalLessons: 28
  },
  {
    id: 'python',
    name: 'Python',
    title: 'Python & Data Science',
    category: 'Data & AI',
    difficulty: 'Beginner',
    time: '15-25 hrs',
    desc: 'Clean dynamic scripting, data manipulation, automation, REST APIs, and machine learning foundations.',
    path: '/roadmaps/programming/python',
    svg: TECH_LOGOS.python,
    defaultProgress: 0,
    totalLessons: 24
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    title: 'Modern JavaScript (ES6+)',
    category: 'Web & Fullstack',
    difficulty: 'Beginner',
    time: '20-30 hrs',
    desc: 'Asynchronous event loop, DOM manipulation, ES6+ modules, Promises, and full-stack web applications.',
    path: '/roadmaps/programming/javascript',
    svg: TECH_LOGOS.javascript,
    defaultProgress: 50,
    totalLessons: 25
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    title: 'TypeScript & Type-Safety',
    category: 'Web & Fullstack',
    difficulty: 'Intermediate',
    time: '15-25 hrs',
    desc: 'Static typing, generics, interfaces, strict compiler configurations, and scalable enterprise JavaScript.',
    path: '/roadmaps/programming/typescript',
    isIcon: true,
    defaultProgress: 0,
    totalLessons: 20
  }
];

const DIFFICULTY_TABS = ['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'];
const CATEGORY_TABS = ['All Categories', 'System & Core', 'Web & Fullstack', 'Enterprise & OOP', 'Data & AI'];

const Roadmap = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completedLessons } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState('All Difficulties');
  const [activeCategory, setActiveCategory] = useState('All Categories');

  // Filter languages based on search query, difficulty, and category
  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(lang => {
      const matchesSearch = 
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = 
        activeDifficulty === 'All Difficulties' || lang.difficulty === activeDifficulty;
      
      const matchesCategory = 
        activeCategory === 'All Categories' || lang.category === activeCategory;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, activeDifficulty, activeCategory]);

  return (
    <StudentLayout>
      <section className="roadmap-apple-section">
        
        {/* Page Hero Header */}
        <motion.div 
          className="roadmap-apple-header"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hub-tagline-badge">
            <Sparkles size={13} style={{ color: '#c084fc' }} /> OFFICIAL LEARNING GATEWAY
          </div>
          <h1 className="roadmap-apple-title">Programming Languages</h1>
          <p className="roadmap-apple-subtitle">
            Choose a language and start your learning journey. Follow structured career pathways with interactive playgrounds.
          </p>

          {/* Stats Bar */}
          <div className="hub-stats-bar">
            <div className="hub-stat-item">
              <span className="hub-stat-num">6</span>
              <span className="hub-stat-lbl">Core Languages</span>
            </div>
            <div className="hub-stat-divider" />
            <div className="hub-stat-item">
              <span className="hub-stat-num">120+</span>
              <span className="hub-stat-lbl">Micro-Lessons</span>
            </div>
            <div className="hub-stat-divider" />
            <div className="hub-stat-item">
              <span className="hub-stat-num">45+</span>
              <span className="hub-stat-lbl">Code Exercises</span>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Control Panel */}
        <div className="lang-control-panel">
          {/* Full-width Search Input */}
          <div className="lang-search-wrapper">
            <Search size={18} className="lang-search-icon" />
            <input 
              type="text"
              placeholder="Search C, Java, Python, Web Dev, or DSA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lang-search-input"
              aria-label="Search programming languages"
            />
            {searchQuery && (
              <button 
                className="lang-search-clear" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter Pills Row */}
          <div className="lang-filter-row">
            <div className="lang-filter-group">
              <span className="filter-label">Difficulty:</span>
              <div className="lang-filter-scroll">
                {DIFFICULTY_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`lang-filter-pill ${activeDifficulty === tab ? 'active' : ''}`}
                    onClick={() => setActiveDifficulty(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="lang-filter-group">
              <span className="filter-label">Category:</span>
              <div className="lang-filter-scroll">
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`lang-filter-pill ${activeCategory === tab ? 'active' : ''}`}
                    onClick={() => setActiveCategory(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Languages Grid */}
        {filteredLanguages.length > 0 ? (
          <div className="roadmap-apple-grid">
            {filteredLanguages.map((lang, idx) => {
              // Determine progress percentage
              const userProgress = user ? lang.defaultProgress : 0;
              const hasStarted = userProgress > 0;

              return (
                <motion.div 
                  key={lang.id} 
                  className="roadmap-apple-card lang-hub-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="lang-card-top">
                    <div className="lang-logo-wrapper">
                      {lang.isIcon ? (
                        <SiTypescript size={32} style={{ color: '#3178C6' }} />
                      ) : (
                        <div 
                          className="lang-svg-box"
                          dangerouslySetInnerHTML={{ __html: lang.svg }}
                        />
                      )}
                    </div>

                    <div className="lang-badge-group">
                      <span className={`lang-diff-badge ${lang.difficulty.toLowerCase()}`}>
                        {lang.difficulty}
                      </span>
                      <span className="lang-category-badge">{lang.category}</span>
                    </div>
                  </div>

                  <div className="lang-card-content">
                    <h2 className="lang-card-title">{lang.title}</h2>
                    <p className="lang-card-desc">{lang.desc}</p>
                    
                    <div className="lang-card-meta">
                      <span><Clock size={13} /> {lang.time}</span>
                      <span><BookOpen size={13} /> {lang.totalLessons} Lessons</span>
                    </div>

                    {/* Progress Bar Component */}
                    <div className="lang-progress-container">
                      <div className="lang-progress-header">
                        <span>Roadmap Progress</span>
                        <span>{hasStarted ? `${userProgress}% Completed` : 'Not Started'}</span>
                      </div>
                      <div className="lang-progress-bar-bg">
                        <div 
                          className="lang-progress-bar-fill" 
                          style={{ width: `${userProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lang-card-footer">
                    <button
                      className="lang-btn-action"
                      onClick={() => navigate(lang.path)}
                      aria-label={`Start learning ${lang.name}`}
                    >
                      {hasStarted ? (
                        <>
                          <Play size={15} fill="currentColor" /> Continue Learning <ArrowRight size={15} />
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} /> Start Learning Journey <ChevronRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Result */
          <motion.div 
            className="lang-empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="empty-icon-box">
              <FolderSearch size={36} color="#c084fc" />
            </div>
            <h3>No languages match your filters</h3>
            <p>We couldn't find any language matching "{searchQuery}". Try clearing your search or resetting difficulty filters.</p>
            <button 
              className="btn-reset-filters"
              onClick={() => {
                setSearchQuery('');
                setActiveDifficulty('All Difficulties');
                setActiveCategory('All Categories');
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Featured Upcoming Track Section (Web Dev & DSA) */}
        <div className="upcoming-tracks-wrapper">
          <h2 className="upcoming-tracks-title">🚀 Featured Learning Tracks</h2>
          
          <div className="upcoming-tracks-grid">
            <div className="upcoming-track-card">
              <div className="upcoming-card-header">
                <span className="upcoming-badge">CURRICULUM TRACK</span>
                <h3>🌐 Web Development</h3>
              </div>
              <p>Master HTML5, CSS3, JavaScript ES6+, React, Node.js, and Full-Stack Web Architecture.</p>
              <div className="upcoming-card-footer">
                <span>Available Track</span>
                <button className="btn-track-action" onClick={() => navigate('/roadmap')}>
                  Explore Track <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="upcoming-track-card">
              <div className="upcoming-card-header">
                <span className="upcoming-badge">ALGORITHMS TRACK</span>
                <h3>🧩 Data Structures & Algorithms</h3>
              </div>
              <p>Build strong interview & placement problem-solving skills with C/C++ memory implementations.</p>
              <div className="upcoming-card-footer">
                <span>Available Track</span>
                <button className="btn-track-action" onClick={() => navigate('/roadmap')}>
                  Explore Track <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>
    </StudentLayout>
  );
};

export default Roadmap;
