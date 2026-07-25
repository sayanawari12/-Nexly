import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Code2, Cpu, Globe, Database, Terminal, 
  Layers, ChevronDown, ChevronRight, Zap, GitBranch, 
  ShieldAlert, Sparkles, CheckCircle2
} from 'lucide-react';
import '../../styles/MegaMenu.css';

// ─── SUBJECTS MEGA MENU DATA (Grouped Semester-wise) ────────────────────────
export const SUBJECTS_MEGA_DATA = [
  {
    semester: 'Semester 1',
    title: 'Programming Foundations',
    icon: <Code2 size={16} className="mm-sem-icon" />,
    badge: 'Foundation',
    subjects: [
      { code: 'BCA-101', name: 'Problem Solving Using C', path: '/curriculum/semester-1/problem-solving-using-c', active: true },
      { code: 'BCA-102', name: 'Computer Architecture', path: '/curriculum/semester-2/computer-architecture', active: true },
      { code: 'BCA-103', name: 'Mathematics Foundation', path: '/curriculum/semester-2/mathematics-foundation', active: true },
      { code: 'BCA-104', name: 'General English', path: '/curriculum/semester-2/general-english', active: true },
      { code: 'BCA-105', name: 'Indian Knowledge System', path: '/curriculum/semester-2/indian-knowledge-system', active: true },
      { code: 'BCA-106', name: 'Environmental Science', path: '/curriculum/semester-2/environmental-science', active: true }
    ]
  },
  {
    semester: 'Semester 2',
    title: 'Object Orientation & Structures',
    icon: <Layers size={16} className="mm-sem-icon" />,
    badge: 'Core OOP',
    subjects: [
      { code: 'BCA-201', name: 'OOP using C++', path: '/curriculum/semester-2/cpp-oop', active: true },
      { code: 'BCA-202', name: 'Data Structures', path: '/curriculum/semester-2/data-structures', active: true },
      { code: 'BCA-203', name: 'Operating Systems', path: '/curriculum/semester-2/operating-systems', active: true },
      { code: 'BCA-204', name: 'Web Technologies', path: '/curriculum/semester-2/web-technologies', active: true },
      { code: 'BCA-205', name: 'OOP using Java', path: '/curriculum/semester-2/java-oop', active: true },
      { code: 'BCA-206', name: 'Indian Constitution', path: '/curriculum/semester-2/indian-constitution', active: true }
    ]
  },
  {
    semester: 'Semester 3',
    title: 'Data Analytics & Software Systems',
    icon: <Database size={16} className="mm-sem-icon" />,
    badge: 'Analytics & Systems',
    subjects: [
      { code: 'BCA-301', name: 'Probability & Statistics', path: '/curriculum/semester-2/probability-and-statistics', active: true },
      { code: 'BCA-302', name: 'DBMS', path: '/curriculum/semester-2/dbms', active: true },
      { code: 'BCA-303', name: 'Python Programming', path: '/technologies/python', active: true },
      { code: 'BCA-304', name: 'Software Engineering', path: '/curriculum/semester-2/software-engineering', active: true },
      { code: 'BCA-305', name: 'Feature Engineering', path: '/curriculum/semester-2/feature-engineering', active: true },
      { code: 'BCA-306', name: 'Spreadsheet Data Analytics', path: '/curriculum/semester-2/data-analytics-spreadsheets', active: true }
    ]
  },
  {
    semester: 'Semester 4',
    title: 'Networking & Web Architectures',
    icon: <Globe size={16} className="mm-sem-icon" />,
    badge: 'Networks',
    subjects: [
      { code: 'BCA-401', name: 'Java Platform Core', path: '/technologies/java', active: true },
      { code: 'BCA-402', name: 'Computer Networks', path: '/curriculum/semester-2/computer-networks', active: true },
      { code: 'BCA-403', name: 'Web Technologies Stack', path: '/curriculum/semester-2/web-technologies-stack', active: true },
      { code: 'BCA-404', name: 'Organizational Behaviors', path: '/curriculum/semester-2/organizational-behaviors', active: true }
    ]
  },
  {
    semester: 'Semester 5',
    title: 'Advanced Web & Cloud',
    icon: <Zap size={16} className="mm-sem-icon" />,
    badge: 'Cloud & Web',
    subjects: [
      { code: 'BCA-501', name: 'Advanced Web Dev (React)', path: '/curriculum/semester-2/advanced-web-dev-react', active: true },
      { code: 'BCA-502', name: 'Cloud Server Platforms', path: '/curriculum/semester-2/cloud-server-platforms', active: true },
      { code: 'BCA-503', name: 'Mobile App Architecture', path: '/curriculum/semester-2/mobile-app-architecture', active: true },
      { code: 'BCA-504', name: 'Network Security Crypt', path: '/curriculum/semester-2/network-security-crypt', active: true }
    ]
  },
  {
    semester: 'Semester 6',
    title: 'AI, Graphics & Thesis',
    icon: <Cpu size={16} className="mm-sem-icon" />,
    badge: 'AI & Capstone',
    subjects: [
      { code: 'BCA-601', name: 'Machine Learning Core', path: '/curriculum/semester-2/machine-learning-core', active: true },
      { code: 'BCA-602', name: 'Computer Graphics Canvas', path: '/curriculum/semester-2/computer-graphics-canvas', active: true },
      { code: 'BCA-603', name: 'Major Thesis Project', path: '/curriculum/semester-2/major-thesis-project', active: true },
      { code: 'BCA-604', name: 'Enterprise Java Framework', path: '/curriculum/semester-2/enterprise-java-framework', active: true }
    ]
  }
];

// ─── TECHNOLOGIES MEGA MENU DATA (Grouped Categorically) ────────────────────
export const TECH_MEGA_DATA = [
  {
    category: 'Programming Languages',
    icon: <Code2 size={16} className="mm-cat-icon" />,
    items: [
      { name: 'C Language', path: '/technologies/c', active: true, tag: 'Core' },
      { name: 'C++', path: '/technologies/cpp', active: true, tag: 'OOP' },
      { name: 'Java', path: '/technologies/java', active: true, tag: 'Enterprise' },
      { name: 'Python', path: '/technologies/python', active: true, tag: 'Scripting' },
      { name: 'JavaScript', path: null, active: false, tag: 'Coming Soon' },
      { name: 'TypeScript', path: null, active: false, tag: 'Coming Soon' }
    ]
  },
  {
    category: 'Web Development',
    icon: <Globe size={16} className="mm-cat-icon" />,
    items: [
      { name: 'HTML5', path: null, active: false, tag: 'Coming Soon' },
      { name: 'CSS3', path: null, active: false, tag: 'Coming Soon' },
      { name: 'React.js', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Node.js', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Express.js', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Next.js', path: null, active: false, tag: 'Coming Soon' }
    ]
  },
  {
    category: 'Database & Storage',
    icon: <Database size={16} className="mm-cat-icon" />,
    items: [
      { name: 'MySQL / SQL', path: null, active: false, tag: 'Coming Soon' },
      { name: 'PostgreSQL', path: null, active: false, tag: 'Coming Soon' },
      { name: 'MongoDB', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Firebase', path: null, active: false, tag: 'Coming Soon' }
    ]
  },
  {
    category: 'Tools & DevOps',
    icon: <Terminal size={16} className="mm-cat-icon" />,
    items: [
      { name: 'Git Controls', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Linux OS', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Docker', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Kubernetes', path: null, active: false, tag: 'Coming Soon' },
      { name: 'Redis', path: null, active: false, tag: 'Coming Soon' }
    ]
  }
];

// ─── MEGA MENU DROPDOWN COMPONENT ───────────────────────────────────────────
export const MegaMenuDropdown = ({ type, isOpen, onClose, navigate }) => {
  if (!isOpen) return null;

  const handleItemClick = (path, active) => {
    if (active && path) {
      navigate(path);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="mm-overlay-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <div className="mm-glass-card">
          <div className="mm-top-shimmer" />

          {type === 'subjects' ? (
            <div className="mm-subjects-grid">
              <div className="mm-header-bar">
                <div className="mm-header-title flex-center gap-2">
                  <BookOpen size={16} style={{ color: '#c084fc' }} />
                  <span>Academic Subjects Curriculum</span>
                </div>
                <span className="mm-header-tag">BCA LMS</span>
              </div>

              <div className="mm-columns-wrapper">
                {SUBJECTS_MEGA_DATA.map((col, idx) => (
                  <div key={idx} className="mm-column">
                    <div className="mm-col-header">
                      <div className="flex-center gap-2">
                        {col.icon}
                        <span className="mm-sem-title">{col.semester}</span>
                      </div>
                      <span className="mm-badge-pill">{col.badge}</span>
                    </div>
                    <div className="mm-col-subhead">{col.title}</div>
                    <div className="mm-items-list">
                      {col.subjects.map((sub, sIdx) => (
                        <div 
                          key={sIdx} 
                          className={`mm-item-row ${sub.active ? 'active-item' : 'disabled-item'}`}
                          onClick={() => handleItemClick(sub.path, sub.active)}
                        >
                          <div className="mm-item-left">
                            <span className="mm-code-badge">{sub.code}</span>
                            <span className="mm-item-name">{sub.name}</span>
                          </div>
                          {sub.active ? (
                            <ChevronRight size={13} className="mm-arrow-icon" />
                          ) : (
                            <span className="mm-soon-badge">Soon</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mm-tech-grid">
              <div className="mm-header-bar">
                <div className="mm-header-title flex-center gap-2">
                  <Code2 size={16} style={{ color: '#c084fc' }} />
                  <span>Technology Stack &amp; Developer Hub</span>
                </div>
                <span className="mm-header-tag">Tech Stacks</span>
              </div>

              <div className="mm-columns-wrapper">
                {TECH_MEGA_DATA.map((cat, idx) => (
                  <div key={idx} className="mm-column">
                    <div className="mm-col-header">
                      <div className="flex-center gap-2">
                        {cat.icon}
                        <span className="mm-cat-title">{cat.category}</span>
                      </div>
                    </div>
                    <div className="mm-items-list">
                      {cat.items.map((item, iIdx) => (
                        <div 
                          key={iIdx} 
                          className={`mm-item-row ${item.active ? 'active-item' : 'disabled-item'}`}
                          onClick={() => handleItemClick(item.path, item.active)}
                        >
                          <div className="mm-item-left">
                            <span className="mm-item-name">{item.name}</span>
                          </div>
                          {item.active ? (
                            <span className="mm-active-tag">{item.tag}</span>
                          ) : (
                            <span className="mm-soon-badge">Soon</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── MOBILE ACCORDION MEGA MENU COMPONENT ──────────────────────────────────
export const MobileMegaMenuAccordion = ({ navigate, closeMobileMenu }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sec) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const handleLinkClick = (path, active) => {
    if (active && path) {
      navigate(path);
      closeMobileMenu();
    }
  };

  return (
    <div className="mm-mobile-accordion-wrapper">
      {/* Subjects Accordion */}
      <div className="mm-acc-group">
        <button 
          className={`mm-acc-header ${openSection === 'subjects' ? 'open' : ''}`}
          onClick={() => toggleSection('subjects')}
        >
          <span className="flex-center gap-2">
            <BookOpen size={16} style={{ color: '#c084fc' }} />
            <span>Subjects</span>
          </span>
          <ChevronDown size={16} className={`mm-acc-arrow ${openSection === 'subjects' ? 'rotate' : ''}`} />
        </button>

        {openSection === 'subjects' && (
          <div className="mm-acc-content">
            {SUBJECTS_MEGA_DATA.map((sem, sIdx) => (
              <div key={sIdx} className="mm-acc-sem-block">
                <div className="mm-acc-sem-title">{sem.semester} — {sem.badge}</div>
                {sem.subjects.map((sub, idx) => (
                  <div 
                    key={idx}
                    className={`mm-acc-item ${sub.active ? 'clickable' : 'coming-soon'}`}
                    onClick={() => handleLinkClick(sub.path, sub.active)}
                  >
                    <span>{sub.name}</span>
                    {sub.active ? (
                      <span className="mm-acc-code">{sub.code}</span>
                    ) : (
                      <span className="mm-soon-badge">Coming Soon</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Technologies Accordion */}
      <div className="mm-acc-group">
        <button 
          className={`mm-acc-header ${openSection === 'tech' ? 'open' : ''}`}
          onClick={() => toggleSection('tech')}
        >
          <span className="flex-center gap-2">
            <Code2 size={16} style={{ color: '#c084fc' }} />
            <span>Technologies</span>
          </span>
          <ChevronDown size={16} className={`mm-acc-arrow ${openSection === 'tech' ? 'rotate' : ''}`} />
        </button>

        {openSection === 'tech' && (
          <div className="mm-acc-content">
            {TECH_MEGA_DATA.map((cat, cIdx) => (
              <div key={cIdx} className="mm-acc-sem-block">
                <div className="mm-acc-sem-title">{cat.category}</div>
                {cat.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`mm-acc-item ${item.active ? 'clickable' : 'coming-soon'}`}
                    onClick={() => handleLinkClick(item.path, item.active)}
                  >
                    <span>{item.name}</span>
                    {item.active ? (
                      <span className="mm-acc-code">{item.tag}</span>
                    ) : (
                      <span className="mm-soon-badge">Coming Soon</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
