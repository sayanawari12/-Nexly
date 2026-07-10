import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Bookmark
} from 'lucide-react';
import '../styles/global.css';
import '../styles/sections.css';

const DataStructureSyllabus = () => {
  const navigate = useNavigate();
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
  }, []);

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

  // Syllabus data structure containing Units, Chapters, and Topics
  const syllabusData = [
    {
      unit: 1,
      id: 'unit-1',
      title: 'Unit 1: Fundamentals of Data Structures & Arrays',
      chapters: [
        {
          id: 'ch-1',
          title: 'Chapter 1: Introduction to Data Structure',
          topics: [
            'Data Structures Introduction',
            'Classification of Data Structures',
            'Operations of Data Structures',
            'Algorithm',
            'Algorithmic Notations',
            'Control Structures',
            'Complexity',
            'Time-Space Tradeoffs'
          ]
        },
        {
          id: 'ch-2',
          title: 'Chapter 2: Arrays',
          topics: [
            'Definition of Arrays',
            'Characteristics of Arrays',
            'Classification of Arrays',
            'Representation of Linear Array',
            'Traversing',
            'Insertion',
            'Deletion',
            'Linear Search',
            'Binary Search',
            'Comparison of Searching Methods',
            'Bubble Sort',
            'Selection Sort',
            'Insertion Sort',
            'Merge Sort',
            'Advantages of Arrays',
            'Drawbacks of Arrays',
            'Two-Dimensional Arrays',
            'Memory Representation',
            'Matrices',
            'Sparse Matrices',
            'Multi-Dimensional Arrays',
            'Memory Representation'
          ]
        }
      ]
    },
    {
      unit: 2,
      id: 'unit-2',
      title: 'Unit 2: Linked Lists & Hashing Systems',
      chapters: [
        {
          id: 'ch-3',
          title: 'Chapter 3: Linked Lists',
          topics: [
            'Linked List Definition',
            'Arrays vs Linked Lists',
            'Memory Representation',
            'Singly Linked List',
            'Header Linked List',
            'Circular Linked List',
            'Doubly Linked List',
            'Two-Way Header List',
            'Traversing',
            'Free Storage List',
            'Insertion',
            'Deletion',
            'Searching',
            'Doubly Linked List Operations',
            'Polynomial Representation',
            'Polynomial Addition Algorithm'
          ]
        },
        {
          id: 'ch-4',
          title: 'Chapter 4: Hashing and Collision',
          topics: [
            'Hashing Concepts',
            'Hash Terminologies',
            'Hash Table',
            'Hash Functions',
            'Collision Resolution',
            'Open Addressing',
            'Linear Probing',
            'Chaining',
            'Applications of Hashing'
          ]
        }
      ]
    },
    {
      unit: 3,
      id: 'unit-3',
      title: 'Unit 3: Stack Architectures & Recursion Logic',
      chapters: [
        {
          id: 'ch-5',
          title: 'Chapter 5: Stacks',
          topics: [
            'Stack Introduction',
            'Stack Representation',
            'Array Implementation',
            'PUSH',
            'POP',
            'Algorithms',
            'Programming Implementation',
            'Linked List Stack',
            'Overflow',
            'Underflow',
            'Applications',
            'Polish Notation',
            'Reverse Polish Notation',
            'Infix',
            'Prefix',
            'Postfix',
            'Postfix Evaluation',
            'Infix to Postfix Conversion'
          ]
        },
        {
          id: 'ch-6',
          title: 'Chapter 6: Recursion',
          topics: [
            'Recursion',
            'Tail Recursion',
            'Indirect Recursion',
            'Applications',
            'Runtime Stack',
            'Tower of Hanoi',
            'Euclid Algorithm',
            'Recursive Common Divisor',
            'Recursive Selection Sort',
            'Advantages',
            'Disadvantages'
          ]
        }
      ]
    },
    {
      unit: 4,
      id: 'unit-4',
      title: 'Unit 4: Queues, Graph Theory & Trees',
      chapters: [
        {
          id: 'ch-7',
          title: 'Chapter 7: Queue',
          topics: [
            'Queue',
            'Overflow',
            'Underflow',
            'Queue Representation',
            'Queue Operations',
            'Queue using Linked List',
            'Circular Queue',
            'Types of Queue',
            'Deque',
            'Priority Queue',
            'Applications'
          ]
        },
        {
          id: 'ch-8',
          title: 'Chapter 8: Graph',
          topics: [
            'Graph Introduction',
            'Graph Terminologies',
            'Graph Representation',
            'Adjacency Matrix',
            'Path Matrix',
            'Warshall Algorithm',
            'Linked Representation',
            'BFS',
            'DFS'
          ]
        },
        {
          id: 'ch-9',
          title: 'Chapter 9: Trees',
          topics: [
            'Trees',
            'Binary Tree',
            'Binary Tree Terminologies',
            'Types of Binary Tree',
            'Strictly Binary Tree',
            'Extended Binary Tree',
            'Complete Binary Tree',
            'Skewed Binary Tree',
            'Array Representation',
            'Linked Representation',
            'Tree Traversal',
            'Inorder',
            'Preorder',
            'Postorder',
            'Binary Search Tree',
            'BST Searching',
            'BST Deletion',
            'AVL Tree',
            'AVL Searching',
            'AVL Insertion'
          ]
        }
      ]
    }
  ];

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

          <h1 className="syllabus-subject-title">Data Structure</h1>

          <p className="syllabus-subject-desc">
            Learn fundamental and advanced data structures including Arrays, Linked Lists, Hashing, Stacks, Queues, Trees, Graphs and Recursion with algorithms, searching, sorting and memory representations.
          </p>

          {/* Metadata Grid */}
          <div className="syllabus-meta-row">
            <div className="meta-card">
              <Clock size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Est. Study Time</span>
                <span className="meta-val">45 Hours</span>
              </div>
            </div>
            <div className="meta-card">
              <Layers size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Total Units</span>
                <span className="meta-val">4 Units</span>
              </div>
            </div>
            <div className="meta-card">
              <Bookmark size={16} color="var(--accent-glow)" />
              <div className="meta-info">
                <span className="meta-label">Total Chapters</span>
                <span className="meta-val">9 Chapters</span>
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
              <FileText size={16} /> Previous Year Papers
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
                {syllabusData.map((unitData) => (
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
              {syllabusData.map((unitData) => {
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
                                  {chapter.topics.map((topic, tIdx) => (
                                    <div key={tIdx} className="topic-docs-item">
                                      <CheckCircle size={14} className="topic-check-icon" />
                                      <span className="topic-text">{topic}</span>
                                    </div>
                                  ))}
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

export default DataStructureSyllabus;
