import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, BookOpen, Binary, FileQuestion, Search, 
  Video, Eye, Filter, ArrowUpRight, FolderSearch, X, Check, Tag, ArrowLeft
} from 'lucide-react';
import { SEMESTER_SUBJECTS_DATA, GENERATE_SUBJECT_PYQS } from '../../data/curriculumData';
import '../../styles/sections.css';

const ALL_RESOURCES = [
  {
    id: 1,
    name: 'C Programming Syntaxes & Memory Cheat Sheet',
    desc: 'Comprehensive reference for pointers, memory allocation, structs, and preprocessor directives.',
    category: 'Notes & Guides',
    subject: 'C Programming',
    semester: 'Sem 1',
    ext: 'PDF',
    size: '2.4 MB',
    downloads: 1420,
    icon: <FileText size={20} />
  },
  {
    id: 2,
    name: 'BCA Official Course Curriculum (2024–2027)',
    desc: 'Complete 3-year semester-wise syllabus, credit structures, and university guidelines.',
    category: 'Syllabus & Standard',
    subject: 'Curriculum',
    semester: 'All Sems',
    ext: 'PDF',
    size: '1.2 MB',
    downloads: 3100,
    icon: <BookOpen size={20} />
  },
  {
    id: 3,
    name: 'DBMS Relations & SQL Query Optimization Guide',
    desc: 'ER diagrams, normalization (1NF to BCNF), and complex JOIN query examples with solutions.',
    category: 'Notes & Guides',
    subject: 'Database Systems',
    semester: 'Sem 3',
    ext: 'PDF',
    size: '3.1 MB',
    downloads: 980,
    icon: <FileText size={20} />
  },
  {
    id: 4,
    name: 'Data Structures & Algorithms Lab Manual',
    desc: '30+ C & C++ lab problems covering stacks, queues, linked lists, binary trees, and sorting.',
    category: 'Lab Manuals',
    subject: 'Data Structures',
    semester: 'Sem 2',
    ext: 'PDF',
    size: '1.8 MB',
    downloads: 2150,
    icon: <Binary size={20} />
  },
  {
    id: 11,
    name: 'Unix Shell Scripting & POSIX Systems Lab Sheet',
    desc: 'Bash scripting commands, process management, pipe redirection, and AWK/SED automation scripts.',
    category: 'Lab Manuals',
    subject: 'Operating Systems',
    semester: 'Sem 3',
    ext: 'PDF',
    size: '950 KB',
    downloads: 1210,
    icon: <Binary size={20} />
  },
  {
    id: 12,
    name: 'Modern Web Development & React SPA Guide',
    desc: 'JavaScript ES6+, React Hooks, Tailwind CSS, state management, and REST API consumption notes.',
    category: 'Notes & Guides',
    subject: 'Web Development',
    semester: 'Sem 4',
    ext: 'PDF',
    size: '2.8 MB',
    downloads: 1690,
    icon: <FileText size={20} />
  },
  {
    id: 13,
    name: 'Java Object-Oriented Programming Video Series Notes',
    desc: 'Companion code notes and diagrams for Inheritance, Polymorphism, Packages & Multi-threading.',
    category: 'Video Tutorials',
    subject: 'Java Tech Track',
    semester: 'Sem 3',
    ext: 'VIDEO',
    size: 'HD Stream',
    downloads: 890,
    icon: <Video size={20} />
  },
  {
    id: 14,
    name: 'BCA Practical Lab Evaluation & Viva Standards',
    desc: 'Official marking rubric for practical exams, viva questions, and project presentation guidelines.',
    category: 'Syllabus & Standard',
    subject: 'Academic Admin',
    semester: 'All Sems',
    ext: 'PDF',
    size: '420 KB',
    downloads: 1560,
    icon: <BookOpen size={20} />
  }
];

const CATEGORIES = [
  'All Resources',
  'Notes & Guides',
  'Past Papers (PYQs)',
  'Lab Manuals',
  'Syllabus & Standard',
  'Video Tutorials'
];

const SEMESTER_OPTIONS = [
  { id: 'Semester 1', label: 'Semester 1' },
  { id: 'Semester 2', label: 'Semester 2' }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [activeSemester, setActiveSemester] = useState('Semester 1');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [downloadNotification, setDownloadNotification] = useState(null);

  // Active semester subject list from centralized data source
  const currentSemesterData = useMemo(() => {
    return SEMESTER_SUBJECTS_DATA.find(s => s.semester === activeSemester) || SEMESTER_SUBJECTS_DATA[0];
  }, [activeSemester]);

  // Filtered Subjects for the active semester
  const currentSemesterSubjects = useMemo(() => {
    if (!currentSemesterData) return [];
    if (!searchQuery) return currentSemesterData.subjects;
    
    return currentSemesterData.subjects.filter(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentSemesterData, searchQuery]);

  // Generated PYQ Papers for selected Subject (2025 onwards)
  const currentSubjectPYQs = useMemo(() => {
    if (!selectedSubject) return [];
    const papers = GENERATE_SUBJECT_PYQS(selectedSubject.code, selectedSubject.name, activeSemester);
    if (!searchQuery) return papers;

    return papers.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.examType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.examYear.toString().includes(searchQuery)
    );
  }, [selectedSubject, activeSemester, searchQuery]);

  // Filter standard resources for non-PYQ categories
  const filteredResources = useMemo(() => {
    return ALL_RESOURCES.filter(item => {
      const matchesCategory = activeCategory === 'All Resources' || item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.semester.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedSubject(null);
  };

  const handleSemesterChange = (semId) => {
    setActiveSemester(semId);
    setSelectedSubject(null);
  };

  const handleDownload = (resourceName) => {
    setDownloadNotification(resourceName);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 3000);
  };

  return (
    <section id="resources" className="resources-section">
      
      {/* Download Alert Toast */}
      <AnimatePresence>
        {downloadNotification && (
          <motion.div 
            className="resource-download-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Check size={18} className="toast-icon" />
            <span>Downloading <strong>{downloadNotification}</strong>...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-header">
        <span className="section-tag">Digital Learning Library</span>
        <h2 className="section-title">Academic Study Resources</h2>
        <p className="section-subtitle">
          Explore curated syllabi, lecture notes, solved past papers, and laboratory task guides. Filter by track or search instantly.
        </p>
      </div>

      {/* Interactive Search & Filter Controls Panel */}
      <div className="resources-control-panel">
        
        {/* Full-width Search Input */}
        <div className="resources-search-wrapper">
          <Search size={18} className="resources-search-icon" />
          <input 
            type="text"
            placeholder="Search notes, PYQs, lab manuals, or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="resources-search-input"
            aria-label="Search resources"
          />
          {searchQuery && (
            <button 
              className="resources-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="resources-category-tabs" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Semester Filter Options for Past Papers (PYQs) */}
        <AnimatePresence>
          {activeCategory === 'Past Papers (PYQs)' && (
            <motion.div 
              className="pyq-semester-filter-container"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="pyq-semester-tabs" role="tablist" aria-label="PYQ Semester Filters">
                {SEMESTER_OPTIONS.map((sem) => (
                  <button
                    key={sem.id}
                    className={`category-tab-btn ${activeSemester === sem.id ? 'active' : ''}`}
                    onClick={() => handleSemesterChange(sem.id)}
                    role="tab"
                    aria-selected={activeSemester === sem.id}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Dynamic Content Display Area */}
      {activeCategory === 'Past Papers (PYQs)' ? (
        /* ── PAST PAPERS (PYQs) CATEGORY FLOW ── */
        <AnimatePresence mode="wait">
          {selectedSubject ? (
            /* FLOW STEP 3: Past Papers List for Selected Subject */
            <motion.div
              key={`pyq-papers-${selectedSubject.code}-${activeSemester}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pyq-subject-detail-header">
                <button 
                  className="pyq-back-btn" 
                  onClick={() => setSelectedSubject(null)}
                >
                  <ArrowLeft size={16} />
                  <span>Back to {activeSemester} Subjects</span>
                </button>
                <div className="pyq-selected-subject-info">
                  <span className="res-badge res-sem-badge">{selectedSubject.code}</span>
                  <h3>{selectedSubject.name} — Past Examination Papers</h3>
                </div>
              </div>

              {currentSubjectPYQs.length > 0 ? (
                <div className="resources-grid">
                  {currentSubjectPYQs.map((paper, idx) => (
                    <motion.div
                      key={paper.id}
                      className="glass-card resource-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="resource-card-top">
                        <div className="resource-icon-wrapper">
                          <FileQuestion size={20} />
                        </div>
                        <div className="resource-card-badges">
                          <span className="res-badge res-sem-badge">{paper.examYear}</span>
                          <span className="res-badge res-ext-badge">{paper.ext}</span>
                        </div>
                      </div>

                      <div className="resource-card-content">
                        <span className="resource-subject-tag">
                          <Tag size={11} style={{ marginRight: '4px' }} /> {paper.examType}
                        </span>
                        <h3 className="resource-title">{paper.name}</h3>
                        <p className="resource-desc">{paper.desc}</p>
                      </div>

                      <div className="resource-card-bottom">
                        <span className="resource-file-meta">
                          📁 {paper.size} • ⬇️ {paper.downloads} downloads
                        </span>
                        <button 
                          className="resource-action-btn"
                          onClick={() => handleDownload(paper.name)}
                          aria-label={`Download ${paper.name}`}
                        >
                          <Download size={15} />
                          <span>Download</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="resources-empty-state">
                  <div className="empty-icon-box">
                    <FolderSearch size={36} color="#c084fc" />
                  </div>
                  <h3>No PYQs found</h3>
                  <p>No past papers matched your search query "{searchQuery}".</p>
                </div>
              )}
            </motion.div>
          ) : (
            /* FLOW STEP 2: Semester Subject Cards List */
            <motion.div
              key={`pyq-subjects-${activeSemester}-${searchQuery}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {currentSemesterSubjects.length > 0 ? (
                <div className="resources-grid">
                  {currentSemesterSubjects.map((sub, idx) => (
                    <motion.div
                      key={sub.code}
                      className="glass-card resource-card pyq-subject-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSubject(sub)}
                    >
                      <div className="resource-card-top">
                        <div className="resource-icon-wrapper">
                          <BookOpen size={20} />
                        </div>
                        <div className="resource-card-badges">
                          <span className="res-badge res-sem-badge">{sub.code}</span>
                          <span className="res-badge res-ext-badge">4 PYQs</span>
                        </div>
                      </div>

                      <div className="resource-card-content">
                        <span className="resource-subject-tag">
                          <Tag size={11} style={{ marginRight: '4px' }} /> {sub.category}
                        </span>
                        <h3 className="resource-title">{sub.name}</h3>
                        <p className="resource-desc">{sub.desc}</p>
                      </div>

                      <div className="resource-card-bottom">
                        <span className="resource-file-meta">
                          📚 Mid & End Sem (2025–2026)
                        </span>
                        <button className="resource-action-btn pyq-view-btn">
                          <span>View Papers</span>
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="resources-empty-state">
                  <div className="empty-icon-box">
                    <FolderSearch size={36} color="#c084fc" />
                  </div>
                  <h3>No subjects match your filter</h3>
                  <p>We couldn't find any subject for "{searchQuery}". Try searching for another subject code or name.</p>
                  <button 
                    className="btn-reset-filters"
                    onClick={() => setSearchQuery('')}
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        /* ── STANDARD OTHER CATEGORIES FLOW ── */
        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <motion.div 
              key={`std-res-${activeCategory}-${searchQuery}`}
              className="resources-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredResources.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="glass-card resource-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="resource-card-top">
                    <div className="resource-icon-wrapper">
                      {item.icon}
                    </div>
                    <div className="resource-card-badges">
                      <span className="res-badge res-sem-badge">{item.semester}</span>
                      <span className="res-badge res-ext-badge">{item.ext}</span>
                    </div>
                  </div>

                  <div className="resource-card-content">
                    <span className="resource-subject-tag">
                      <Tag size={11} style={{ marginRight: '4px' }} /> {item.subject}
                    </span>
                    <h3 className="resource-title">{item.name}</h3>
                    <p className="resource-desc">{item.desc}</p>
                  </div>

                  <div className="resource-card-bottom">
                    <span className="resource-file-meta">
                      📁 {item.size} • ⬇️ {item.downloads} downloads
                    </span>
                    <button 
                      className="resource-action-btn"
                      onClick={() => handleDownload(item.name)}
                      aria-label={`Download ${item.name}`}
                    >
                      <Download size={15} />
                      <span>Download</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state-std"
              className="resources-empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="empty-icon-box">
                <FolderSearch size={36} color="#c084fc" />
              </div>
              <h3>No resources match your filter</h3>
              <p>We couldn't find any study material for "{searchQuery || activeCategory}". Try searching for another topic or resetting filters.</p>
              <button 
                className="btn-reset-filters"
                onClick={() => { setSearchQuery(''); setActiveCategory('All Resources'); }}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </section>
  );
};

export default Resources;
