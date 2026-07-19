import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  BookOpen, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Clock, 
  Layers,
  Bookmark,
  HelpCircle,
  Award,
  User,
  Target,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2
} from 'lucide-react';
import '../styles/global.css';
import '../styles/sections.css';
import '../styles/SubjectSyllabus.css'; // Premium isolated styles
import { SYLLABUS_DATA } from './SyllabusData';

// Previous Year Papers data — files served from /public/papers/cpp/
const PREV_YEAR_PAPERS = [
  { id: 'cpp-2025', year: '2025', title: 'Previous Year Paper 2025', file: '/papers/cpp/cpp-paper-2025.pdf' },
  { id: 'cpp-2026', year: '2026', title: 'Previous Year Paper 2026', file: '/papers/cpp/cpp-paper-2026.pdf' },
];

const SubjectSyllabus = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  
  const normalizedSubjectId = subjectId === 'data-structure' ? 'data-structures' : subjectId;

  const getSubjectNameFromId = (id) => {
    const nameMap = {
      'problem-solving-using-c': 'Problem Solving Using C',
      'computer-architecture': 'Computer Architecture',
      'mathematics-foundation': 'Mathematics Foundation',
      'general-english': 'General English',
      'indian-knowledge-system': 'Indian Knowledge System',
      'environmental-science': 'Environmental Science',
      'cpp-oop': 'Object Oriented Programming using C++',
      'data-structures': 'Data Structures',
      'operating-systems': 'Operating Systems',
      'web-technologies': 'Web Technologies',
      'java-oop': 'Object Oriented Programming using Java',
      'indian-constitution': 'Indian Constitution',
      'operating-systems-advanced': 'Operating Systems Advanced',
      'relational-dbms': 'Relational DBMS',
      'python-engineering': 'Python Engineering',
      'software-engineering': 'Software Engineering',
      'java-platform-core': 'Java Platform Core',
      'computer-networks': 'Computer Networks',
      'web-technologies-stack': 'Web Technologies Stack',
      'organizational-behaviors': 'Organizational Behaviors',
      'advanced-web-dev-react': 'Advanced Web Dev (React)',
      'cloud-server-platforms': 'Cloud Server Platforms',
      'mobile-app-architecture': 'Mobile App Architecture',
      'network-security-crypt': 'Network Security Crypt',
      'machine-learning-core': 'Machine Learning Core',
      'computer-graphics-canvas': 'Computer Graphics Canvas',
      'major-thesis-project': 'Major Thesis Project',
      'enterprise-java-framework': 'Enterprise Java Framework'
    };
    return nameMap[id] || id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getSemesterForSubject = (id) => {
    const semesterMap = {
      'problem-solving-using-c': 1,
      'computer-architecture': 1,
      'mathematics-foundation': 1,
      'general-english': 1,
      'indian-knowledge-system': 1,
      'environmental-science': 1,
      'cpp-oop': 2,
      'data-structures': 2,
      'operating-systems': 2,
      'web-technologies': 2,
      'java-oop': 2,
      'indian-constitution': 2,
      'operating-systems-advanced': 3,
      'relational-dbms': 3,
      'python-engineering': 3,
      'software-engineering': 3,
      'java-platform-core': 4,
      'computer-networks': 4,
      'web-technologies-stack': 4,
      'organizational-behaviors': 4,
      'advanced-web-dev-react': 5,
      'cloud-server-platforms': 5,
      'mobile-app-architecture': 5,
      'network-security-crypt': 5,
      'machine-learning-core': 6,
      'computer-graphics-canvas': 6,
      'major-thesis-project': 6,
      'enterprise-java-framework': 6
    };
    return semesterMap[id] || 2;
  };

  const getSubjectCode = (id) => {
    const codeMap = {
      'problem-solving-using-c': 'BCA-101',
      'computer-architecture': 'BCA-102',
      'mathematics-foundation': 'BCA-103',
      'general-english': 'BCA-104',
      'indian-knowledge-system': 'BCA-105',
      'environmental-science': 'BCA-106',
      'cpp-oop': 'BCA-201',
      'data-structures': 'BCA-202',
      'operating-systems': 'BCA-203',
      'web-technologies': 'BCA-204',
      'java-oop': 'BCA-205',
      'indian-constitution': 'BCA-206',
      'operating-systems-advanced': 'BCA-301',
      'relational-dbms': 'BCA-302',
      'python-engineering': 'BCA-303',
      'software-engineering': 'BCA-304',
      'java-platform-core': 'BCA-401',
      'computer-networks': 'BCA-402',
      'web-technologies-stack': 'BCA-403',
      'organizational-behaviors': 'BCA-404',
      'advanced-web-dev-react': 'BCA-501',
      'cloud-server-platforms': 'BCA-502',
      'mobile-app-architecture': 'BCA-503',
      'network-security-crypt': 'BCA-504',
      'machine-learning-core': 'BCA-601',
      'computer-graphics-canvas': 'BCA-602',
      'major-thesis-project': 'BCA-603',
      'enterprise-java-framework': 'BCA-604'
    };
    return codeMap[id] || 'BCA Core';
  };

  const getSubjectData = (id) => {
    if (SYLLABUS_DATA[id]) {
      return SYLLABUS_DATA[id];
    }
    return {
      title: getSubjectNameFromId(id),
      desc: 'The syllabus content and study materials for this subject are currently under preparation by our academic team.',
      estTime: 'Coming Soon',
      credits: '4 Credits',
      faculty: 'BCA Department Faculty',
      unitsCount: 0,
      chaptersCount: 0,
      syllabus: [
        {
          unit: 1,
          id: 'unit-1',
          title: 'Unit 1: Syllabus Under Preparation',
          chapters: [
            {
              id: 'ch-1',
              title: 'Chapter 1: Content Coming Soon',
              topics: [
                'This curriculum module is being updated by the department academic committee.',
                'Please check back later for detailed notes, practice questions, and reference resources.'
              ]
            }
          ]
        }
      ]
    };
  };

  const subjectData = getSubjectData(normalizedSubjectId);

  const [expandedUnit, setExpandedUnit] = useState('unit-1');
  const [completedTopics, setCompletedTopics] = useState({});

  // --- Previous Year Papers state ---
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [activePaper, setActivePaper]       = useState(null); // { id, year, title, file }
  const [zoomLevel, setZoomLevel]           = useState(100);
  const [isFullscreen, setIsFullscreen]     = useState(false);

  const openPaperList  = () => setShowPaperModal(true);
  const closePaperList = () => setShowPaperModal(false);

  const openPaper  = (paper) => { setActivePaper(paper); setZoomLevel(100); setShowPaperModal(false); };
  const closePaper = () => { setActivePaper(null); setIsFullscreen(false); };

  const zoomIn  = () => setZoomLevel(z => Math.min(z + 25, 200));
  const zoomOut = () => setZoomLevel(z => Math.max(z - 25, 50));
  const fitPage = () => setZoomLevel(100);

  const currentPaperIdx = activePaper ? PREV_YEAR_PAPERS.findIndex(p => p.id === activePaper.id) : -1;
  const hasPrev = currentPaperIdx > 0;
  const hasNext = currentPaperIdx < PREV_YEAR_PAPERS.length - 1;
  const goToPrev = () => hasPrev && openPaper(PREV_YEAR_PAPERS[currentPaperIdx - 1]);
  const goToNext = () => hasNext && openPaper(PREV_YEAR_PAPERS[currentPaperIdx + 1]);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(f => !f);
  }, [isFullscreen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { closePaper(); closePaperList(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Reset expanded unit when subject changes
  useEffect(() => {
    setExpandedUnit('unit-1');
  }, [subjectId]);

  const toggleUnit = (unitId) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  const handleTopicToggle = (topicName) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  // Syllabus PDF map — add more subjects here when PDFs are available
  const SYLLABUS_PDF_MAP = {
    'operating-systems': '/syllabus/os-syllabus.pdf',
    'data-structures':   '/syllabus/ds-syllabus.pdf',
  };

  const syllabusFile = SYLLABUS_PDF_MAP[normalizedSubjectId] || null;

  const handleSyllabusDownload = () => {
    if (!syllabusFile) return;
    const link = document.createElement('a');
    link.href = syllabusFile;
    link.download = `${subjectData.title} - Syllabus.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Safe fallback metadata
  const credits = subjectData.credits || '4 Credits';
  const faculty = subjectData.faculty || 'Prof. S. R. Awari';
  const difficulty = subjectData.difficulty || (normalizedSubjectId === 'data-structures' || normalizedSubjectId === 'computer-architecture' ? 'Hard' : 'Medium');
  
  const learningObjectives = subjectData.learningObjectives || [
    'Gain practical competency in the design and implementation of modern applications.',
    'Develop robust analytical skills to write optimized, error-free computer code.',
    'Understand architectural frameworks and background processing mechanics.',
    'Build production-ready code modules aligned with industry standards.'
  ];

  const prerequisites = subjectData.prerequisites || 'Basic familiarity with computer operations and programming logic.';
  
  const skillsLearned = subjectData.skillsLearned || [
    'Logical Architectures',
    'Structural Debugging',
    'Memory Optimization',
    'Asynchronous Pipelines'
  ];

  const careerRelevance = subjectData.careerRelevance || 'Essential foundation for careers in Software Development, Cloud Computing, Database Administration, and System Design.';

  // Related subjects list (excluding current)
  const allSubjects = [
    { id: 'cpp-oop', title: 'Object Oriented Programming using C++' },
    { id: 'data-structures', title: 'Data Structures' },
    { id: 'operating-systems', title: 'Operating Systems' },
    { id: 'web-technologies', title: 'Web Technologies' },
    { id: 'java-oop', title: 'Object Oriented Programming using Java' }
  ];
  
  const relatedSubjects = allSubjects.filter(sub => sub.id !== normalizedSubjectId).slice(0, 3);

  // Calculate Progress
  const totalTopicsList = [];
  subjectData.syllabus.forEach(unit => {
    unit.chapters.forEach(ch => {
      ch.topics.forEach(t => {
        totalTopicsList.push(t);
      });
    });
  });
  
  const totalTopicsCount = totalTopicsList.length;
  const completedTopicsCount = totalTopicsList.filter(t => completedTopics[t]).length;
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  const handleBreadcrumbClick = (e, targetId) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <div className="premium-syllabus-wrapper">
      
      {/* Top Breadcrumb Bar */}
      <div className="breadcrumb-nav-bar">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={12} className="breadcrumb-separator" />
          <Link 
            to="/#roadmap" 
            className="breadcrumb-link" 
            onClick={(e) => handleBreadcrumbClick(e, 'roadmap')}
            style={{ cursor: 'pointer' }}
          >
            Curriculum
          </Link>
          <ChevronRight size={12} className="breadcrumb-separator" />
          <Link 
            to="/#roadmap" 
            className="breadcrumb-link" 
            onClick={(e) => handleBreadcrumbClick(e, 'roadmap')}
            style={{ cursor: 'pointer' }}
          >
            Semester {getSemesterForSubject(normalizedSubjectId)}
          </Link>
          <ChevronRight size={12} className="breadcrumb-separator" />
          <span className="breadcrumb-active">{subjectData.title}</span>
        </div>
      </div>

      <div className="premium-syllabus-container">
        
        {/* Back Button */}
        <button className="syllabus-back-btn flex-center" onClick={() => {
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate('/');
          }
        }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Top Hero Glass Card */}
        <header className="subject-hero-card glass-card">
          <div className="hero-gradient-overlay" />
          <div className="hero-content-wrapper">
            <div className="subject-badge-row">
              <span className="premium-badge-tag">SEMESTER {getSemesterForSubject(normalizedSubjectId)}</span>
              <span className="badge-bullet">•</span>
              <span className="subject-code-tag">{getSubjectCode(normalizedSubjectId)}</span>
            </div>
            
            <h1 className="subject-hero-title">{subjectData.title}</h1>
            <p className="subject-hero-desc">{subjectData.desc}</p>
            
            {/* Metadata Grid */}
            <div className="subject-hero-meta-grid">
              <div className="hero-meta-item">
                <Award size={16} />
                <span>{credits}</span>
              </div>
              <div className="hero-meta-item">
                <User size={16} />
                <span>{faculty}</span>
              </div>
              <div className="hero-meta-item">
                <Clock size={16} />
                <span>{subjectData.estTime}</span>
              </div>
              <div className="hero-meta-item">
                <Layers size={16} />
                <span>{subjectData.unitsCount} Units / {subjectData.chaptersCount} Chapters</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="syllabus-split-grid">
          
          {/* Left Column: Details & Accordions */}
          <main className="syllabus-left-column">
            
            {/* Subject Overview Card */}
            <section className="subject-overview-card glass-card">
              <h3>Subject Overview</h3>
              <p className="overview-desc">{subjectData.desc}</p>
              
              <div className="overview-sub-grid">
                <div className="overview-points-col">
                  <h4>Learning Objectives</h4>
                  <ul className="learning-obj-list">
                    {learningObjectives.map((obj, index) => (
                      <li key={index}>
                        <CheckCircle size={14} className="check-bullet" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="overview-points-col">
                  <h4>Prerequisites</h4>
                  <p className="prereq-text">{prerequisites}</p>
                  
                  <h4 style={{ marginTop: '20px' }}>Skills You'll Learn</h4>
                  <div className="skills-tags-list">
                    {skillsLearned.map((skill, index) => (
                      <span key={index} className="skill-tag-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="career-relevance-box">
                <div className="relevance-icon"><Briefcase size={18} /></div>
                <div>
                  <h5>Career Relevance</h5>
                  <p>{careerRelevance}</p>
                </div>
              </div>
            </section>

            {/* Units Accordion Stack */}
            <section className="units-accordion-section">
              <h3>Course Syllabus & Units</h3>
              <div className="units-accordion-stack">
                {subjectData.syllabus.map((unitData) => {
                  const isExpanded = expandedUnit === unitData.id;
                  return (
                    <div 
                      key={unitData.id} 
                      className={`unit-accordion-card glass-card ${isExpanded ? 'expanded' : ''}`}
                    >
                      {/* Accordion Trigger */}
                      <div 
                        className="unit-accordion-header"
                        onClick={() => toggleUnit(unitData.id)}
                      >
                        <div>
                          <span className="unit-number-label">Unit {unitData.unit}</span>
                          <h4 className="unit-card-title">{unitData.title}</h4>
                        </div>
                        <span className="accordion-chevron">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </div>

                      {/* Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="unit-chapters-grid">
                              {unitData.chapters.map((ch, index) => (
                                <div key={ch.id} className="chapter-premium-card glass-card">
                                  <div className="chapter-card-header">
                                    <span className="chapter-num-badge">Ch {index + 1}</span>
                                    <h5>{ch.title}</h5>
                                  </div>
                                  
                                  {/* Topics list inside Chapter */}
                                  <ul className="chapter-topics-checklist">
                                    {ch.topics.map((topic, tIdx) => {
                                      const isDone = !!completedTopics[topic];
                                      return (
                                        <li 
                                          key={tIdx} 
                                          className={`topic-checkbox-item ${isDone ? 'checked' : ''}`}
                                          onClick={() => handleTopicToggle(topic)}
                                        >
                                          <div className={`checkbox-ring ${isDone ? 'checked' : ''}`}>
                                            {isDone && <CheckCircle size={12} fill="var(--accent-glow)" color="#000000" />}
                                          </div>
                                          <span>{topic}</span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          {/* Right Column: Sticky Sidebar */}
          <aside className="syllabus-right-sidebar">
            <div className="sticky-sidebar-box">
              
              {/* Info Stats Card */}
              <div className="sidebar-info-card glass-card">
                <h4>Course Metrics</h4>
                <div className="sidebar-metrics-grid">
                  <div className="metric-row">
                    <span className="m-label">Difficulty:</span>
                    <span className="m-value diff-badge" style={{ 
                      color: difficulty === 'Hard' ? '#ef4444' : difficulty === 'Medium' ? '#f59e0b' : '#10b981',
                      borderColor: difficulty === 'Hard' ? 'rgba(239, 68, 68, 0.2)' : difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                    }}>{difficulty}</span>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Credits:</span>
                    <span className="m-value">{credits}</span>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Total Time:</span>
                    <span className="m-value">{subjectData.estTime}</span>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Total Units:</span>
                    <span className="m-value">{subjectData.unitsCount} Units</span>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Total Chapters:</span>
                    <span className="m-value">{subjectData.chaptersCount} Chapters</span>
                  </div>
                </div>

                {/* Progress Circle Preview */}
                <div className="progress-preview-container">
                  <div 
                    className="progress-radial-bar"
                    style={{ 
                      background: `conic-gradient(var(--primary-purple) ${progressPercent}%, rgba(255, 255, 255, 0.05) 0%)` 
                    }}
                  >
                    <div className="radial-inner-value">{progressPercent}%</div>
                  </div>
                  <div className="progress-radial-info">
                    <h5>Syllabus Progress</h5>
                    <p>{completedTopicsCount} of {totalTopicsCount} topics marked complete.</p>
                  </div>
                </div>
              </div>

              {/* Sticky Quick Actions Buttons */}
              <div className="sidebar-actions-card glass-card">
                <h4>Study Actions</h4>
                <button
                  className="btn-premium-purple flex-center w-full"
                  onClick={handleSyllabusDownload}
                  disabled={!syllabusFile}
                  title={syllabusFile ? 'Download Syllabus PDF' : 'Syllabus PDF not available yet'}
                  style={!syllabusFile ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
                >
                  <Download size={16} /> Download Syllabus
                </button>
                <button className="btn-premium flex-center w-full">
                  <BookOpen size={16} /> Download Notes
                </button>
                <button
                  className="btn-premium flex-center w-full"
                  onClick={() => normalizedSubjectId === 'data-structures' && navigate('/curriculum/semester-2/data-structures/quiz')}
                  disabled={normalizedSubjectId !== 'data-structures'}
                  title={normalizedSubjectId === 'data-structures' ? 'Start Data Structures Quiz' : 'Quiz not available for this subject yet'}
                  style={normalizedSubjectId !== 'data-structures' ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
                >
                  <HelpCircle size={16} /> Take MCQ Quiz
                </button>
                <button
                  className="btn-premium flex-center w-full"
                  onClick={openPaperList}
                  aria-label="Open Previous Year Papers"
                >
                  <FileText size={16} /> Previous Year Papers
                </button>
              </div>

            </div>
          </aside>

        </div>

        {/* Bottom Section: Related Subjects */}
        <section className="related-subjects-section">
          <h3>Related Course Modules</h3>
          <div className="related-subjects-grid">
            {relatedSubjects.map((sub, index) => (
              <div 
                key={index} 
                className="related-subject-card glass-card"
                onClick={() => {
                  navigate(`/curriculum/semester-2/${sub.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="related-card-header">
                  <span className="related-badge">SEMESTER {getSemesterForSubject(sub.id)}</span>
                  <ChevronRight size={16} />
                </div>
                <h4>{sub.title}</h4>
                <p>Access structured notes, previous papers, syllabus files, and interactive quizzes for this course.</p>
                <span className="related-open-link">Open Learning Portal →</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>

    {/* ── Paper List Modal ── */}
    <AnimatePresence>
      {showPaperModal && (
        <motion.div
          className="pyp-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Previous Year Papers"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && closePaperList()}
        >
          <motion.div
            className="pyp-list-panel glass-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="pyp-list-header">
              <div className="pyp-list-title-group">
                <FileText size={20} className="pyp-header-icon" />
                <h3>Previous Year Papers</h3>
              </div>
              <button className="pyp-close-btn" onClick={closePaperList} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <p className="pyp-list-subtitle">Select a paper to view it in the built-in reader.</p>

            {/* Paper Cards */}
            <div className="pyp-papers-list">
              {PREV_YEAR_PAPERS.map((paper) => (
                <button
                  key={paper.id}
                  className="pyp-paper-row"
                  onClick={() => openPaper(paper)}
                  aria-label={`Open ${paper.title}`}
                >
                  <div className="pyp-paper-row-left">
                    <div className="pyp-doc-icon">
                      <FileText size={22} />
                    </div>
                    <div className="pyp-paper-info">
                      <span className="pyp-paper-name">{paper.title}</span>
                      <span className="pyp-paper-meta">OOP using C++ &nbsp;•&nbsp; Semester II &nbsp;•&nbsp; PDF</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="pyp-row-arrow" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── PDF Viewer Modal ── */}
    <AnimatePresence>
      {activePaper && (
        <motion.div
          className={`pyp-viewer-overlay${isFullscreen ? ' pyp-viewer-fullscreen' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={activePaper.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Top Toolbar */}
          <div className="pyp-viewer-toolbar">
            {/* Left: back + title */}
            <div className="pyp-toolbar-left">
              <button
                className="pyp-tool-btn"
                onClick={() => { closePaper(); setShowPaperModal(true); }}
                aria-label="Back to paper list"
                title="Back to papers"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="pyp-viewer-title">{activePaper.title}</span>
            </div>

            {/* Centre: nav + zoom */}
            <div className="pyp-toolbar-centre">
              <button
                className="pyp-tool-btn"
                onClick={goToPrev}
                disabled={!hasPrev}
                aria-label="Previous paper"
                title="Previous paper"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="pyp-page-counter">
                {currentPaperIdx + 1} / {PREV_YEAR_PAPERS.length}
              </span>
              <button
                className="pyp-tool-btn"
                onClick={goToNext}
                disabled={!hasNext}
                aria-label="Next paper"
                title="Next paper"
              >
                <ChevronRight size={16} />
              </button>

              <div className="pyp-divider" />

              <button className="pyp-tool-btn" onClick={zoomOut}  aria-label="Zoom out"  title="Zoom out">  <ZoomOut  size={16} /></button>
              <span className="pyp-zoom-label">{zoomLevel}%</span>
              <button className="pyp-tool-btn" onClick={zoomIn}   aria-label="Zoom in"   title="Zoom in">   <ZoomIn   size={16} /></button>
              <button className="pyp-tool-btn" onClick={fitPage}  aria-label="Fit to screen" title="Fit to screen">100%</button>
            </div>

            {/* Right: download + fullscreen + close */}
            <div className="pyp-toolbar-right">
              <a
                href={activePaper.file}
                download
                className="pyp-tool-btn pyp-download-btn"
                aria-label="Download paper"
                title="Download"
              >
                <Download size={16} />
              </a>
              <button
                className="pyp-tool-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button className="pyp-tool-btn pyp-close-viewer-btn" onClick={closePaper} aria-label="Close viewer" title="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* PDF iframe */}
          <div className="pyp-viewer-body">
            <iframe
              key={`${activePaper.id}-${zoomLevel}`}
              src={`${activePaper.file}#zoom=${zoomLevel}`}
              title={activePaper.title}
              className="pyp-pdf-iframe"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default SubjectSyllabus;
