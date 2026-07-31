import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, BookOpen, Binary, FileQuestion, Search, 
  Video, Eye, Filter, ArrowUpRight, FolderSearch, X, Check, Tag, 
  ArrowLeft, ChevronRight, Calendar
} from 'lucide-react';
import { SEMESTER_SUBJECTS_DATA, EXAM_TYPES, EXAM_YEARS } from '../../data/curriculumData';
import NotesViewer from '../../features/notes/NotesViewer';
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

// Active Category Tabs (Commented items can be easily re-enabled in the future)
const CATEGORIES = [
  'All Resources',
  'Notes & Guides',
  'Past Papers (PYQs)',
  'Syllabus & Standard'
  // 'Lab Manuals',
  // 'Video Tutorials'
];

const SEMESTER_OPTIONS = [
  { id: 'Semester 1', label: 'Semester 1' },
  { id: 'Semester 2', label: 'Semester 2' }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [activeSemester, setActiveSemester] = useState('Semester 1');
  
  // List-based Navigation Drill-Down State for Past Papers
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [activePdfPaper, setActivePdfPaper] = useState(null);

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
      sub.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentSemesterData, searchQuery]);

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
    setSelectedExamType(null);
    setActivePdfPaper(null);
  };

  const handleSemesterChange = (semId) => {
    setActiveSemester(semId);
    setSelectedSubject(null);
    setSelectedExamType(null);
    setActivePdfPaper(null);
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
        /* ── PAST PAPERS (PYQs) DRILL-DOWN LIST NAVIGATION FLOW ── */
        <AnimatePresence mode="wait">
          {activePdfPaper ? (
            /* STEP 4: PDF Viewer View */
            <motion.div
              key={`pyq-pdf-view-${activePdfPaper.subjectCode}-${activePdfPaper.year}`}
              className="pyq-pdf-viewer-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pyq-list-header">
                <button 
                  className="pyq-back-btn" 
                  onClick={() => setActivePdfPaper(null)}
                >
                  <ArrowLeft size={15} />
                  <span>Back to {selectedExamType?.name} Years</span>
                </button>
                <div className="pyq-pdf-header-row">
                  <div className="pyq-list-header-info">
                    <span className="pyq-list-item-code">{activePdfPaper.subjectCode}</span>
                    <h3>{activePdfPaper.subjectName} — {activePdfPaper.examName} ({activePdfPaper.year})</h3>
                  </div>
                  <button 
                    className="resource-action-btn"
                    onClick={() => handleDownload(`${activePdfPaper.subjectName}_${activePdfPaper.examName}_${activePdfPaper.year}.pdf`)}
                  >
                    <Download size={15} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              <div className="pyq-pdf-reader-wrapper">
                <NotesViewer 
                  pdfUrl="/notes/semester2/DS_Notes.pdf"
                  subjectTitle={`${activePdfPaper.subjectName} ${activePdfPaper.examName} ${activePdfPaper.year}`}
                  subjectCode={activePdfPaper.subjectCode}
                />
              </div>
            </motion.div>
          ) : selectedExamType ? (
            /* STEP 3: Year List (Summer 2025, Summer 2026, etc. - 2025 onwards) */
            <motion.div
              key={`pyq-years-${selectedSubject.code}-${selectedExamType.id}`}
              className="pyq-list-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pyq-list-header">
                <button 
                  className="pyq-back-btn" 
                  onClick={() => setSelectedExamType(null)}
                >
                  <ArrowLeft size={15} />
                  <span>Back to Examination Types</span>
                </button>
                <div className="pyq-list-header-info">
                  <span className="pyq-list-item-code">{selectedSubject.code}</span>
                  <h3>{selectedSubject.name} — {selectedExamType.name}</h3>
                </div>
              </div>

              <div className="pyq-vertical-list">
                {EXAM_YEARS.map((year, idx) => (
                  <motion.div
                    key={year}
                    className="pyq-list-item"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActivePdfPaper({
                      subjectCode: selectedSubject.code,
                      subjectName: selectedSubject.name,
                      examName: selectedExamType.name,
                      year: year
                    })}
                  >
                    <div className="pyq-list-item-left">
                      <div className="pyq-list-item-icon">
                        <Calendar size={18} />
                      </div>
                      <span className="pyq-list-item-title">
                        {selectedExamType.name.split(' ')[0]} {year}
                      </span>
                    </div>
                    <div className="pyq-list-item-right">
                      <ChevronRight size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : selectedSubject ? (
            /* STEP 2: Examination Type List (Summer Examination / Winter Examination) */
            <motion.div
              key={`pyq-exam-types-${selectedSubject.code}`}
              className="pyq-list-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pyq-list-header">
                <button 
                  className="pyq-back-btn" 
                  onClick={() => setSelectedSubject(null)}
                >
                  <ArrowLeft size={15} />
                  <span>Back to {activeSemester} Subjects</span>
                </button>
                <div className="pyq-list-header-info">
                  <span className="pyq-list-item-code">{selectedSubject.code}</span>
                  <h3>{selectedSubject.name}</h3>
                </div>
              </div>

              <div className="pyq-vertical-list">
                {EXAM_TYPES.map((exam, idx) => (
                  <motion.div
                    key={exam.id}
                    className="pyq-list-item"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedExamType(exam)}
                  >
                    <div className="pyq-list-item-left">
                      <div className="pyq-list-item-icon">
                        <FileQuestion size={18} />
                      </div>
                      <span className="pyq-list-item-title">{exam.name}</span>
                    </div>
                    <div className="pyq-list-item-right">
                      <ChevronRight size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* STEP 1: Clean Vertical Subject List */
            <motion.div
              key={`pyq-subjects-list-${activeSemester}-${searchQuery}`}
              className="pyq-list-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pyq-list-header">
                <div className="pyq-list-header-info">
                  <span className="section-tag" style={{ margin: 0 }}>{activeSemester}</span>
                  <h3>Curriculum Subject List</h3>
                </div>
              </div>

              {currentSemesterSubjects.length > 0 ? (
                <div className="pyq-vertical-list">
                  {currentSemesterSubjects.map((sub, idx) => (
                    <motion.div
                      key={sub.code}
                      className="pyq-list-item"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedSubject(sub)}
                    >
                      <div className="pyq-list-item-left">
                        <div className="pyq-list-item-icon">
                          <BookOpen size={18} />
                        </div>
                        <div className="pyq-list-item-title">
                          <span className="pyq-list-item-code">{sub.code}</span>
                          <span>{sub.name}</span>
                        </div>
                      </div>
                      <div className="pyq-list-item-right">
                        <ChevronRight size={18} />
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
