import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  HelpCircle
} from 'lucide-react';
import '../styles/global.css';
import '../styles/sections.css';
import { SYLLABUS_DATA } from './SyllabusData';

const SubjectSyllabus = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  
  const normalizedSubjectId = subjectId === 'data-structure' ? 'data-structures' : subjectId;
  const subjectData = SYLLABUS_DATA[normalizedSubjectId] || SYLLABUS_DATA['data-structures'];

  const [expandedUnit, setExpandedUnit] = useState(1);
  const [activeUnit, setActiveUnit] = useState('unit-1');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll progress for the reading indicator
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

  // Track which unit is currently in view using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveUnit(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-100px 0px -40% 0px' }
    );

    const ids = ['unit-1', 'unit-2', 'unit-3', 'unit-4'];
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [subjectId]);

  const toggleUnit = (unitNum) => {
    setExpandedUnit(expandedUnit === unitNum ? null : unitNum);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="syllabus-page-wrapper">
      {/* Premium Top Reading Progress Bar */}
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="syllabus-page-container">
        
        {/* Navigation Breadcrumb */}
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Documentation Header */}
        <header className="syllabus-doc-header">
          <div className="syllabus-badge">
            <span className="badge-tag">Syllabus Guide</span>
            <span className="badge-sep">•</span>
            <span className="badge-sem">Semester 2</span>
          </div>

          <h1 className="syllabus-subject-title">{subjectData.title}</h1>

          <p className="syllabus-subject-desc">{subjectData.desc}</p>

          {/* Metadata Grid */}
          <div className="syllabus-meta-row">
            <div className="meta-card">
              <Clock size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Est. Study Time</span>
                <span className="meta-val">{subjectData.estTime}</span>
              </div>
            </div>
            <div className="meta-card">
              <Layers size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Total Units</span>
                <span className="meta-val">{subjectData.unitsCount} Units</span>
              </div>
            </div>
            <div className="meta-card">
              <Bookmark size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Total Chapters</span>
                <span className="meta-val">{subjectData.chaptersCount} Chapters</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="syllabus-actions-row">
            <button className="btn-premium-purple">
              <Download size={16} /> Download Syllabus
            </button>
            <button className="btn-premium">
              <BookOpen size={16} /> View Notes
            </button>
            <button className="btn-premium">
              <FileText size={16} /> Previous Year Questions
            </button>
            <button className="btn-premium">
              <HelpCircle size={16} /> Important Questions
            </button>
          </div>
        </header>

        {/* Two-Column Documentation Grid */}
        <div className="syllabus-doc-grid">
          
          {/* Left Sticky Sidebar (Desktop Only) */}
          <aside className="syllabus-sidebar">
            <div className="sidebar-sticky-box">
              <h4 className="sidebar-title">Syllabus Outline</h4>
              <ul className="sidebar-links-list">
                {subjectData.syllabus.map((unitData) => (
                  <li key={unitData.id}>
                    <button
                      className={`sidebar-nav-link ${activeUnit === unitData.id ? 'active' : ''}`}
                      onClick={() => {
                        scrollToSection(unitData.id);
                        setExpandedUnit(unitData.unit);
                      }}
                    >
                      <span className="dot" />
                      Unit {unitData.unit}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Main Accordions Content */}
          <main className="syllabus-main-content">
            <div className="units-accordion-stack">
              {subjectData.syllabus.map((unitData) => {
                const isExpanded = expandedUnit === unitData.unit;
                return (
                  <div 
                    key={unitData.id} 
                    id={unitData.id}
                    className={`unit-accordion-item glass-card ${isExpanded ? 'expanded' : ''}`}
                  >
                    {/* Accordion Trigger Header */}
                    <div 
                      className="unit-accordion-trigger"
                      onClick={() => toggleUnit(unitData.unit)}
                    >
                      <h3 className="unit-accordion-title">{unitData.title}</h3>
                      <span className="accordion-arrow-icon">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </div>

                    {/* Smooth Height Expansion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="unit-chapters-container">
                            {unitData.chapters.map((chapter) => (
                              <div key={chapter.id} className="chapter-docs-card glass-card">
                                <h4 className="chapter-docs-title">{chapter.title}</h4>
                                <div className="topics-docs-grid">
                                  {chapter.topics.map((topic, tIdx) => {
                                    const topicObj = typeof topic === 'object' ? topic : { name: topic };
                                    const isIndented = topicObj.name.startsWith('- ') || topicObj.name.startsWith('  - ');
                                    const displayTopic = isIndented ? topicObj.name.replace(/^(\s*-\s*)/, '') : topicObj.name;
                                    
                                    return (
                                      <div 
                                        key={tIdx} 
                                        className={`topic-docs-item ${isIndented ? 'indented-topic' : ''}`}
                                        style={isIndented ? { paddingLeft: '32px', opacity: 0.85 } : {}}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                          <CheckCircle 
                                            size={14} 
                                            className="topic-check-icon" 
                                            style={isIndented ? { opacity: 0.6, width: '12px', height: '12px' } : {}} 
                                          />
                                          <span className="topic-text">{displayTopic}</span>
                                        </div>
                                        
                                        {/* Future-compatible resource attachment container */}
                                        {topicObj.resources && (
                                          <div className="topic-resources-links" style={{ display: 'flex', gap: '8px', opacity: 0.8 }}>
                                            {topicObj.resources.notes && (
                                              <span className="resource-mini-badge" title="View Notes">Notes</span>
                                            )}
                                            {topicObj.resources.questions && (
                                              <span className="resource-mini-badge" title="Important Questions">Q&A</span>
                                            )}
                                            {topicObj.resources.pyqs && (
                                              <span className="resource-mini-badge" title="Previous Year Questions">PYQ</span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
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
          </main>

        </div>

      </div>
    </div>
  );
};

export default SubjectSyllabus;
