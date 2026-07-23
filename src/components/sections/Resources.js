import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, BookOpen, Binary, FileQuestion, Search, 
  Video, Eye, Filter, ArrowUpRight, FolderSearch, X, Check, Tag
} from 'lucide-react';
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
    id: 5,
    name: 'Database Exam Solved Papers (2021–2025)',
    desc: 'Collection of previous 5 years end-semester examination papers with step-by-step solutions.',
    category: 'Past Papers (PYQs)',
    subject: 'Database Systems',
    semester: 'Sem 3',
    ext: 'ZIP',
    size: '4.5 MB',
    downloads: 1840,
    icon: <FileQuestion size={20} />
  },
  {
    id: 6,
    name: 'Computer Networks Mid-Sem PYQ & Answer Key',
    desc: 'OSI 7-layer model questions, TCP/IP headers, subnetting problems, and numerical solutions.',
    category: 'Past Papers (PYQs)',
    subject: 'Computer Networks',
    semester: 'Sem 4',
    ext: 'PDF',
    size: '1.1 MB',
    downloads: 740,
    icon: <FileQuestion size={20} />
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [downloadNotification, setDownloadNotification] = useState(null);

  // Filter resources based on category tab & search query
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

      {/* Interactive Search & Filter Controls */}
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

        {/* Category Tabs (Horizontally scrollable on mobile) */}
        <div className="resources-category-tabs" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Resources Digital Grid */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map((item, idx) => (
            <motion.div
              key={item.id}
              className="glass-card resource-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
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
        </div>
      ) : (
        /* Empty State */
        <motion.div 
          className="resources-empty-state"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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

    </section>
  );
};

export default Resources;
