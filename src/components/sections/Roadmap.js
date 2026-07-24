import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Zap, 
  Cpu, 
  Globe, 
  GitBranch, 
  Code2, 
  Terminal, 
  ShieldAlert, 
  Award, 
  FileText, 
  CheckCircle2, 
  Play, 
  Download, 
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import '../../styles/sections.css';

const semestersInfo = {
  1: {
    number: 'Semester 1',
    title: 'Programming Foundations',
    desc: 'Master the basics of computation, coding logic, and mathematical algorithms.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '6 Core Subjects',
    subjects: [
      { code: 'BCA-101', name: 'Problem Solving Using C', category: 'Programming', difficulty: 'Medium', hours: 60, icon: <Code2 size={22} />, desc: 'Learn programming fundamentals, arrays, pointers, structures, and problem-solving using C.' },
      { code: 'BCA-102', name: 'Computer Architecture', category: 'Theory', difficulty: 'Hard', hours: 45, icon: <Cpu size={22} />, desc: 'Study CPU organization, memory hierarchy, instruction execution, and digital logic.' },
      { code: 'BCA-103', name: 'Mathematics Foundation', category: 'Theory', difficulty: 'Hard', hours: 50, icon: <Layers size={22} />, desc: 'Build logic foundations through sets, matrices, relations, and graph theory.' },
      { code: 'BCA-104', name: 'General English', category: 'Practical', difficulty: 'Easy', hours: 30, icon: <BookOpen size={22} />, desc: 'Develop professional communication, technical writing, and business vocabulary.' },
      { code: 'BCA-105', name: 'Indian Knowledge System', category: 'Theory', difficulty: 'Easy', hours: 30, icon: <Globe size={22} />, desc: "Explore India's traditional scientific heritage and its modern application." },
      { code: 'BCA-106', name: 'Environmental Science', category: 'Theory', difficulty: 'Easy', hours: 30, icon: <ShieldAlert size={22} />, desc: 'Understand sustainable development, ecological conservation, and climate policies.' }
    ]
  },
  2: {
    number: 'Semester 2',
    title: 'Object Orientation & Structures',
    desc: 'Structure complex software applications, OOP design patterns, and hardware controllers.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '6 Core Subjects',
    subjects: [
      { code: 'BCA-201', name: 'OOP using C++', category: 'Programming', difficulty: 'Medium', hours: 60, icon: <Zap size={22} />, desc: 'Master classes, objects, inheritance, polymorphism, templates, and exception handling.' },
      { code: 'BCA-202', name: 'Data Structures', category: 'Programming', difficulty: 'Hard', hours: 60, icon: <GitBranch size={22} />, desc: 'Study linked lists, stacks, queues, binary trees, sorting, searching, and complexity.' },
      { code: 'BCA-203', name: 'Operating Systems', category: 'Theory', difficulty: 'Hard', hours: 45, icon: <Cpu size={22} />, desc: 'Understand threads, scheduling algorithms, paging systems, and mutual exclusions.' },
      { code: 'BCA-204', name: 'Web Technologies', category: 'Practical', difficulty: 'Medium', hours: 50, icon: <Globe size={22} />, desc: 'Build responsive interfaces using HTML5, CSS3, DOM APIs, and JavaScript.' },
      { code: 'BCA-205', name: 'OOP using Java', category: 'Programming', difficulty: 'Medium', hours: 60, icon: <Terminal size={22} />, desc: 'Study Java platform core, memory compilation, exception safety, and packages.' },
      { code: 'BCA-206', name: 'Indian Constitution', category: 'Theory', difficulty: 'Easy', hours: 30, icon: <ShieldAlert size={22} />, desc: 'Explore state structures, fundamental rights, and civil law guidelines.' }
    ]
  },
  3: {
    number: 'Semester 3',
    title: 'Systems & Relational Databases',
    desc: 'Connect applications to relational structures, file systems, and automated data scripts.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '4 Core Subjects',
    subjects: [
      { code: 'BCA-301', name: 'Operating Systems Advanced', category: 'Theory', difficulty: 'Hard', hours: 45, icon: <Cpu size={22} />, desc: 'Analyze thread scheduling, paging tables, file structures, and lock models.' },
      { code: 'BCA-302', name: 'Relational DBMS', category: 'Programming', difficulty: 'Medium', hours: 50, icon: <Layers size={22} />, desc: 'Write SQL statements, design normalized schemas, and control ACID transactions.' },
      { code: 'BCA-303', name: 'Python Engineering', category: 'Programming', difficulty: 'Medium', hours: 50, icon: <Terminal size={22} />, desc: 'Build automation scripts, work with libraries, and handle file system pipelines.' },
      { code: 'BCA-304', name: 'Software Engineering', category: 'Theory', difficulty: 'Easy', hours: 40, icon: <BookOpen size={22} />, desc: 'Understand Agile methodologies, UML designs, testing structures, and deployments.' }
    ]
  },
  4: {
    number: 'Semester 4',
    title: 'Networking & Web Architectures',
    desc: 'Study data network layers, web routing sockets, and enterprise software compilation.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '4 Core Subjects',
    subjects: [
      { code: 'BCA-401', name: 'Java Platform Core', category: 'Programming', difficulty: 'Hard', hours: 60, icon: <Terminal size={22} />, desc: 'Learn JVM configurations, multithreading loops, AWT controls, and TCP sockets.' },
      { code: 'BCA-402', name: 'Computer Networks', category: 'Theory', difficulty: 'Medium', hours: 45, icon: <Globe size={22} />, desc: 'Configure IP headers, study routing protocols, subnets, and transport ports.' },
      { code: 'BCA-403', name: 'Web Technologies Stack', category: 'Practical', difficulty: 'Medium', hours: 50, icon: <Code2 size={22} />, desc: 'Develop dynamic interfaces using ES6 JS arrays, fetch APIs, and JSON structures.' },
      { code: 'BCA-404', name: 'Organizational Behaviors', category: 'Theory', difficulty: 'Easy', hours: 30, icon: <ShieldAlert size={22} />, desc: 'Understand corporate dynamics, resource management, and team leadership.' }
    ]
  },
  5: {
    number: 'Semester 5',
    title: 'Advanced Web & Cloud Architectures',
    desc: 'Deploy backend endpoints, create mobile app binaries, and configure serverless nodes.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '4 Core Subjects',
    subjects: [
      { code: 'BCA-501', name: 'Advanced Web Dev (React)', category: 'Programming', difficulty: 'Hard', hours: 60, icon: <Zap size={22} />, desc: 'Master virtual DOM, SPA routing, state hooks, and component lifecycles.' },
      { code: 'BCA-502', name: 'Cloud Server Platforms', category: 'Practical', difficulty: 'Hard', hours: 50, icon: <Cpu size={22} />, desc: 'Learn AWS virtualization, serverless compute functions, and Docker containers.' },
      { code: 'BCA-503', name: 'Mobile App Architecture', category: 'Programming', difficulty: 'Medium', hours: 50, icon: <Code2 size={22} />, desc: 'Build Android layouts, manage intents, sync databases, and run background services.' },
      { code: 'BCA-504', name: 'Network Security Crypt', category: 'Theory', difficulty: 'Hard', hours: 45, icon: <ShieldAlert size={22} />, desc: 'Learn cryptographic ciphers, public key handshakes, firewalls, and HTTPS protocols.' }
    ]
  },
  6: {
    number: 'Semester 6',
    title: 'AI, Canvas Graphics & Thesis Portfolio',
    desc: 'Build machine learning algorithms, rasterize 3D spaces, and launch a complete product.',
    duration: 'Est. Duration: 6 Months',
    subjectsCount: '4 Core Subjects',
    subjects: [
      { code: 'BCA-601', name: 'Machine Learning Core', category: 'Programming', difficulty: 'Hard', hours: 60, icon: <Terminal size={22} />, desc: 'Train regressors, design neural network layers, and validate model accuracy.' },
      { code: 'BCA-602', name: 'Computer Graphics Canvas', category: 'Theory', difficulty: 'Hard', hours: 45, icon: <Layers size={22} />, desc: 'Learn rasterization routines, 3D transformations, and WebGL shader matrixes.' },
      { code: 'BCA-603', name: 'Major Thesis Project', category: 'Practical', difficulty: 'Medium', hours: 80, icon: <Award size={22} />, desc: 'Build, deploy, package, and document a commercial-grade SaaS web product.' },
      { code: 'BCA-604', name: 'Enterprise Java Framework', category: 'Programming', difficulty: 'Hard', hours: 55, icon: <Cpu size={22} />, desc: 'Develop REST endpoints using Spring Boot, Hibernate ORMs, and Microservices.' }
    ]
  }
};

const Roadmap = () => {
  const navigate = useNavigate();
  const [activeSem, setActiveSem] = useState(1);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const carouselRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Check session storage for swipe hint overlay
  useEffect(() => {
    const hasSwiped = sessionStorage.getItem('hasSwipedSemesters');
    if (!hasSwiped) {
      setShowSwipeHint(true);
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
        sessionStorage.setItem('hasSwipedSemesters', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissHint = () => {
    setShowSwipeHint(false);
    sessionStorage.setItem('hasSwipedSemesters', 'true');
  };

  // Scroll carousel to a specific semester
  const scrollToSemester = useCallback((semNumber) => {
    setActiveSem(semNumber);
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const cardElement = container.querySelector(`[data-sem="${semNumber}"]`);
    if (cardElement) {
      isScrollingRef.current = true;
      const containerWidth = container.offsetWidth;
      const cardLeft = cardElement.offsetLeft;
      const cardWidth = cardElement.offsetWidth;
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  }, []);

  // Sync scroll position with active semester & pagination
  const handleCarouselScroll = useCallback(() => {
    if (isScrollingRef.current || !carouselRef.current) return;

    const container = carouselRef.current;
    const containerCenter = container.scrollLeft + (container.offsetWidth / 2);

    let closestSem = 1;
    let minDistance = Infinity;

    [1, 2, 3, 4, 5, 6].forEach((sem) => {
      const cardElement = container.querySelector(`[data-sem="${sem}"]`);
      if (cardElement) {
        const cardCenter = cardElement.offsetLeft + (cardElement.offsetWidth / 2);
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestSem = sem;
        }
      }
    });

    if (closestSem !== activeSem) {
      setActiveSem(closestSem);
    }

    if (showSwipeHint) {
      handleDismissHint();
    }
  }, [activeSem, showSwipeHint]);

  const getSubjectSlug = (code, name) => {
    const sem2Slugs = {
      'BCA-201': 'cpp-oop',
      'BCA-202': 'data-structures',
      'BCA-203': 'operating-systems',
      'BCA-204': 'web-technologies',
      'BCA-205': 'java-oop',
      'BCA-206': 'indian-constitution'
    };
    if (sem2Slugs[code]) return sem2Slugs[code];
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubjectClick = (sub) => {
    const techRoutes = {
      'BCA-303': '/technologies/python',
      'BCA-401': '/technologies/java'
    };

    const semesterRoutes = {
      'BCA-101': '/curriculum/semester-1/problem-solving-using-c'
    };

    if (semesterRoutes[sub.code]) {
      navigate(semesterRoutes[sub.code]);
    } else if (techRoutes[sub.code]) {
      navigate(techRoutes[sub.code]);
    } else {
      const slug = getSubjectSlug(sub.code, sub.name);
      navigate(`/curriculum/semester-2/${slug}`);
    }
    window.scrollTo(0, 0);
  };

  const features = [
    { label: 'Notes', icon: <BookOpen size={13} /> },
    { label: 'Important Questions', icon: <HelpCircle size={13} /> },
    { label: 'Quiz', icon: <Award size={13} /> },
    { label: 'Coding Practice', icon: <Code2 size={13} /> },
    { label: 'Previous Papers', icon: <FileText size={13} /> },
    { label: 'Assignments', icon: <Terminal size={13} /> },
    { label: 'Downloads', icon: <Download size={13} /> }
  ];

  return (
    <section id="roadmap" className="premium-roadmap-section">
      
      {/* Section Header */}
      <div className="section-header">
        <span className="premium-badge">ACADEMIC CURRICULUM</span>
        <h2 className="section-title text-gradient">Semester-wise Learning Journey</h2>
        <p className="section-subtitle">
          Explore every semester with structured subjects, study materials, quizzes, programming practice, previous year papers, and learning resources.
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────────
          STICKY SEMESTER NAVIGATION TABS (Mobile & Tablet)
         ──────────────────────────────────────────────────────────── */}
      <div className="sticky-semester-tabs-container">
        <div className="sticky-semester-tabs-wrapper">
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              className={`sticky-sem-tab-btn ${activeSem === sem ? 'active' : ''}`}
              onClick={() => scrollToSemester(sem)}
              aria-label={`Go to Semester ${sem}`}
            >
              <span>Sem {sem}</span>
              {activeSem === sem && (
                <motion.div 
                  className="sticky-tab-active-indicator" 
                  layoutId="activeSemTab" 
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          MOBILE & TABLET CAROUSEL VIEW (<1024px)
         ──────────────────────────────────────────────────────────── */}
      <div className="mobile-carousel-section">
        
        {/* Swipe Hint Toast Overlay */}
        <AnimatePresence>
          {showSwipeHint && (
            <motion.div 
              className="swipe-hint-toast"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleDismissHint}
            >
              <Sparkles size={14} style={{ color: '#c084fc' }} />
              <span>← Swipe to explore semesters →</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Snap Carousel Track */}
        <div 
          className="semesters-mobile-carousel" 
          ref={carouselRef}
          onScroll={handleCarouselScroll}
        >
          {[1, 2, 3, 4, 5, 6].map((sem) => {
            const semData = semestersInfo[sem];
            const isActive = activeSem === sem;

            return (
              <div
                key={sem}
                data-sem={sem}
                className={`mobile-sem-card-wrapper ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSemester(sem)}
              >
                <div className="mobile-sem-card glass-card">
                  <div className="mobile-card-top-row">
                    <span className="mobile-sem-tag">{semData.number}</span>
                    <span className="mobile-sub-count">{semData.subjectsCount}</span>
                  </div>

                  <h3 className="mobile-sem-title">{semData.title}</h3>
                  <p className="mobile-sem-desc">{semData.desc}</p>

                  <div className="mobile-card-bottom-row">
                    <span className="mobile-dur-pill">{semData.duration}</span>
                    <span className="mobile-active-hint">
                      {isActive ? 'Active Semester' : 'Tap to Select'}
                    </span>
                  </div>

                  {isActive && <div className="mobile-card-active-glow" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots Indicator */}
        <div className="carousel-pagination-dots" role="tablist">
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              className={`pagination-dot ${activeSem === sem ? 'active' : ''}`}
              onClick={() => scrollToSemester(sem)}
              aria-label={`Semester ${sem} dot`}
              role="tab"
              aria-selected={activeSem === sem}
            />
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          DESKTOP & WORKSPACE MAIN LAYOUT (≥1024px)
         ──────────────────────────────────────────────────────────── */}
      <div className="roadmap-main-layout">
        
        {/* Desktop Left Timeline (Hidden on Mobile) */}
        <div className="timeline-journey-container desktop-only-timeline">
          <div className="timeline-connector-line">
            <div className="timeline-line-glow" style={{ height: `${(activeSem - 1) * 20}%` }} />
          </div>

          <div className="semester-cards-stack">
            {[1, 2, 3, 4, 5, 6].map((sem) => {
              const semData = semestersInfo[sem];
              const isActive = activeSem === sem;
              const isCompleted = sem < activeSem;

              return (
                <div 
                  key={sem}
                  className={`semester-roadmap-node-card glass-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => setActiveSem(sem)}
                >
                  <div className="timeline-ring-node">
                    {isCompleted ? <CheckCircle2 size={16} /> : <span>{sem}</span>}
                  </div>

                  <div className="sem-node-content">
                    <div className="sem-node-header">
                      <span className="sem-number">{semData.number}</span>
                      <span className="sem-subjects-count">{semData.subjectsCount}</span>
                    </div>
                    <h4>{semData.title}</h4>
                    <p className="sem-node-desc">{semData.desc}</p>
                    
                    <div className="sem-node-footer">
                      <span className="sem-duration-badge">{semData.duration}</span>
                      <span className="expand-indicator-text">{isActive ? 'Showing Curriculum' : 'Click to Expand'}</span>
                    </div>
                  </div>
                  
                  <div className="card-hover-border-glow" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded Subjects Panel (Renders selected semester subjects) */}
        <div className="expanded-curriculum-panel">
          
          {/* Progress Preview UI Card */}
          <div className="curriculum-status-strip">
            <div className="progress-preview-card glass-card">
              <div className="progress-card-info">
                <span className="progress-title">Semester {activeSem} Progress Preview</span>
                <span className="progress-percent">68%</span>
              </div>
              <div className="progress-bar-block">
                <span className="progress-bar-fill">██████████░░░░</span>
              </div>
              <p className="progress-hint">Syncs automatically with your study checklist markers.</p>
            </div>
            
            {/* Features Badge Chips */}
            <div className="feature-badges-chips">
              {features.map((feat, idx) => (
                <span key={idx} className="feature-chip-badge glass-card">
                  {feat.icon}
                  {feat.label}
                </span>
              ))}
            </div>
          </div>

          <div className="expanded-curriculum-header">
            <h3>{semestersInfo[activeSem].title}</h3>
            <p>Select a subject to access study files, interactive quizzes, and coding sandboxes.</p>
          </div>

          {/* Subjects Grid */}
          <div className="subject-cards-grid-premium">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSem}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="subjects-inner-grid"
              >
                {semestersInfo[activeSem].subjects.map((sub, idx) => {
                  const isEasy = sub.difficulty === 'Easy';
                  const isMedium = sub.difficulty === 'Medium';
                  const diffColor = isEasy ? '#10b981' : isMedium ? '#f59e0b' : '#ef4444';

                  return (
                    <div 
                      key={idx}
                      className="premium-subject-details-card glass-card"
                      onClick={() => handleSubjectClick(sub)}
                    >
                      <div className="subject-header-top-row">
                        <div className="subject-icon-box">{sub.icon}</div>
                        <div className="subject-category-badges">
                          <span className="category-badge">{sub.category}</span>
                          <span className="difficulty-badge" style={{ color: diffColor, borderColor: `${diffColor}2a`, backgroundColor: `${diffColor}10` }}>
                            {sub.difficulty}
                          </span>
                        </div>
                      </div>

                      <h4 className="subject-title-h4">{sub.name}</h4>
                      <p className="subject-body-desc">{sub.desc}</p>

                      <div className="subject-meta-row">
                        <span className="sub-hours-meta">{sub.hours} Hours Est.</span>
                        <button 
                          className="open-subject-arrow-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubjectClick(sub);
                          }}
                        >
                          Open Subject <ArrowRight size={14} />
                        </button>
                      </div>
                      <div className="glow-border-layer" />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom CTA Card */}
          <div className="curriculum-bottom-cta">
            <div className="cta-curriculum-card glass-card">
              <div className="cta-glow-effect" />
              <div className="cta-curriculum-content">
                <div className="cta-text-group">
                  <h4>Continue Your Learning Journey</h4>
                  <p>Pick up right where you left off or check lecture notes, practice coding, and mock question banks.</p>
                </div>
                <div className="cta-curriculum-actions">
                  <button onClick={() => navigate('/technologies/cpp')} className="btn-premium-purple flex-center">
                    Explore Semester <Play size={13} fill="currentColor" />
                  </button>
                  <button onClick={() => {
                    const resSec = document.getElementById('resources');
                    if (resSec) resSec.scrollIntoView({ behavior: 'smooth' });
                  }} className="btn-premium flex-center">
                    View Resources
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Roadmap;
