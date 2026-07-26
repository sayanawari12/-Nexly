import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, ChevronLeft, ArrowLeft, BookOpen, Map, Code2, Terminal,
  HelpCircle, Trophy, Briefcase, Download, Lock, ChevronDown,
  ChevronUp, Clock, CheckCircle, Play, Copy, Bookmark, BarChart2,
  Zap, Star, Users, Lightbulb, Target, Layers, Globe, Database,
  Award, AlertTriangle, Info, TrendingUp, FileText, FolderOpen,
  RotateCcw, ArrowRight, Check, X, Eye, EyeOff, Search,
  Compass, Braces, GitFork, MousePointer, ChevronsRight, Box, Component, HardDrive,
  RefreshCw, Cpu, Sliders, Hash, Link2, Rocket, Monitor, Activity, Calculator, Repeat, Type
} from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import { useProgress } from '../context/ProgressContext';
import useAuth from '../hooks/useAuth';
import { saveUserNote, getUserNote, addUserBookmark } from '../services/userDatabase';
import C_PROGRAMS from './programs_data.json';
import '../styles/CLearningHub.css';

/* ============================================================
   DATA LAYER
   ============================================================ */

import {
  C_LESSONS,
  C_QUIZ_DATA,
  C_INTERVIEW_QUESTIONS,
  C_DOWNLOADS,
  C_PROJECTS,
  C_PRACTICE_PROBLEMS,
  C_STARTER_CODE
} from '../data/learningHubs/cHubData';

export {
  C_LESSONS,
  C_QUIZ_DATA,
  C_INTERVIEW_QUESTIONS,
  C_DOWNLOADS,
  C_PROJECTS,
  C_PRACTICE_PROBLEMS,
  C_STARTER_CODE
};

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

const CCodeBlock = ({ code, lang = 'C' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="c-code-block">
      <div className="c-code-block-header">
        <span className="c-code-lang">{lang}</span>
        <button className="c-copy-btn" onClick={handleCopy}>
          {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const COutputBlock = ({ output }) => (
  <div className="c-output-block">
    <div className="c-output-header"><Terminal size={12} /> Output</div>
    <pre>{output}</pre>
  </div>
);

/* ============================================================
   TAB: OVERVIEW
   ============================================================ */
const OverviewTab = ({ setActiveTab }) => (
  <div className="c-tab-content c-overview-grid">
    <div className="c-overview-left">
      <div className="c-about-card">
        <h3>⚙️ About C Programming</h3>
        <p>C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It was designed to develop the UNIX operating system and remains one of the most influential languages ever created.</p>
        <p style={{ marginTop: '10px' }}>Often called the "mother of all programming languages," C influenced C++, Java, Python, Go, and Rust. It provides direct memory control via pointers, making it the language of choice for system software and embedded programming.</p>
        <div className="c-why-grid" style={{ marginTop: '16px' }}>
          {[{ icon: '⚡', title: 'Fast & Efficient', desc: 'Compiled to native machine code' }, { icon: '🔧', title: 'Low-Level Control', desc: 'Direct memory & hardware access' }, { icon: '📦', title: 'Portable', desc: 'Runs on any platform with a C compiler' }, { icon: '🏗️', title: 'Foundation', desc: 'Basis of OS, compilers, databases' }].map((w, i) => (
            <div key={i} className="c-why-item">
              <div className="c-why-icon">{w.icon}</div>
              <div><h5>{w.title}</h5><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Target size={17} /> Learning Objectives</h3>
        <div className="c-objectives-list">
          {['Master C fundamentals: variables, data types, operators, and I/O', 'Control flow: conditions, loops, and function design', 'Deep understanding of arrays, strings, and character manipulation', 'Pointer mastery: arithmetic, dynamic memory, double pointers', 'Structures, unions, enums, and user-defined data types', 'Implement core data structures: stack, queue, linked list', 'File handling for persistent data storage', 'Sorting and searching algorithms with complexity analysis', 'Prepare for technical interviews with C'].map((obj, i) => (
            <div key={i} className="c-obj-item"><div className="c-obj-dot" /><span>{obj}</span></div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Briefcase size={17} /> Career Opportunities</h3>
        <div className="c-career-grid">
          {[{ icon: '🖥️', title: 'Systems Programmer', sub: 'OS, Kernels, Drivers' }, { icon: '🔌', title: 'Embedded Engineer', sub: 'Microcontrollers, IoT' }, { icon: '🎮', title: 'Game Developer', sub: 'Low-level Game Engines' }, { icon: '🔒', title: 'Security Researcher', sub: 'Exploit Analysis, Malware' }, { icon: '📡', title: 'Network Engineer', sub: 'Networking Protocols' }, { icon: '🤖', title: 'Robotics Engineer', sub: 'Real-time Control Systems' }].map((c, i) => (
            <div key={i} className="c-career-card">
              <div className="icon">{c.icon}</div>
              <h5>{c.title}</h5>
              <p>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Globe size={17} /> C Ecosystem & Standard Libraries</h3>
        <div className="c-ecosystem-grid">
          {['stdio.h', 'stdlib.h', 'string.h', 'math.h', 'time.h', 'ctype.h', 'limits.h', 'stdint.h', 'stdbool.h', 'assert.h', 'errno.h', 'signal.h', 'pthread.h', 'socket.h', 'GCC', 'Clang', 'LLVM', 'Make/CMake'].map((lib, i) => (
            <div key={i} className="c-eco-chip">⚙ {lib}</div>
          ))}
        </div>
      </div>
    </div>

    <div className="c-overview-right">
      <div className="c-popular-topics">
        <h4>🔥 Popular Topics</h4>
        {['Pointers & Memory', 'Structures & Unions', 'Dynamic Memory (malloc)', 'File Handling', 'Linked Lists', 'Sorting Algorithms', 'Recursion', 'Bitwise Operators'].map((topic, i) => (
          <div key={i} className="c-topic-link" onClick={() => setActiveTab('lessons')}>
            <div className="c-topic-link-left"><div className="c-topic-num">{i + 1}</div>{topic}</div>
            <ChevronRight size={14} />
          </div>
        ))}
        <button className="c-view-all-btn" onClick={() => setActiveTab('lessons')}>
          View All Lessons <ArrowRight size={13} />
        </button>
      </div>

      <div className="c-about-card" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.06))', border: '1px solid rgba(139,92,246,0.2)' }}>
        <h3>▶️ Continue Learning</h3>
        <p style={{ marginBottom: '14px' }}>Start from the basics or jump to any lesson. Master C step by step from Hello World to dynamic data structures.</p>
        <button className="c-btn-primary" onClick={() => setActiveTab('lessons')} style={{ width: '100%', justifyContent: 'center' }}>
          <Play size={15} /> Start Lesson 1
        </button>
      </div>

      <div className="c-community-card">
        <h4>👥 Community</h4>
        <p>C programmers powering the world's infrastructure</p>
        <div className="c-community-stats">
          <div className="c-comm-stat"><strong>30yr+</strong><span>Active</span></div>
          <div className="c-comm-stat"><strong>#2</strong><span>TIOBE Index</span></div>
          <div className="c-comm-stat"><strong>99%</strong><span>Embedded Use</span></div>
        </div>
        <button className="c-login-btn"><Users size={14} /> Join Community</button>
      </div>

      <div className="c-about-card">
        <h3><BarChart2 size={17} /> Progress Summary</h3>
        {[{ label: 'Lessons Completed', val: '0 / 24', pct: 0 }, { label: 'Programs Solved', val: '0 / 50+', pct: 0 }, { label: 'Quiz Progress', val: '0 / 30', pct: 0 }, { label: 'Projects Completed', val: '0 / 9', pct: 0 }].map((p, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              <span>{p.label}</span><span>{p.val}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.pct}%`, background: 'linear-gradient(90deg, var(--primary-purple), var(--accent-glow))', borderRadius: '100px' }} />
            </div>
          </div>
        ))}
        <button className="c-login-btn" style={{ marginTop: '8px' }}><Lock size={14} /> Login to Save Progress</button>
      </div>
    </div>
  </div>
);

/* ============================================================
   TAB: ROADMAP (WINDING ROAD JOURNEY)
   ============================================================ */
/* ============================================================
   TAB: ROADMAP (WINDING ROAD JOURNEY)
   ============================================================ */
// C ROADMAP JOURNEY TAB IMPLEMENTATION WITH FULL PROGRESS AND CHALLENGES INCLUDED BELOW

const RoadmapTab = ({ setActiveTab, setActiveLessonId, completed, toggleComplete }) => {
  const roadWrapperRef = useRef(null);
  const navigate = useNavigate();
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(null); // checkpoint challenge modal state
  const [challengeQuestionState, setChallengeQuestionState] = useState({ active: false, answered: false, correct: false, selectedOpt: null });
  const [bookmarkedMilestones, setBookmarkedMilestones] = useState(new Set());
  const [activeKeyboardIndex, setActiveKeyboardIndex] = useState(0);

  const [motivationIdx, setMotivationIdx] = useState(0);
  const motivations = [
    "Every expert programmer starts with strong fundamentals.",
    "You've completed one journey. Your next adventure begins now.",
    "Keep building. Keep learning."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMotivationIdx(prev => (prev + 1) % motivations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ProgressRing = ({ percentage, color = '#8B5CF6', size = 52 }) => {
    const stroke = 4;
    const radius = 20;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg height={size} width={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const tracks = [
    { name: 'C Programming', progress: 100, color: '#10B981', status: 'completed' },
    { name: 'Python', progress: 45, color: '#A855F7', status: 'in-progress' },
    { name: 'Java', progress: 15, color: '#A855F7', status: 'in-progress' },
    { name: 'C++ Programming', progress: 0, color: '#6B7280', status: 'not-started' },
    { name: 'HTML & CSS', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'JavaScript', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'React.js', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Node.js', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'SQL & Databases', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Git & Github', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Linux System', progress: 0, color: '#6B7280', status: 'locked' }
  ];

  const careerPaths = [
    {
      title: 'Path 1: Software Engineer (Systems)',
      steps: ['Foundations', 'C Programming', 'C++', 'Data Structures', 'Algorithms', 'Projects', 'Interviews', 'Software Engineer']
    },
    {
      title: 'Path 2: Web Developer (Full Stack)',
      steps: ['Web Dev', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Full Stack Developer']
    },
    {
      title: 'Path 3: AI / ML Engineer',
      steps: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'Artificial Intelligence']
    },
    {
      title: 'Path 4: Backend / Cloud Architect',
      steps: ['SQL', 'Database Design', 'Backend APIs', 'Cloud Deployment']
    }
  ];

  const achievementsList = [
    { title: 'First Lesson', desc: 'Write your first C statement.', emoji: '🏅', unlocked: completed.size >= 1 },
    { title: 'First Quiz', desc: 'Pass your first fundamentals quiz.', emoji: '🏅', unlocked: completed.has(1) },
    { title: 'Variables Master', desc: 'Understand datatypes specifications.', emoji: '🏅', unlocked: completed.has(4) },
    { title: 'Loop Expert', desc: 'Complete loop iterations loops.', emoji: '🏅', unlocked: completed.has(8) },
    { title: 'Pointer Explorer', desc: 'Dereference standard addresses variables.', emoji: '🏅', unlocked: completed.has(12) },
    { title: 'Memory Navigator', desc: 'Use malloc and calloc heap allocations.', emoji: '🏅', unlocked: completed.has(18) },
    { title: 'C Programming Master', desc: 'Complete all 24 C lessons.', emoji: '🏅', unlocked: completed.has(24) },
    { title: 'Interview Ready', desc: 'Unlock mock evaluation checks.', emoji: '🏅', unlocked: completed.has(24) }
  ];

  const renderNodeIcon = (node) => {
    const iconColor = '#c084fc';
    const iconSize = 22;

    if (node.type === 'start') {
      return <Rocket size={24} style={{ color: '#10B981', filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.5))' }} />;
    }
    if (node.type === 'checkpoint') {
      return <Compass size={22} style={{ color: '#ef4444', filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' }} />;
    }

    switch (node.step) {
      case 1: return <BookOpen size={iconSize} style={{ color: iconColor }} />;
      case 2: return <Terminal size={iconSize} style={{ color: iconColor }} />;
      case 3: return <Code2 size={iconSize} style={{ color: iconColor }} />;
      case 4: return <Braces size={iconSize} style={{ color: iconColor }} />;
      case 5: return <Calculator size={iconSize} style={{ color: iconColor }} />;
      case 6: return <Monitor size={iconSize} style={{ color: iconColor }} />;
      case 7: return <GitFork size={iconSize} style={{ color: iconColor }} />;
      case 8: return <Repeat size={iconSize} style={{ color: iconColor }} />;
      case 9: return <Activity size={iconSize} style={{ color: iconColor }} />;
      case 10: return <Layers size={iconSize} style={{ color: iconColor }} />;
      case 11: return <Type size={iconSize} style={{ color: iconColor }} />;
      case 12: return <MousePointer size={iconSize} style={{ color: iconColor }} />;
      case 13: return <ChevronsRight size={iconSize} style={{ color: iconColor }} />;
      case 14: return <Box size={iconSize} style={{ color: iconColor }} />;
      case 15: return <Component size={iconSize} style={{ color: iconColor }} />;
      case 16: return <HardDrive size={iconSize} style={{ color: iconColor }} />;
      case 17: return <RefreshCw size={iconSize} style={{ color: iconColor }} />;
      case 18: return <Cpu size={iconSize} style={{ color: iconColor }} />;
      case 19: return <Sliders size={iconSize} style={{ color: iconColor }} />;
      case 20: return <FolderOpen size={iconSize} style={{ color: iconColor }} />;
      case 21: return <Hash size={iconSize} style={{ color: iconColor }} />;
      case 22: return <Search size={iconSize} style={{ color: iconColor }} />;
      case 23: return <TrendingUp size={iconSize} style={{ color: iconColor }} />;
      case 24: return <Link2 size={iconSize} style={{ color: iconColor }} />;
      case 25: return <Rocket size={iconSize} style={{ color: iconColor }} />;
      case 26: return <Trophy size={iconSize} style={{ color: iconColor }} />;
      default: return <BookOpen size={iconSize} style={{ color: iconColor }} />;
    }
  };

  const ROAD_NODES = [
    { id: 'start', type: 'start', title: 'Start of Journey', emoji: '🚩', desc: 'Welcome to your C Programming journey! Step on the path to master variables, functions, recursion, and low-level memory architectures.', duration: '15 hrs total', lessons: '24 lessons' },
    
    // Unit 1: C Fundamentals (Steps 1 to 6)
    { id: 1, step: 1, title: 'Introduction', diff: 'Easy', time: '20 min', emoji: '📘', type: 'lesson', desc: 'Basics of C programming.' },
    { id: 2, step: 2, title: 'Setup & Compiler', diff: 'Easy', time: '25 min', emoji: '💻', type: 'lesson', desc: 'Setup GCC.' },
    { id: 3, step: 3, title: 'Structure', diff: 'Easy', time: '25 min', emoji: '📘', type: 'lesson', desc: 'Main function.' },
    { id: 4, step: 4, title: 'Variables & Types', diff: 'Easy', time: '30 min', emoji: '🔤', type: 'lesson', desc: 'Types of variables.' },
    { id: 5, step: 5, title: 'Operators', diff: 'Easy', time: '30 min', emoji: '➕', type: 'lesson', desc: 'Operators.' },
    { id: 6, step: 6, title: 'Input & Output', diff: 'Easy', time: '25 min', emoji: '➕', type: 'lesson', desc: 'printf and scanf.' },
    
    // Checkpoint 1
    { id: 'cp1', type: 'checkpoint', title: 'C Fundamentals Challenge', emoji: '🏁', section: 'C Fundamentals', desc: 'Unlock this milestone challenge to test your fundamentals basics.', reqSteps: [1,2,3,4,5,6] },
    
    // Unit 2: Control Flow (Steps 7 to 8)
    { id: 7, step: 7, title: 'Conditionals', diff: 'Easy', time: '30 min', emoji: '🔀', type: 'lesson', desc: 'if-else & switch.' },
    { id: 8, step: 8, title: 'Loops', diff: 'Easy', time: '35 min', emoji: '🔁', type: 'lesson', desc: 'for, while.' },
    
    // Checkpoint 2
    { id: 'cp2', type: 'checkpoint', title: 'Control Flow Challenge', emoji: '🏁', section: 'Control Flow', desc: 'Test your loops and conditionals control logic.', reqSteps: [7,8] },
    
    // Unit 3: Functions & Arrays (Steps 9 to 11)
    { id: 9, step: 9, title: 'Functions', diff: 'Easy', time: '40 min', emoji: '⚙', type: 'lesson', desc: 'Functions.' },
    { id: 10, step: 10, title: 'Arrays', diff: 'Easy', time: '35 min', emoji: '📦', type: 'lesson', desc: 'Arrays.' },
    { id: 11, step: 11, title: 'Strings', diff: 'Easy', time: '35 min', emoji: '📝', type: 'lesson', desc: 'Strings.' },
    
    // Checkpoint 3
    { id: 'cp3', type: 'checkpoint', title: 'Functions & Arrays Challenge', emoji: '🏁', section: 'Functions & Arrays', desc: 'Test functional reuse and array manipulation.', reqSteps: [9,10,11] },
    
    // Unit 4: Pointers & Memory (Steps 12 to 18)
    { id: 12, step: 12, title: 'Pointers', diff: 'Medium', time: '50 min', emoji: '👉', type: 'lesson', desc: 'Pointers.' },
    { id: 13, step: 13, title: 'Double Pointers', diff: 'Medium', time: '35 min', emoji: '👉', type: 'lesson', desc: 'Double pointers.' },
    { id: 14, step: 14, title: 'Structures', diff: 'Medium', time: '40 min', emoji: '🏗', type: 'lesson', desc: 'Structures.' },
    { id: 15, step: 15, title: 'Unions & Enums', diff: 'Medium', time: '30 min', emoji: '🏗', type: 'lesson', desc: 'Unions & enums.' },
    { id: 16, step: 16, title: 'Storage Classes', diff: 'Medium', time: '30 min', emoji: '🏗', type: 'lesson', desc: 'Storage classes.' },
    { id: 17, step: 17, title: 'Recursion', diff: 'Medium', time: '45 min', emoji: '⚙', type: 'lesson', desc: 'Recursion.' },
    { id: 18, step: 18, title: 'Dynamic Memory', diff: 'Medium', time: '45 min', emoji: '💾', type: 'lesson', desc: 'malloc.' },
    
    // Checkpoint 4
    { id: 'cp4', type: 'checkpoint', title: 'Pointers & Memory Challenge', emoji: '🏁', section: 'Pointers & Memory', desc: 'Direct memory accesses, heap sizing, and structure challenges.', reqSteps: [12,13,14,15,16,17,18] },
    
    // Unit 5: File Handling & Low Level (Steps 19 to 20)
    { id: 19, step: 19, title: 'Preprocessors', diff: 'Medium', time: '30 min', emoji: '💻', type: 'lesson', desc: 'Preprocessors.' },
    { id: 20, step: 20, title: 'File Handling', diff: 'Medium', time: '40 min', emoji: '📂', type: 'lesson', desc: 'File operations.' },
    
    // Checkpoint 5
    { id: 'cp5', type: 'checkpoint', title: 'File Handling Challenge', emoji: '🏁', section: 'File Handling', desc: 'Verify preprocessors macros and disk IO files streaming.', reqSteps: [19,20] },
    
    // Unit 6: Advanced Topics & Projects (Steps 21 to 24)
    { id: 21, step: 21, title: 'Bitwise', diff: 'Hard', time: '40 min', emoji: '➕', type: 'lesson', desc: 'Bitwise ops.' },
    { id: 22, step: 22, title: 'Searching', diff: 'Hard', time: '40 min', emoji: '🌳', type: 'lesson', desc: 'Searching.' },
    { id: 23, step: 23, title: 'Sorting', diff: 'Hard', time: '55 min', emoji: '🌳', type: 'lesson', desc: 'Sorting.' },
    { id: 24, step: 24, title: 'Linked Lists', diff: 'Hard', time: '60 min', emoji: '🌳', type: 'lesson', desc: 'Linked Lists.' },
    
    // Checkpoint 6
    { id: 'cp6', type: 'checkpoint', title: 'Mini Projects Challenge', emoji: '🏁', section: 'Mini Projects', desc: 'Consolidate everything with linked list structures and full algorithms.', reqSteps: [21,22,23,24] },
    
    // Final steps
    { id: 25, step: 25, title: 'Mini Projects', diff: 'Hard', time: '15-20 hrs', emoji: '🚀', type: 'projects', desc: 'Mini projects.' },
    { id: 26, step: 26, title: 'Interview Prep', diff: 'Hard', time: '10 hrs', emoji: '🏆', type: 'interview', desc: 'Interview prep.' }
  ];

  const learningObjectives = {
    1: ['Understand the history and evolution of C', 'Write, compile, and run your first C program', 'Understand basic structure of main()'],
    2: ['Install GCC compiler on Windows/Mac/Linux', 'Configure Visual Studio Code for C development', 'Compile files manually in terminal'],
    3: ['Understand preprocessor directives like #include', 'Identify role of main() function', 'Analyze statements and semi-colons syntax'],
    4: ['Declare integer, character, float, and double types', 'Learn format specifiers like %d and %f', 'Practice type casting and conversion basics'],
    5: ['Use arithmetic operators (+, -, *, /, %)', 'Apply logical operators (&&, ||, !)', 'Understand precedence and associativity rules'],
    6: ['Master printf formatted console output', 'Read user inputs safely with scanf', 'Format output with escape sequences like \\n and \\t'],
    7: ['Write if-else conditional branches', 'Use switch-case for multi-value checks', 'Understand nested conditional logic structures'],
    8: ['Master counter loops with for', 'Apply entry-conditioned while loops', 'Use exit-conditioned do-while loops'],
    9: ['Understand function declaration and definition', 'Pass arguments by value to functions', 'Understand returning values from functions'],
    10: ['Declare and initialize single-dimensional arrays', 'Access elements via 0-based index pointer', 'Understand nested loops with multi-dimensional matrices'],
    11: ['Initialize char arrays representing text strings', 'Use string functions like strlen, strcpy, strcat', 'Avoid buffer overflow security vulnerabilities'],
    12: ['Understand pointer concepts and memory addresses', 'Dereference pointers using asterisk (*)', 'Understand null and void pointer classifications'],
    13: ['Declare double pointers (pointers pointing to pointers)', 'Understand multiple levels of memory indirection', 'Apply double pointer references inside subroutines'],
    14: ['Declare user-defined struct types', 'Access struct fields using dot (.) operator', 'Understand nested structures array declarations'],
    15: ['Declare space-sharing union fields', 'Create enums for readable constants mapping', 'Compare memory allocations of structs vs unions'],
    16: ['Understand local, global, auto, extern storage types', 'Learn static variable lifetime optimizations', 'Manage register allocation specifications'],
    17: ['Write recursive functions calling themselves', 'Define base case condition boundary checks', 'Compare stack memory usage of recursion vs loops'],
    18: ['Allocate runtime memory using malloc and calloc', 'Resize allocated heap space with realloc', 'Free memory blocks preventing memory leakage leaks'],
    19: ['Define macro replacements using #define directive', 'Execute conditional compiling using #ifdef', 'Understand compile stages preprocessor operations'],
    20: ['Open files in read, write, append file modes', 'Read files using fscanf and fgets', 'Flush buffer handles and close file pointers'],
    21: ['Operate on data bits using AND, OR, XOR, NOT', 'Perform shift operations (<< and >>)', 'Apply mask bits mapping state registries'],
    22: ['Code linear search traversals on arrays', 'Build binary search recursively on sorted files', 'Analyze search efficiency big-O bounds'],
    23: ['Code bubble sorting swaps loops', 'Write selections sorting scanning operations', 'Apply insertion sorting placements logic'],
    24: ['Define linked list Node structs with self references', 'Insert nodes at head and tail references', 'Traverse list nodes printing data fields'],
    25: ['Build interactive menu games in console', 'Implement project systems file integrations', 'Structure multi-module files compilation'],
    26: ['Practice core pointer questions commonly asked', 'Answer storage class scope viva checks', 'Prepare mock dry-run evaluations']
  };

  const topicsCovered = {
    1: ['Language History', 'WORA compilation model', 'Basic main signature'],
    2: ['GCC Tooling', 'VS Code Setup', 'Compile and Run Command'],
    3: ['Preprocessor directives', 'Code Blocks & Scopes', 'Statements & Semicolons'],
    4: ['Data Types bounds', 'Format Specifiers', 'Type Casting'],
    5: ['Arithmetic Operators', 'Relational & Logical Operators', 'Precedence rules'],
    6: ['printf format flags', 'scanf buffer reading', 'Escape sequences'],
    7: ['if-else chains', 'switch-case blocks', 'Ternary conditionals'],
    8: ['for loops', 'while vs do-while', 'break & continue statements'],
    9: ['Function signatures', 'Parameters vs Arguments', 'Return values'],
    10: ['1D Arrays', '2D Matrix storage', 'Boundary conditions'],
    11: ['char array null terminator', 'string.h operations', 'Safe buffers'],
    12: ['Memory Addresses (&)', 'Dereferencing (*)', 'Pointer Arithmetic'],
    13: ['Indirection syntax', 'Pointer array references', 'Address dereferences'],
    14: ['struct keyword', 'Member accesses', 'Array of structures'],
    15: ['union keyword', 'enum definitions', 'Size comparisons'],
    16: ['auto & register', 'static & extern', 'Stack variables'],
    17: ['Call Stack layout', 'Base cases definitions', 'Stack overflow alerts'],
    18: ['malloc & calloc', 'realloc expansions', 'free operations'],
    19: ['#define macros', '#include syntax', '#ifdef assertions'],
    20: ['fopen & fclose', 'fprintf & fscanf', 'fgets & fputs'],
    21: ['Bitwise operations', 'Shift boundaries', 'Bitmask checks'],
    22: ['Linear scanning', 'Binary search pivots', 'O(log N) scale'],
    23: ['Bubble Sort loops', 'Selection min values', 'Insertion indexing'],
    24: ['Node allocation', 'Pointer relink operations', 'Sequential search'],
    25: ['Game state loop', 'File persistence', 'Multi-file compilation'],
    26: ['Pointer dry runs', 'Memory leak questions', 'Scope evaluations']
  };

  const prerequisites = {
    1: 'None',
    2: 'Introduction',
    3: 'Setup & Compiler',
    4: 'Structure',
    5: 'Variables & Types',
    6: 'Operators',
    7: 'Input & Output',
    8: 'Conditionals',
    9: 'Loops',
    10: 'Functions',
    11: 'Arrays',
    12: 'Strings',
    13: 'Pointers',
    14: 'Double Pointers',
    15: 'Structures',
    16: 'Unions & Enums',
    17: 'Storage Classes',
    18: 'Recursion',
    19: 'Dynamic Memory',
    20: 'Preprocessors',
    21: 'File Handling',
    22: 'Bitwise',
    23: 'Searching',
    24: 'Sorting',
    25: 'Linked Lists',
    26: 'Mini Projects'
  };

  const practiceTimes = {
    1: '30 min',
    2: '45 min',
    3: '30 min',
    4: '1 hr',
    5: '1.5 hrs',
    6: '1 hr',
    7: '1.5 hrs',
    8: '2 hrs',
    9: '2 hrs',
    10: '2.5 hrs',
    11: '2 hrs',
    12: '4 hrs',
    13: '3 hrs',
    14: '3 hrs',
    15: '2 hrs',
    16: '1.5 hrs',
    17: '3 hrs',
    18: '4 hrs',
    19: '2 hrs',
    20: '3 hrs',
    21: '2.5 hrs',
    22: '3 hrs',
    23: '4 hrs',
    24: '6 hrs',
    25: '12 hrs',
    26: '8 hrs'
  };

  const challengeQuestions = {
    'cp1': { q: 'What is the output of the following statement: printf("%d", 5 + 3 * 2);', opts: ['16', '11', '21', 'Syntax Error'], correct: 1 },
    'cp2': { q: 'Which statement immediately exits a loop structure in C?', opts: ['continue', 'return', 'break', 'goto'], correct: 2 },
    'cp3': { q: 'If int arr[5] = {1, 2}; what is the value of arr[3]?', opts: ['Garbage Value', '0', '2', 'Index Error'], correct: 1 },
    'cp4': { q: 'Which operator is used to get the memory address of a variable in C?', opts: ['*', '&', '->', '.'], correct: 1 },
    'cp5': { q: 'What mode is passed to fopen to open a file for appending data?', opts: ['"r"', '"w"', '"a"', '"x"'], correct: 2 },
    'cp6': { q: 'What is the Big-O time complexity of searching in a sorted array using Binary Search?', opts: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'], correct: 2 }
  };

  const totalSteps = ROAD_NODES.length;
  const height = 4400;
  const stepY = height / (totalSteps + 1);

  const points = [];
  for (let i = 0; i <= totalSteps + 1; i++) {
    const y = i * stepY;
    const x = i === 0 || i === totalSteps + 1 ? 400 : 400 + Math.sin((i * Math.PI) / 2) * 160;
    points.push({ x, y });
  }

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpY1 = prev.y + stepY / 2;
    const cpY2 = curr.y - stepY / 2;
    pathD += ` C ${prev.x} ${cpY1}, ${curr.x} ${cpY2}, ${curr.x} ${curr.y}`;
  }

  useEffect(() => {
    if (roadWrapperRef.current) {
      const element = roadWrapperRef.current;
      const targetY = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMilestone(null);
        setActiveChallenge(null);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (selectedMilestone || activeChallenge) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveKeyboardIndex(prev => Math.min(prev + 1, ROAD_NODES.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveKeyboardIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const node = ROAD_NODES[activeKeyboardIndex];
      handleNodeAction(node);
    }
  };

  const handleNodeAction = (node) => {
    if (node.type === 'start') {
      setSelectedMilestone(node);
      return;
    }

    const isUnlocked = node.type === 'checkpoint' 
      ? node.reqSteps.every(s => completed.has(s))
      : (node.id === 1 || completed.has(node.id - 1));

    if (!isUnlocked) return;

    if (node.type === 'checkpoint') {
      setActiveChallenge(node);
      setChallengeQuestionState({ active: false, answered: false, correct: false, selectedOpt: null });
    } else {
      setSelectedMilestone(node);
    }
  };

  // Motivational message logic
  const getMotivationMessage = () => {
    const totalDone = completed.size;
    if (totalDone === 0) return "🚀 Ready to write your first program? Select Step 1!";
    if (totalDone <= 6) return "✨ Great start! You are mastering the core structure of C.";
    if (totalDone <= 11) return "🔥 Fantastic work! Checkpoints are unlocking as you go.";
    if (totalDone <= 18) return "💪 Memory management expert! You are entering advanced scopes.";
    if (totalDone < 24) return "🏁 Almost there! Complete linked lists to unlock mini projects.";
    return "🏆 Absolute Legend! The C programming road is fully illuminated!";
  };

  const isRoadCompleted = completed.has(24);

  return (
    <div className="c-tab-content c-roadmap-container" ref={roadWrapperRef}>
      
      {/* Motivational Banner */}
      <div className="c-motivation-toast" style={{ position: 'sticky', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 99, background: 'rgba(139, 92, 246, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '10px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', maxWidth: '90%', margin: '0 auto 20px', width: 'fit-content' }}>
        <Zap size={14} style={{ color: '#A855F7' }} />
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' }}>{getMotivationMessage()}</span>
      </div>

      {isRoadCompleted && (
        <motion.div 
          className="c-road-complete-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.1)' }}
        >
          <span style={{ fontSize: '2.5rem' }}>🎉</span>
          <h3 style={{ color: '#4ade80', fontSize: '1.4rem', fontWeight: '700', marginTop: '8px' }}>Roadmap Completed!</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', marginTop: '4px' }}>Congratulations! You have successfully completed the C Programming learning journey.</p>
        </motion.div>
      )}

      {/* Floating Badges Achievements */}
      <div className="c-achievements-sidebar" style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' }}>
        {completed.size >= 1 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>First Lesson Completed</span>
          </motion.div>
        )}
        {completed.has(4) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Variables Master</span>
          </motion.div>
        )}
        {completed.has(8) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Loop Expert</span>
          </motion.div>
        )}
        {completed.has(12) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Pointer Explorer</span>
          </motion.div>
        )}
      </div>

      <div className="c-roadmap-intro">
        {/* Ambient Lights & Grid */}
        <div className="c-ambient-grid" />
        <div className="c-ambient-glow" />
        <div className="c-ambient-circles">
          <div className="circle-1" />
          <div className="circle-2" />
        </div>
        
        {/* Content */}
        <div className="c-hero-badge-container">
          <span className="c-hero-badge">🚀 INTERACTIVE LEARNING ROADMAP</span>
        </div>
        <h1 className="c-hero-main-title">Master <span className="c-hero-gradient">C Programming</span></h1>
        <h2 className="c-hero-sub-title">From Beginner to System-Level Development</h2>
        <p className="c-hero-desc">Master C Programming through structured lessons, interactive coding practice, milestone challenges, real-world projects and interview preparation — all inside one premium learning experience.</p>

        {/* Info Grid */}
        <div className="c-hero-info-grid">
          <div className="c-info-chip">
            <span className="c-info-icon">⏱️</span>
            <div>
              <span className="c-info-lbl">Estimated Time</span>
              <span className="c-info-val">15 Hours</span>
            </div>
          </div>
          <div className="c-info-chip">
            <span className="c-info-icon">🎯</span>
            <div>
              <span className="c-info-lbl">Skill Level</span>
              <span className="c-info-val">Intermediate C Programmer</span>
            </div>
          </div>
          <div className="c-info-chip">
            <span className="c-info-icon">🏆</span>
            <div>
              <span className="c-info-lbl">Outcome Ready For</span>
              <span className="c-info-val">Data Structures, CP & Interviews</span>
            </div>
          </div>
        </div>

        {/* Journey Stats */}
        <div className="c-hero-stats-chips">
          <div className="c-stat-chip">📘 45 Lessons</div>
          <div className="c-stat-chip">💻 120+ Programs</div>
          <div className="c-stat-chip">🧩 6 Milestones</div>
          <div className="c-stat-chip">📝 30+ Quizzes</div>
          <div className="c-stat-chip">🚀 Mini Projects</div>
          <div className="c-stat-chip">🎯 Interview Ready</div>
        </div>

        {/* Current Journey Card */}
        <div className="c-hero-journey-card">
          <div className="c-jc-left">
            <span className="c-jc-badge">📍 YOU ARE HERE</span>
            <span className="c-jc-step">Step 1 of 45</span>
            <h4 className="c-jc-title">Introduction to C</h4>
          </div>
          <div className="c-jc-right">
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Difficulty</span>
              <span className="c-jc-meta-val">Beginner</span>
            </div>
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Estimated</span>
              <span className="c-jc-meta-val">15 Hours</span>
            </div>
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Status</span>
              <span className="c-jc-meta-val text-ready">Ready to Start</span>
            </div>
            <button className="c-jc-btn" onClick={() => { setActiveLessonId(1); setActiveTab('lessons'); }}>
              Continue Journey →
            </button>
          </div>
        </div>
      </div>

      <div className="c-road-journey-wrapper" style={{ height: `${height}px` }}>
        {/* The Winding Road SVG */}
        <svg className="c-road-svg" viewBox={`0 0 800 ${height}`} preserveAspectRatio="none">
          <path d={pathD} className="c-road-neon-outer" style={{ stroke: isRoadCompleted ? 'rgba(16, 185, 129, 0.28)' : 'rgba(139, 92, 246, 0.28)' }} />
          <path d={pathD} className="c-road-neon-edge" style={{ stroke: isRoadCompleted ? '#10B981' : '#8B5CF6' }} />
          <path d={pathD} className="c-road-asphalt" />
          <path d={pathD} className="c-road-dashes" />
        </svg>

        {/* Milestone platforms and cards along the road */}
        {ROAD_NODES.map((node, index) => {
          const pt = points[index + 1];
          const isLeft = pt.x < 400;

          // Locks are completely removed; all nodes are fully unlocked and accessible
          const isCompleted = node.type === 'lesson' && completed.has(node.step);
          const isUnlocked = true;

          const isActive = (selectedMilestone && selectedMilestone.id === node.id) || 
                           (activeChallenge && activeChallenge.id === node.id) ||
                           (!selectedMilestone && !activeChallenge && activeKeyboardIndex === index);

          // Render Special Checkpoint Platform
          if (node.type === 'checkpoint') {
            return (
              <div
                key={node.id}
                className={`c-roadmap-milestone-node checkpoint-node ${isActive ? 'node-active' : ''}`}
                style={{
                  position: 'absolute',
                  top: `${pt.y}px`,
                  left: `${pt.x}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                  <div className="c-milestone-platform" style={{ width: '66px', height: '66px', borderStyle: 'dashed' }}>
                    <div className="c-platform-ring-glow" style={{ borderColor: 'var(--primary-purple)' }} />
                    <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderNodeIcon(node)}
                    </div>
                  </div>
                </div>

                <div 
                  className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'}`}
                  onClick={() => handleNodeAction(node)}
                  style={{ cursor: 'pointer', borderColor: 'rgba(139, 92, 246, 0.4)' }}
                >
                  <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                    <div style={{ flex: 1 }}>
                      <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="c-lesson-num" style={{ fontSize: '0.62rem', color: 'var(--primary-purple)', fontWeight: '700' }}>CHALLENGE</span>
                        <span className="c-time-badge" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>Challenge Active</span>
                      </div>
                      <div className="c-roadmap-title" style={{ fontSize: '0.8rem', fontWeight: '700' }}>{node.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Render Start of Journey Card
          if (node.type === 'start') {
            return (
              <div
                key={node.id}
                className={`c-roadmap-milestone-node start-node ${isActive ? 'node-active' : ''}`}
                style={{
                  position: 'absolute',
                  top: `${pt.y}px`,
                  left: `${pt.x}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                  <div className="c-milestone-platform" style={{ width: '70px', height: '70px', borderColor: '#10B981' }}>
                    <div className="c-platform-ring-glow" style={{ borderColor: '#10B981' }} />
                    <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderNodeIcon(node)}
                    </div>
                  </div>
                </div>

                <div 
                  className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'}`}
                  onClick={() => handleNodeAction(node)}
                  style={{ cursor: 'pointer', borderColor: 'rgba(16, 185, 129, 0.4)', width: '220px' }}
                >
                  <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                    <div style={{ flex: 1 }}>
                      <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="c-lesson-num" style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '800', letterSpacing: '0.05em' }}>START YOUR JOURNEY</span>
                      </div>
                      <div className="c-roadmap-title" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>Begin your C Programming adventure.</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Normal Lesson Milestone
          return (
            <div
              key={node.id}
              className={`c-roadmap-milestone-node ${isLeft ? 'node-left' : 'node-right'} ${isActive ? 'node-active' : ''}`}
              style={{
                position: 'absolute',
                top: `${pt.y}px`,
                left: `${pt.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {/* Winding road milestone platform */}
              <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                <div className="c-milestone-platform">
                  <div className="c-platform-ring-glow" />
                  <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderNodeIcon(node)}
                  </div>
                  
                  {/* Hexagon Logo Overlay */}
                  <div className="c-platform-hexagon-overlay">
                    <svg viewBox="0 0 38 42" style={{ width: '100%', height: '100%' }}>
                      <path fill="#8B5CF6" d="m 17.903,0.286 c 0.679,-0.381 1.515,-0.381 2.193,0 l 16.807,9.434 c 0.679,0.38 1.097,1.084 1.097,1.846 v 18.867 c 0,0.762 -0.418,1.466 -1.097,1.847 l -16.807,9.434 c -0.679,0.381 -1.515,0.381 -2.193,0 l -16.807,-9.434 c -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 v -18.867 c 0,-0.762 0.418,-1.466 1.096,-1.847 z" />
                      <text x="19" y="27" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">C</text>
                    </svg>
                  </div>
                </div>
                <div className="c-milestone-index">{String(node.step).padStart(2, '0')}</div>
              </div>

              {/* Minimal Glass Card */}
              <div 
                className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'} ${isCompleted ? 'c-card-completed' : ''}`}
                onClick={() => handleNodeAction(node)}
                style={{ cursor: 'pointer' }}
              >
                <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                  <div style={{ flex: 1 }}>
                    <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span className="c-lesson-num" style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-purple)', letterSpacing: '0.05em' }}>STEP {String(node.step).padStart(2, '0')}</span>
                      <span className={`c-diff-tag diff-${node.diff.toLowerCase()}`} style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '700' }}>{node.diff}</span>
                      <span className="c-time-badge" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}><Clock size={10} /> {node.time}</span>
                    </div>
                    <div className="c-roadmap-title" style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.title}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Detail Panel / Side Sheet */}
      <AnimatePresence>
        {selectedMilestone && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="c-roadmap-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMilestone(null)}
            />
            
            {/* Side Panel */}
            <motion.div 
              className="c-roadmap-detail-panel"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {selectedMilestone.type === 'start' ? (
                // Start Node Layout
                <>
                  <div className="c-panel-header">
                    <div>
                      <span className="c-panel-step">WELCOME</span>
                      <h2>🚩 Start Your C Journey</h2>
                    </div>
                    <button className="c-panel-close-btn" onClick={() => setSelectedMilestone(null)} title="Close">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="c-panel-badges">
                    <span className="c-panel-meta-item">⏱️ Duration: 15 hrs</span>
                    <span className="c-panel-meta-item">🟢 Beginner Friendly</span>
                  </div>
                  <div className="c-panel-body-scroll">
                    <div className="c-panel-section">
                      <h4>📝 Overview</h4>
                      <p>{selectedMilestone.desc}</p>
                    </div>
                    <div className="c-panel-section" style={{ textAlign: 'center', padding: '20px', background: 'rgba(139,92,246,0.06)', borderRadius: '12px', border: '1px dashed rgba(168,85,247,0.3)' }}>
                      <span style={{ fontSize: '1.8rem' }}>🚀</span>
                      <p style={{ fontStyle: 'italic', color: '#a855f7', marginTop: '6px' }}>"Every expert programmer started here."</p>
                    </div>
                  </div>
                  <div className="c-panel-footer">
                    <button className="c-btn-primary" onClick={() => {
                      setSelectedMilestone(null);
                      // focus on first step
                      setActiveKeyboardIndex(1);
                    }}>
                      Get Started <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              ) : (
                // Normal Lesson Detail Panel Layout
                <>
                  {/* Header */}
                  <div className="c-panel-header">
                    <div>
                      <span className="c-panel-step">STEP {String(selectedMilestone.step).padStart(2, '0')}</span>
                      <h2>{selectedMilestone.title}</h2>
                    </div>
                    <button className="c-panel-close-btn" onClick={() => setSelectedMilestone(null)} title="Close">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Badges bar */}
                  <div className="c-panel-badges">
                    <span className={`c-diff-tag diff-${selectedMilestone.diff.toLowerCase()}`} style={{ padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '700' }}>{selectedMilestone.diff}</span>
                    <span className="c-panel-meta-item"><Clock size={12} /> {selectedMilestone.time}</span>
                    <span className="c-panel-meta-item">⏱️ Practice: {practiceTimes[selectedMilestone.step]}</span>
                  </div>

                  {/* Main Content Body */}
                  <div className="c-panel-body-scroll">
                    <div className="c-panel-section">
                      <h4>📝 Overview</h4>
                      <p>{selectedMilestone.desc}</p>
                    </div>

                    <div className="c-panel-section">
                      <h4>🔑 Learning Objectives</h4>
                      <ul>
                        {learningObjectives[selectedMilestone.step]?.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="c-panel-section">
                      <h4>📚 Topics Covered</h4>
                      <div className="c-panel-topics-list">
                        {topicsCovered[selectedMilestone.step]?.map((topic, i) => (
                          <span key={i} className="c-panel-topic-tag">{topic}</span>
                        ))}
                      </div>
                    </div>

                    <div className="c-panel-section">
                      <h4>💡 Prerequisites</h4>
                      <p className="c-prereq-text">{prerequisites[selectedMilestone.step]}</p>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="c-panel-footer">
                    <button className="c-btn-primary" onClick={() => {
                      if (selectedMilestone.type === 'lesson') {
                        setActiveLessonId(selectedMilestone.step);
                        setActiveTab('lessons');
                      } else if (selectedMilestone.type === 'projects') {
                        setActiveTab('projects');
                      } else if (selectedMilestone.type === 'interview') {
                        setActiveTab('interview');
                      }
                      setSelectedMilestone(null);
                    }}>
                      <Play size={14} /> Start Lesson
                    </button>
                    
                    <button 
                      className={`c-btn-secondary ${bookmarkedMilestones.has(selectedMilestone.step) ? 'bookmarked' : ''}`}
                      onClick={() => {
                        setBookmarkedMilestones(prev => {
                          const s = new Set(prev);
                          s.has(selectedMilestone.step) ? s.delete(selectedMilestone.step) : s.add(selectedMilestone.step);
                          return s;
                        });
                      }}
                    >
                      <Bookmark size={14} fill={bookmarkedMilestones.has(selectedMilestone.step) ? '#8B5CF6' : 'none'} />
                      {bookmarkedMilestones.has(selectedMilestone.step) ? 'Bookmarked' : 'Bookmark'}
                    </button>

                    <button 
                      className={`c-btn-secondary ${completed.has(selectedMilestone.step) ? 'completed' : ''}`}
                      onClick={() => toggleComplete(selectedMilestone.step)}
                    >
                      <Check size={14} />
                      {completed.has(selectedMilestone.step) ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Checkpoint Milestone Challenge Modal Window */}
      <AnimatePresence>
        {activeChallenge && (
          <>
            <motion.div 
              className="c-roadmap-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveChallenge(null)}
              style={{ zIndex: 1100 }}
            />
            
            <motion.div 
              className="c-challenge-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '460px', maxWidth: '90%', background: 'rgba(11,11,18,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', zIndex: 1200, padding: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(239, 68, 68, 0.15)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#ef4444', tracking: '0.05em' }}>🚩 SECTION CHECKPOINT</span>
                <button className="c-panel-close-btn" onClick={() => setActiveChallenge(null)} style={{ border: 'none', background: 'none' }}><X size={16} /></button>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>{activeChallenge.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: '1.5', marginBottom: '18px' }}>{activeChallenge.desc}</p>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                  <span>Section:</span><strong>{activeChallenge.section}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                  <span>Difficulty:</span><span style={{ color: '#facc15', fontWeight: '600' }}>Medium Challenge</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Time limit:</span><strong>10 mins</strong>
                </div>
              </div>

              {!challengeQuestionState.active ? (
                // Challenge Intro Window
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="c-btn-primary" onClick={() => setChallengeQuestionState({ active: true, answered: false, correct: false, selectedOpt: null })} style={{ flex: 1, padding: '11px', background: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', color: '#ffffff', fontSize: '0.84rem', fontWeight: '600', cursor: 'pointer' }}>
                    Start Challenge
                  </button>
                  <button className="c-btn-secondary" onClick={() => setActiveChallenge(null)} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.84rem', fontWeight: '600', cursor: 'pointer' }}>
                    Continue Later
                  </button>
                </div>
              ) : (
                // Challenge Interactive Qs View
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600', marginBottom: '10px', lineHeight: '1.5' }}>
                    {challengeQuestions[activeChallenge.id]?.q}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {challengeQuestions[activeChallenge.id]?.opts.map((opt, oIdx) => {
                      let bg = 'rgba(255,255,255,0.03)';
                      let border = '1px solid rgba(255,255,255,0.06)';
                      if (challengeQuestionState.answered) {
                        if (oIdx === challengeQuestions[activeChallenge.id].correct) {
                          bg = 'rgba(16, 185, 129, 0.15)';
                          border = '1px solid #10b981';
                        } else if (oIdx === challengeQuestionState.selectedOpt) {
                          bg = 'rgba(239, 68, 68, 0.15)';
                          border = '1px solid #ef4444';
                        }
                      } else if (oIdx === challengeQuestionState.selectedOpt) {
                        border = '1px solid #ef4444';
                        bg = 'rgba(239, 68, 68, 0.05)';
                      }

                      return (
                        <button 
                          key={oIdx} 
                          onClick={() => !challengeQuestionState.answered && setChallengeQuestionState(prev => ({ ...prev, selectedOpt: oIdx }))}
                          style={{ padding: '10px 14px', borderRadius: '8px', background: bg, border, color: '#ffffff', textAlign: 'left', fontSize: '0.82rem', cursor: challengeQuestionState.answered ? 'default' : 'pointer', transition: 'all 0.2s' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {challengeQuestionState.answered && (
                    <div style={{ fontSize: '0.82rem', color: challengeQuestionState.correct ? '#4ade80' : '#f87171', marginBottom: '20px', fontWeight: '600' }}>
                      {challengeQuestionState.correct ? '🎉 Correct! Challenge completed successfully. Section unlocked!' : '❌ Incorrect choice. Close and try again!'}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!challengeQuestionState.answered ? (
                      <button 
                        onClick={() => {
                          const isCorrect = challengeQuestionState.selectedOpt === challengeQuestions[activeChallenge.id].correct;
                          setChallengeQuestionState(prev => ({ ...prev, answered: true, correct: isCorrect }));
                        }}
                        disabled={challengeQuestionState.selectedOpt === null}
                        style={{ flex: 1, padding: '10px', background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: challengeQuestionState.selectedOpt === null ? 'not-allowed' : 'pointer', opacity: challengeQuestionState.selectedOpt === null ? 0.5 : 1 }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveChallenge(null)}
                        style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Close Challenge
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Graduation & Continue Learning Section */}
      <div className="c-graduation-section">
        {/* Destination Platform */}
        <div className="c-grad-platform">
          <div className="c-grad-glow-ring" />
          <div className="c-grad-header">
            <span className="c-grad-trophy" style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🏆</span>
            <h2>C Programming Mastery</h2>
            <p className="c-grad-subtitle">Congratulations! You have successfully completed the C Programming Learning Journey.</p>
          </div>

          <div className="c-grad-checklists">
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>All 24 Lessons Completed</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>All Learning Challenges Completed</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Ready for Real Projects</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Ready for Technical Interviews</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Strong Programming Foundation Achieved</span>
            </div>
          </div>
        </div>

        {/* Course Summary */}
        <div className="c-grad-summary">
          <h3>Journey Summary</h3>
          <div className="c-summary-grid">
            <div className="c-summary-card">
              <span className="c-summary-val">24 / 24</span>
              <span className="c-summary-lbl">Lessons Completed</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">6 / 6</span>
              <span className="c-summary-lbl">Challenges Completed</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">45 hrs</span>
              <span className="c-summary-lbl">Est. Learning Hours</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">12+</span>
              <span className="c-summary-lbl">Skills Learned</span>
            </div>
          </div>
        </div>

        {/* Future Path Preview */}
        <div className="c-path-preview-section">
          <h3>Future Learning Path</h3>
          <div className="c-path-flow">
            <div className="c-flow-node active">C Programming</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">C++ (OOP)</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Data Structures</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Algorithms</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Projects</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Technical Interviews</div>
          </div>
        </div>

        {/* Continue Learning Header */}
        <div className="c-continue-header">
          <h3>Continue Your Learning Journey</h3>
          <p className="c-motivation-msg">
            "{motivations[motivationIdx]}"
          </p>
        </div>

        {/* Recommended & Next Course Cards */}
        <div className="c-recommendation-grid">
          {/* C++ Recommended Card */}
          <div className="c-course-card recommended-highlight">
            <div className="c-recommended-badge">RECOMMENDED</div>
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <div>
                <h4>Continue with C++</h4>
                <span className="c-card-diff-badge diff-medium">MEDIUM</span>
              </div>
            </div>
            <p className="c-card-tagline">Learn Object-Oriented Programming using your C programming foundation.</p>
            <div className="c-card-meta">
              <span>⏱️ 20 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/cpp')}>
              Start Learning →
            </button>
          </div>

          {/* Data Structures */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>📊</span>
              <div>
                <h4>Data Structures</h4>
                <span className="c-card-diff-badge diff-hard">HARD</span>
              </div>
            </div>
            <p className="c-card-tagline">Master efficient problem solving and build memory-efficient structures.</p>
            <div className="c-card-meta">
              <span>⏱️ 30 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/curriculum/semester-2/data-structures/quiz')}>
              Explore Structures →
            </button>
          </div>

          {/* Python */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>🐍</span>
              <div>
                <h4>Python Language</h4>
                <span className="c-card-diff-badge diff-easy">EASY</span>
              </div>
            </div>
            <p className="c-card-tagline">Leverage your base to master scripting, automation, AI development, and data science.</p>
            <div className="c-card-meta">
              <span>⏱️ 15 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/python')}>
              Start Learning →
            </button>
          </div>

          {/* Java */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>☕</span>
              <div>
                <h4>Java Platform</h4>
                <span className="c-card-diff-badge diff-medium">MEDIUM</span>
              </div>
            </div>
            <p className="c-card-tagline">Build platform-independent enterprise backend applications and Android mobile apps.</p>
            <div className="c-card-meta">
              <span>⏱️ 25 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/java')}>
              Start Learning →
            </button>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="c-graduation-actions">
          <button className="c-btn-primary" onClick={() => navigate('/technologies/cpp')}>
            Start C++
          </button>
          <button className="c-btn-secondary" onClick={() => navigate('/')}>
            Return to Homepage
          </button>
        </div>
      </div>

      {/* Learning Dashboard */}
      <div className="c-dashboard-container">
        <div className="c-dashboard-header">
          <h3>👋 Welcome Back</h3>
          <p>Here is your current learning state and next recommended actions.</p>
        </div>

        <div className="c-dashboard-grid">
          {/* Quick Resume Card */}
          <div className="c-dash-card c-resume-card">
            <h4>Continue Learning</h4>
            <div className="c-resume-details">
              <span className="c-resume-title">Current Course: <strong>C Programming</strong></span>
              <span className="c-resume-lesson" style={{ display: 'block', margin: '4px 0 10px' }}>Current Lesson: <strong>Pointers</strong></span>
              <div className="c-progress-bar-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="c-progress-bar-bg" style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div className="c-progress-bar-fill" style={{ width: '68%', height: '100%', background: 'var(--primary-purple)', borderRadius: '10px' }}></div>
                </div>
                <span className="c-progress-pct" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>68%</span>
              </div>
            </div>
            <button className="c-dash-btn" onClick={() => { setActiveLessonId(12); setActiveTab('lessons'); }} style={{ marginTop: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '8px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
              Resume Learning →
            </button>
          </div>

          {/* Overall Progress Stats */}
          <div className="c-dash-card c-stats-card">
            <h4>Course Progress Stats</h4>
            <div className="c-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>{completed.size} / 24</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Lessons Completed</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>3 / 6</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Challenges Completed</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>4 / 5</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Weekly Goal</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>4 Days</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Current Streak 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Progress Tracking */}
      <div className="c-tech-tracking-section">
        <h3>Tech Stack Progress</h3>
        <p className="c-tracking-sub">Track all technologies in your learning profile curriculum.</p>
        <div className="c-tech-progress-grid">
          {tracks.map((track, tIdx) => (
            <div key={tIdx} className={`c-tech-track-card track-${track.status}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5>{track.name}</h5>
                  <span className="c-track-status-lbl">{track.status.toUpperCase().replace('-', ' ')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <ProgressRing percentage={track.progress} color={track.color} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', position: 'absolute', width: '52px', textAlign: 'center', left: 0, color: '#ffffff' }}>
                    {track.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Learn C++ Next? Details Card */}
      <div className="c-why-next-section">
        <div className="c-why-next-card">
          <h3>Why Learn C++ Next?</h3>
          <p className="c-why-subtitle">Learn Object-Oriented Programming (OOP) using your C programming foundation.</p>
          <div className="c-why-details-grid">
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Syntax Overlap:</strong> C++ is a direct superset of C. You already know 85% of C++ basic syntax!</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>OOP Paradigms:</strong> Master classes, inheritance, polymorphism, and encapsulation.</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Data Structures:</strong> Preparing you for building real algorithms with C++ templates STL.</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Memory Access:</strong> Combines direct memory pointer controls with high-level code structures.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Career Path Map visual timelines */}
      <div className="c-career-path-section">
        <h3>Career Learning Pathways</h3>
        <p className="c-career-subtitle">Select your target tech stack role and follow the visual curriculum roadmap flow.</p>
        <div className="c-career-paths-container">
          {careerPaths.map((path, pIdx) => (
            <div key={pIdx} className="c-career-path-row">
              <h5>{path.title}</h5>
              <div className="c-career-nodes">
                {path.steps.map((step, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div className={`c-career-node-badge ${step === 'C Programming' ? 'node-c-active' : ''}`}>{step}</div>
                    {sIdx < path.steps.length - 1 && <span className="c-career-arrow-flow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Achievements Grid */}
      <div className="c-achievements-dashboard-section">
        <h3>Learning Achievements</h3>
        <p className="c-achievements-subtitle">Verify milestone trophies unlocked during code lessons and quizzes.</p>
        <div className="c-achievements-dash-grid">
          {achievementsList.map((ach, aIdx) => (
            <div key={aIdx} className={`c-ach-dash-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
              <span className="c-ach-emoji" style={{ fontSize: '1.2rem', display: 'block', marginBottom: '6px' }}>{ach.unlocked ? ach.emoji : '🔒'}</span>
              <div>
                <h6>{ach.title}</h6>
                <p>{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: LESSONS
   ============================================================ */
const LessonsTab = ({ activeLessonId, setActiveLessonId, completed, toggleComplete }) => {
  const { user } = useAuth();
  const activeLesson = C_LESSONS.find(l => l.id === activeLessonId) || C_LESSONS[0];
  const [bookmarked, setBookmarked] = useState(new Set());
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState('theory'); // theory, playground, quiz, practice
  const contentRef = useRef(null);

  // Playground states
  const [playgroundCode, setPlaygroundCode] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState('');
  const [runningCode, setRunningCode] = useState(false);

  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Mock quiz questions database (5 per lesson or generated fallback)
  const quizQuestions = [
    { q: "What is the correct way to declare a main function in C?", options: ["int main()", "void main()", "main()", "All of the above"], correct: 3, exp: "Although compilers support void main(), int main() is the standards compliant declaration according to ISO C." },
    { q: "Which symbol represents the address-of operator in C?", options: ["*", "&", "%", "@"], correct: 1, exp: "The ampersand (&) operator retrieves the address in memory of a variable." },
    { q: "What is the dereference operator in C pointers?", options: ["&", "*", "->", "."], correct: 1, exp: "The asterisk (*) symbol is used to dereference a pointer to read or modify value at memory location." },
    { q: "Which allocation function initializes memory blocks to zero?", options: ["malloc()", "calloc()", "realloc()", "free()"], correct: 1, exp: "Unlike malloc(), calloc() clears allocated memory bytes to zero." },
    { q: "Which header file defines size_t and standard pointer references?", options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<stddef.h>"], correct: 3, exp: "The <stddef.h> header defines standard type classifications including size_t and NULL." }
  ];

  const navigate = useNavigate();

  // Sync bookmark and note on active lesson change
  useEffect(() => {
    if (!user) return;
    
    // Load Note
    const loadNote = async () => {
      const val = await getUserNote(user.uid, String(activeLesson.id));
      setNote(val || '');
    };
    loadNote();

    // Reset playground
    setPlaygroundCode(activeLesson.code || '');
    setPlaygroundOutput('/* Click Run Code to execute and compile */');

    // Reset quiz
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveTabSub('theory');
  }, [activeLesson, user]);

  const toggleBookmark = async (id) => {
    setBookmarked(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
    if (user) {
      await addUserBookmark(user.uid, String(id), '', 'c-programming');
    }
  };

  const handleSaveNote = async () => {
    if (!user) return;
    setSavingNote(true);
    await saveUserNote(user.uid, String(activeLesson.id), note);
    setSavingNote(false);
  };

  const handleRunPlayground = () => {
    setRunningCode(true);
    setPlaygroundOutput('Compiling sandbox program...\n$ gcc main.c -o main\n$ ./main\n\n' + activeLesson.output);
    setRunningCode(false);
  };

  const handleResetPlayground = () => {
    setPlaygroundCode(activeLesson.code || '');
    setPlaygroundOutput('/* Sandbox reset complete. Click Run to compile */');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(playgroundCode);
    alert('Code copied to clipboard!');
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score += 20; // 5 questions = 100 max score
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const goTo = (lesson) => {
    setActiveLessonId(lesson.id);
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const idx = C_LESSONS.findIndex(l => l.id === activeLesson.id);
  const prev = idx > 0 ? C_LESSONS[idx - 1] : null;
  const next = idx < C_LESSONS.length - 1 ? C_LESSONS[idx + 1] : null;

  return (
    <div className="c-tab-content c-lessons-layout">
      <aside className="c-lessons-sidebar">
        <h4>All Lessons</h4>
        {C_LESSONS.map((lesson) => (
          <div key={lesson.id} className={`c-lesson-nav-item ${lesson.id === activeLesson.id ? 'active' : ''}`} onClick={() => goTo(lesson)}>
            <div className="c-lesson-nav-num">{lesson.id}</div>
            <span className="c-lesson-nav-title">{lesson.title}</span>
            {completed.has(lesson.id) && <Check size={12} style={{ color: '#4ade80', marginLeft: 'auto', flexShrink: 0 }} />}
          </div>
        ))}
      </aside>

      <div className="c-lesson-content" ref={contentRef}>
        <AnimatePresence mode="wait">
          <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
            <div className="c-lesson-card">
              
              {/* Header */}
              <div className="c-lesson-header">
                <div className="c-lesson-title-group">
                  <div className="c-lesson-num-label">
                    Lesson {activeLesson.id} · <span className={`c-diff-tag diff-${activeLesson.diff}`}>{activeLesson.diff}</span> · ⏱ {activeLesson.time}
                  </div>
                  <h1 className="c-lesson-title">{activeLesson.title}</h1>
                </div>
                <div className="c-lesson-actions">
                  <button className={`c-action-btn ${bookmarked.has(activeLesson.id) ? 'active' : ''}`} onClick={() => toggleBookmark(activeLesson.id)}>
                    <Bookmark size={14} />{bookmarked.has(activeLesson.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button className={`c-action-btn ${completed.has(activeLesson.id) ? 'complete' : ''}`} onClick={() => toggleComplete(activeLesson.id)}>
                    <CheckCircle size={14} />{completed.has(activeLesson.id) ? 'Completed ✓' : 'Mark Done'}
                  </button>
                </div>
              </div>

              {/* Sub tabs selectors */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '20px' }}>
                <button 
                  onClick={() => setActiveTabSub('theory')} 
                  className={`search-empty-btn ${activeTabSub === 'theory' ? 'active' : ''}`}
                  style={activeTabSub === 'theory' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
                >
                  📚 Theory & Examples
                </button>
                <button 
                  onClick={() => setActiveTabSub('playground')} 
                  className={`search-empty-btn ${activeTabSub === 'playground' ? 'active' : ''}`}
                  style={activeTabSub === 'playground' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
                >
                  💻 Code Playground
                </button>
                <button 
                  onClick={() => setActiveTabSub('quiz')} 
                  className={`search-empty-btn ${activeTabSub === 'quiz' ? 'active' : ''}`}
                  style={activeTabSub === 'quiz' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
                >
                  📝 Lesson Quiz
                </button>
                <button 
                  onClick={() => setActiveTabSub('practice')} 
                  className={`search-empty-btn ${activeTabSub === 'practice' ? 'active' : ''}`}
                  style={activeTabSub === 'practice' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
                >
                  🎯 Practice Problems
                </button>
              </div>

              {/* Tab 1: Theory */}
              {activeTabSub === 'theory' && (
                <>
                  <div className="c-subsection-title"><BookOpen size={14} /> Theory</div>
                  <div className="c-theory-text">{activeLesson.theory.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>

                  <div className="c-subsection-title" style={{ marginTop: '20px' }}><Code2 size={14} /> Code Example</div>
                  <CCodeBlock code={activeLesson.code} />

                  <div className="c-subsection-title"><Terminal size={14} /> Output</div>
                  <COutputBlock output={activeLesson.output} />

                  <div className="c-subsection-title" style={{ marginTop: '20px' }}><Info size={14} /> Note</div>
                  <div className="c-note-box"><strong>📘 Note</strong>{activeLesson.note}</div>

                  <div className="c-warning-box"><strong>⚠️ Common Mistake</strong>{activeLesson.warning}</div>

                  <div className="c-subsection-title" style={{ marginTop: '20px' }}><Star size={14} /> Best Practices</div>
                  <div className="c-tip-box"><strong>✅ Best Practice</strong>{activeLesson.tip}</div>

                  <div className="c-subsection-title" style={{ marginTop: '20px' }}><AlertTriangle size={14} /> Common Mistakes to Avoid</div>
                  <div className="c-bp-list">
                    {activeLesson.mistakes.map((m, i) => <div key={i} className="c-bp-item">{m}</div>)}
                  </div>

                  <div className="c-interview-tip" style={{ marginTop: '20px' }}>
                    <div className="c-interview-tip-label"><Zap size={13} /> Interview Tip</div>
                    <p>{activeLesson.interviewTip}</p>
                  </div>

                  <div className="c-subsection-title" style={{ marginTop: '20px' }}><CheckCircle size={14} /> Summary</div>
                  <div className="c-note-box" style={{ borderLeftColor: 'var(--primary-purple)', background: 'rgba(139,92,246,0.06)' }}><strong style={{ color: 'var(--accent-glow)' }}>📌 Summary</strong>{activeLesson.summary}</div>
                </>
              )}

              {/* Tab 2: Playground */}
              {activeTabSub === 'playground' && (
                <div style={{ textAlign: 'left' }}>
                  <div className="c-subsection-title"><Terminal size={14} /> Live Code Playground</div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                    Edit the example code below and compile it in the browser sandbox.
                  </p>

                  {/* Editor Window */}
                  <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', background: '#09090d', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>main.c</span>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleCopyCode} className="search-recent-clear-btn" style={{ fontSize: '0.72rem' }}>Copy</button>
                        <button onClick={handleResetPlayground} className="search-recent-clear-btn" style={{ fontSize: '0.72rem' }}>Reset</button>
                      </div>
                    </div>
                    <textarea 
                      value={playgroundCode}
                      onChange={(e) => setPlaygroundCode(e.target.value)}
                      style={{ width: '100%', minHeight: '260px', background: 'none', border: 'none', outline: 'none', color: '#818cf8', fontFamily: 'Space Mono, monospace', fontSize: '0.84rem', padding: '16px', resize: 'vertical', lineHeight: '1.5' }}
                    />
                  </div>

                  {/* Actions & Terminal Output */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                    <button 
                      onClick={handleRunPlayground} 
                      className="btn-premium-purple"
                      style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Play size={14} /> Run Code
                    </button>
                  </div>

                  <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', background: '#030303', overflow: 'hidden' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      Execution Output Terminal
                    </div>
                    <pre style={{ margin: 0, padding: '16px', color: '#10b981', background: '#050505', fontSize: '0.82rem', fontFamily: 'Space Mono, monospace', minHeight: '120px', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                      {playgroundOutput}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 3: Quiz */}
              {activeTabSub === 'quiz' && (
                <div style={{ textAlign: 'left' }}>
                  <div className="c-subsection-title"><CheckCircle size={14} /> Lesson Quiz Evaluation</div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                    Complete these conceptual MCQs to verify your comprehension of the lesson topics.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>
                          Question {qIdx + 1}: {q.q}
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[qIdx] === optIdx;
                            const isCorrectOpt = q.correct === optIdx;
                            let style = { background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' };

                            if (isSelected) {
                              style = { background: 'rgba(168,85,247,0.1)', borderColor: 'var(--primary-purple)', color: '#fff' };
                            }
                            if (quizSubmitted) {
                              if (isCorrectOpt) {
                                style = { background: 'rgba(16,185,129,0.15)', borderColor: '#10B981', color: '#10B981' };
                              } else if (isSelected && !isCorrectOpt) {
                                style = { background: 'rgba(239,68,68,0.15)', borderColor: '#EF4444', color: '#EF4444' };
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizAnswer(qIdx, optIdx)}
                                style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid', textAlign: 'left', fontSize: '0.82rem', cursor: quizSubmitted ? 'default' : 'pointer', transition: 'all 0.2s', ...style }}
                                disabled={quizSubmitted}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--primary-purple)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                            <strong>Explanation:</strong> {q.exp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions & Results */}
                  <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {!quizSubmitted ? (
                      <button 
                        onClick={handleQuizSubmit} 
                        disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                        className="btn-premium-purple"
                        style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', opacity: Object.keys(quizAnswers).length < quizQuestions.length ? 0.5 : 1 }}
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-glow)' }}>
                          Your Score: {quizScore}%
                        </span>
                        <button 
                          onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizScore(0); }} 
                          className="search-empty-btn"
                        >
                          Retry Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Practice */}
              {activeTabSub === 'practice' && (
                <div style={{ textAlign: 'left' }}>
                  <div className="c-subsection-title"><Target size={14} /> Practice Challenges</div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                    Solve these programming challenges of varying difficulties to cement your knowledge.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px 20px', borderRadius: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '4px' }}>Print Integer Format Strings</h4>
                        <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)' }}>Write a program that inputs an integer and prints its square.</p>
                      </div>
                      <span className="c-diff-tag diff-beginner">Easy</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px 20px', borderRadius: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '4px' }}>Logical Shift Operator Swap</h4>
                        <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)' }}>Implement pointer swap using bitwise XOR operators instead of temp variables.</p>
                      </div>
                      <span className="c-diff-tag diff-intermediate">Medium</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px 20px', borderRadius: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '4px' }}>Heap Memory Address Bounds</h4>
                        <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)' }}>Manually reallocate array memory block boundaries checking pointer overlaps.</p>
                      </div>
                      <span className="c-diff-tag diff-advanced">Hard</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommends next related lessons */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '24px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.86rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  Recommended Next Lessons
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {next && (
                    <div 
                      onClick={() => goTo(next)}
                      style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-purple)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                    >
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-glow)', fontWeight: '600' }}>UP NEXT</span>
                      <h4 style={{ fontSize: '0.86rem', fontWeight: '700', margin: '4px 0 2px' }}>{next.title}</h4>
                      <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>Lesson {next.id} · {next.time}</p>
                    </div>
                  )}
                  <div 
                    onClick={() => navigate('/')}
                    style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-purple)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                  >
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-glow)', fontWeight: '600' }}>EXPLORE OTHER</span>
                    <h4 style={{ fontSize: '0.86rem', fontWeight: '700', margin: '4px 0 2px' }}>Learning Dashboard</h4>
                    <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>Track general student roadmaps</p>
                  </div>
                </div>
              </div>

              {/* Private Notes Panel */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '24px', paddingTop: '24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.86rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    🗒 Private Notes
                  </h4>
                  {savingNote && <span style={{ fontSize: '0.72rem', color: 'var(--accent-glow)' }}>Saving note...</span>}
                </div>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={handleSaveNote}
                  placeholder="Type your personal private notes for this lesson here. Clicking outside the field will automatically save notes to Firestore..."
                  style={{ width: '100%', minHeight: '90px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 16px', color: 'var(--text-secondary)', fontFamily: 'inherit', fontSize: '0.84rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Lesson Nav Footer */}
              <div className="c-lesson-nav-footer" style={{ marginTop: '32px' }}>
                {prev ? (
                  <button className="c-nav-btn" onClick={() => goTo(prev)}>
                    <span className="c-nav-btn-label"><ChevronLeft size={13} /> Previous</span>
                    <span className="c-nav-btn-title">{prev.title}</span>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="c-nav-btn next" onClick={() => goTo(next)}>
                    <span className="c-nav-btn-label">Next <ChevronRight size={13} /></span>
                    <span className="c-nav-btn-title">{next.title}</span>
                  </button>
                ) : <div />}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: PROGRAMS
   ============================================================ */
const ProgramDetailView = ({
  prog,
  category,
  onBack,
  onPrev,
  onNext,
  isBookmarked,
  onBookmark,
  onCopy,
  onDownload,
  isCopied
}) => {
  const [fontSize, setFontSize] = useState('14');
  const [showLineNumbers] = useState(true);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(prog.expectedOutput).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    });
  };

  const lines = prog.code.split('\n');

  return (
    <div className="c-program-detail-page" style={{ width: '100%' }}>
      {/* Header bar */}
      <div className="c-pd-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
        <button className="c-btn-secondary" onClick={onBack} style={{ fontSize: '0.8rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} /> Back to Programs
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="c-pd-category-badge" style={{ fontSize: '0.72rem', background: 'rgba(139,92,246,0.1)', color: '#A855F7', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(139,92,246,0.2)' }}>{category}</span>
          <button onClick={onBookmark} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: isBookmarked ? '#A855F7' : 'rgba(255,255,255,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={15} fill={isBookmarked ? '#A855F7' : 'transparent'} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>{prog.title}</h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '6px', maxWidth: '800px' }}>{prog.statement}</p>
        </div>
        <span className={`c-complexity-badge ${prog.complexity === 'O(1)' ? 'complexity-o1' : 'complexity-on'}`} style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          {prog.complexity}
        </span>
      </div>

      {/* Main split content */}
      <div className="c-pd-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left column: Code & Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Code block container */}
          <div className="c-pd-code-container" style={{ background: '#07070d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0c0c14', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>📄 Original C Source Code</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="c-editor-select" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#ffffff', fontSize: '0.75rem', padding: '4px 8px' }}>
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                </select>
                <button onClick={onCopy} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center' }} title="Copy Code">
                  {isCopied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                </button>
                <button onClick={onDownload} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center' }} title="Download Code">
                  <Download size={14} />
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: `${fontSize}px`, padding: '16px', maxHeight: '420px', overflowY: 'auto', fontFamily: 'monospace', lineHeight: 1.5 }}>
              {showLineNumbers && (
                <div style={{ color: 'rgba(255,255,255,0.15)', textAlign: 'right', paddingRight: '12px', userSelect: 'none', borderRight: '1px solid rgba(255,255,255,0.05)', marginRight: '12px' }}>
                  {lines.map((_, idx) => (
                    <div key={idx} style={{ height: '21px' }}>{idx + 1}</div>
                  ))}
                </div>
              )}
              <pre style={{ margin: 0, overflowX: 'auto', flex: 1, color: '#e2e8f0' }}>
                <code>{prog.code}</code>
              </pre>
            </div>
          </div>

          {/* Terminal output container */}
          <div className="c-pd-terminal-container" style={{ background: '#020205', border: '1px solid rgba(139,92,246,0.22)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(139,92,246,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#08080f', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>🖥️ Terminal Console Output</span>
              <button onClick={handleCopyOutput} style={{ background: 'rgba(255,255,255,0.02)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }} title="Copy Output">
                {copiedOutput ? <Check size={13} style={{ color: '#10B981' }} /> : <Copy size={13} />}
              </button>
            </div>
            <div style={{ padding: '18px', fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px', color: '#4ade80' }}>
              {prog.sampleInput && (
                <div>
                  <span style={{ color: '#64748b' }}>c_program $ ./input_stream</span>
                  <pre style={{ margin: '4px 0 0', color: '#e2e8f0', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>{prog.sampleInput}</pre>
                </div>
              )}
              <div>
                <span style={{ color: '#64748b' }}>c_program $ ./run_program</span>
                <pre style={{ margin: '4px 0 0', color: '#4ade80', whiteSpace: 'pre-wrap' }}>{prog.expectedOutput}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Info & Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Explanation */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 10px' }}>Explanation</h4>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>{prog.explanation}</p>
          </div>

          {/* Why this output */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 10px' }}>Why this Output?</h4>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5, color: '#f5f5f7' }}>{prog.whyOutput}</p>
          </div>

          {/* Visual Execution Flow */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 14px' }}>Program Execution Flow</h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {prog.flow.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 14px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: 'rgba(168,85,247,0.1)', color: '#A855F7', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800' }}>{idx + 1}</span>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)' }}>{step}</span>
                  </div>
                  {idx < prog.flow.length - 1 && (
                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1rem', fontWeight: 'bold' }}>↓</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Complexity & Concepts */}
          <div className="c-pd-metadata-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Time Complexity</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#facc15' }}>{prog.complexity}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Space Complexity</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#4ade80' }}>{prog.space}</span>
            </div>
            {prog.concepts && prog.concepts.length > 0 && (
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Concepts Used</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {prog.concepts.map(tag => (
                    <span key={tag} style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {prog.relatedLessons && prog.relatedLessons.length > 0 && (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Related Lessons</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {prog.relatedLessons.map(lesson => (
                    <span key={lesson} style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)', color: '#A855F7' }}>{lesson}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
        <button className="c-btn-secondary" onClick={onPrev} disabled={!onPrev} style={{ opacity: onPrev ? 1 : 0.4, cursor: onPrev ? 'pointer' : 'not-allowed' }}>
          ← Previous Program
        </button>
        <button className="c-btn-primary" onClick={onNext} disabled={!onNext} style={{ opacity: onNext ? 1 : 0.4, cursor: onNext ? 'pointer' : 'not-allowed' }}>
          Next Program →
        </button>
      </div>
    </div>
  );
};

const ProgramsTab = () => {
  const categories = Object.keys(C_PROGRAMS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [copied, setCopied] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set());

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  if (selectedProgramId) {
    const activeList = C_PROGRAMS[activeCategory];
    const currentIdx = activeList.findIndex(p => p.id === selectedProgramId);
    const prog = activeList[currentIdx];

    const handlePrev = () => {
      if (currentIdx > 0) {
        setSelectedProgramId(activeList[currentIdx - 1].id);
      }
    };

    const handleNext = () => {
      if (currentIdx < activeList.length - 1) {
        setSelectedProgramId(activeList[currentIdx + 1].id);
      }
    };

    const handleDownload = () => {
      const blob = new Blob([prog.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prog.title.toLowerCase().replace(/\s+/g, '_')}.c`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <ProgramDetailView
        prog={prog}
        category={activeCategory}
        onBack={() => setSelectedProgramId(null)}
        onPrev={currentIdx > 0 ? handlePrev : null}
        onNext={currentIdx < activeList.length - 1 ? handleNext : null}
        isBookmarked={bookmarks.has(prog.id)}
        onBookmark={() => toggleBookmark(prog.id)}
        onCopy={() => handleCopy(prog.id, prog.code)}
        onDownload={handleDownload}
        isCopied={copied === prog.id}
      />
    );
  }

  return (
    <div className="c-tab-content c-programs-layout">
      <aside className="c-programs-sidebar">
        <div className="c-subsection-title" style={{ marginBottom: '14px' }}>Categories</div>
        <div className="c-prog-cat-list">
          {categories.map(cat => (
            <button key={cat} className={`c-prog-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
              <span className="c-prog-cat-count">{C_PROGRAMS[cat].length}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="c-programs-grid">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {C_PROGRAMS[activeCategory].map((prog) => (
              <div key={prog.id} className="c-program-card" onClick={() => setSelectedProgramId(prog.id)}>
                <div className="c-program-card-header" style={{ cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div className="c-program-title">{prog.title}</div>
                    <div className="c-program-statement">{prog.statement}</div>
                  </div>
                  <div className="c-program-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`c-complexity-badge ${prog.complexity === 'O(1)' ? 'complexity-o1' : 'complexity-on'}`}>{prog.complexity}</span>
                    <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: CODING PRACTICE
   ============================================================ */
const CodingPracticeTab = () => {
  const [activeProblem, setActiveProblem] = useState(C_PRACTICE_PROBLEMS[0]);
  const [code, setCode] = useState(C_STARTER_CODE[1]);
  const [consoleTab, setConsoleTab] = useState('output');
  const [showHint, setShowHint] = useState(false);
  const [fontSize, setFontSize] = useState('14');
  const [lineNumbers, setLineNumbers] = useState(true);

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(C_STARTER_CODE[prob.id]);
    setShowHint(false);
  };

  return (
    <div className="c-tab-content">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {C_PRACTICE_PROBLEMS.map(p => (
          <button key={p.id} onClick={() => handleProblemChange(p)} style={{ padding: '8px 16px', borderRadius: '9px', border: `1px solid ${activeProblem.id === p.id ? 'var(--primary-purple)' : 'var(--border-primary)'}`, background: activeProblem.id === p.id ? 'rgba(139,92,246,0.15)' : 'var(--card-bg)', color: activeProblem.id === p.id ? 'var(--accent-glow)' : 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {p.id}. {p.title}
            <span style={{ marginLeft: '8px', padding: '1px 7px', borderRadius: '100px', fontSize: '0.68rem', background: p.difficulty === 'Easy' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)', color: p.difficulty === 'Easy' ? '#4ade80' : '#facc15' }}>{p.difficulty}</span>
          </button>
        ))}
      </div>

      <div className="c-practice-layout">
        <div className="c-practice-panel">
          <div className="c-panel-header">
            <span className="c-panel-title"><FileText size={14} /> Problem</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {activeProblem.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.12)', color: 'var(--accent-glow)', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>)}
            </div>
          </div>
          <div className="c-panel-body">
            <div className="c-problem-title">{activeProblem.id}. {activeProblem.title}</div>
            <p className="c-problem-desc">{activeProblem.desc}</p>
            {activeProblem.examples.map((ex, i) => (
              <div key={i} className="c-problem-example">
                <div className="c-problem-example-label">Example {i + 1}</div>
                <pre>{`Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`}</pre>
              </div>
            ))}
            <div className="c-subsection-title" style={{ marginTop: '14px' }}><Info size={13} /> Constraints</div>
            <ul className="c-constraints-list">
              {activeProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="c-hint-accordion">
              <button className="c-hint-btn" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && <div className="c-hint-text">{activeProblem.hint}</div>}
            </div>
          </div>
        </div>

        <div className="c-practice-panel" style={{ background: '#080814' }}>
          <div className="c-panel-header" style={{ background: '#0d0d1a', borderColor: 'rgba(139,92,246,0.15)' }}>
            <span className="c-panel-title" style={{ color: '#e8e8f0' }}><Code2 size={14} /> Editor</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select className="c-editor-select"><option>C (GCC 13)</option><option>C99</option><option>C11</option></select>
              <select className="c-editor-select"><option>Dark Theme</option><option>Monokai</option></select>
              <select className="c-editor-select" value={fontSize} onChange={e => setFontSize(e.target.value)}>
                {['12','13','14','16','18'].map(s => <option key={s} value={s}>{s}px</option>)}
              </select>
            </div>
          </div>
          <div className="c-editor-toolbar">
            <label className="c-editor-toggle">
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} style={{ marginRight: '4px' }} />Line Numbers
            </label>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>Auto Save: ON</span>
          </div>
          <textarea className="c-editor-area" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} style={{ fontSize: `${fontSize}px`, flex: 1, minHeight: '320px' }} />
          <div className="c-editor-footer">
            <button className="c-btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }} onClick={() => setCode(C_STARTER_CODE[activeProblem.id])}>
              <RotateCcw size={13} /> Reset
            </button>
            <button className="c-btn-primary" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>
              <Play size={13} /> Run Code
            </button>
          </div>
        </div>

        <div className="c-practice-panel">
          <div className="c-console-tabs">
            {['output', 'testcases', 'runtime'].map(t => (
              <button key={t} className={`c-console-tab ${consoleTab === t ? 'active' : ''}`} onClick={() => setConsoleTab(t)}>
                {t === 'output' ? 'Output' : t === 'testcases' ? 'Test Cases' : 'Runtime'}
              </button>
            ))}
          </div>
          <div className="c-console-body">
            {consoleTab === 'output' && (
              <div className="c-console-placeholder"><Terminal size={28} /><p style={{ textAlign: 'center' }}>Run your code to see output here.</p></div>
            )}
            {consoleTab === 'testcases' && (
              <div className="c-test-case-grid">
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="c-test-case">
                    <div className="c-test-case-label">Test Case {i + 1}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input: {ex.input}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '4px' }}>Expected: {ex.output}</div>
                  </div>
                ))}
              </div>
            )}
            {consoleTab === 'runtime' && (
              <div className="c-runtime-grid">
                {[{ label: 'Runtime', val: '-- ms' }, { label: 'Memory', val: '-- MB' }, { label: 'Status', val: 'Pending' }, { label: 'Tests', val: '0/0' }].map((s, i) => (
                  <div key={i} className="c-runtime-stat"><strong>{s.val}</strong><span>{s.label}</span></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: QUIZ
   ============================================================ */
const QuizTab = () => {
  const [level, setLevel] = useState('beginner');
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  const questions = C_QUIZ_DATA[level];

  useEffect(() => { // eslint-disable-line
    if (quizStarted && !revealed && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleReveal(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted, current, revealed, finished]); // eslint-disable-line

  const handleSelect = (idx) => { if (!revealed) setSelected(idx); };
  const handleReveal = () => {
    clearInterval(timerRef.current);
    setRevealed(true);
    const correct = selected === questions[current].answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: questions[current].q, selected, correct, answer: questions[current].answer }]);
  };
  const handleNext = () => {
    if (current + 1 >= questions.length) { setFinished(true); return; }
    setCurrent(c => c + 1); setSelected(null); setRevealed(false); setTimeLeft(30);
  };
  const resetQuiz = () => {
    setQuizStarted(false); setCurrent(0); setSelected(null); setRevealed(false);
    setScore(0); setFinished(false); setAnswers([]); setTimeLeft(30);
    clearInterval(timerRef.current);
  };

  const pct = Math.round((score / questions.length) * 100);

  if (!quizStarted) {
    return (
      <div className="c-tab-content">
        <div className="c-quiz-level-selector">
          {[{ key: 'beginner', label: 'Beginner', icon: '🟢', count: C_QUIZ_DATA.beginner.length }, { key: 'intermediate', label: 'Intermediate', icon: '🟡', count: C_QUIZ_DATA.intermediate.length }, { key: 'advanced', label: 'Advanced', icon: '🔴', count: C_QUIZ_DATA.advanced.length }].map(l => (
            <div key={l.key} className={`c-quiz-level-btn ${level === l.key ? 'active' : ''}`} onClick={() => setLevel(l.key)}>
              <div className="c-quiz-level-icon">{l.icon}</div>
              <div className="c-quiz-level-name">{l.label}</div>
              <div className="c-quiz-level-count">{l.count} Questions</div>
            </div>
          ))}
        </div>
        <div className="c-quiz-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px' }}>C Programming {level.charAt(0).toUpperCase() + level.slice(1)} Quiz</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{questions.length} questions · 30 seconds per question · Instant explanations</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[['Questions', questions.length], ['Time/Q', '30s'], ['Explanation', 'Yes'], ['Scoring', '+1 correct']].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-primary)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-glow)' }}>{v}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{k}</div>
                </div>
              ))}
            </div>
            <button className="c-btn-primary" onClick={() => setQuizStarted(true)} style={{ padding: '13px 36px', fontSize: '1rem' }}>
              <Play size={18} /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="c-tab-content">
        <div className="c-quiz-container">
          <div className="c-quiz-score-screen">
            <div className="c-score-circle" style={{ '--score-pct': `${pct * 3.6}deg` }}>
              <div className="c-score-inner"><span className="c-score-pct">{pct}%</span><span className="c-score-label">Score</span></div>
            </div>
            <h2 className="c-score-title">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}</h2>
            <p className="c-score-subtitle">{pct >= 80 ? 'Great understanding of C programming!' : pct >= 60 ? 'Good work! Review the explanations for missed questions.' : 'Review the lessons and try again!'}</p>
            <div className="c-score-breakdown">
              <div className="c-score-stat"><strong style={{ color: '#4ade80' }}>{score}</strong><span>Correct</span></div>
              <div className="c-score-stat"><strong style={{ color: '#f87171' }}>{questions.length - score}</strong><span>Wrong</span></div>
              <div className="c-score-stat"><strong>{questions.length}</strong><span>Total</span></div>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              {answers.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '10px', background: a.correct ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)', border: `1px solid ${a.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, marginBottom: '8px' }}>
                  <span style={{ flexShrink: 0, marginTop: '1px' }}>{a.correct ? '✅' : '❌'}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Q{i + 1}: {a.q}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="c-btn-primary" onClick={resetQuiz}><RotateCcw size={15} /> Retry Quiz</button>
              <button className="c-btn-secondary" onClick={() => { setLevel(level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : 'beginner'); resetQuiz(); }}>
                <ArrowRight size={15} /> Next Level
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const optionLetters = ['A', 'B', 'C', 'D'];
  return (
    <div className="c-tab-content">
      <div className="c-quiz-container">
        <div className="c-quiz-top-bar">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{current + 1} / {questions.length}</span>
          <div className="c-quiz-progress-track"><div className="c-quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className={`c-quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}><Clock size={13} />{timeLeft}s</div>
        </div>
        <div className="c-quiz-body">
          <div className="c-quiz-q-num">Question {current + 1}</div>
          <div className="c-quiz-question">{q.q}</div>
          <div className="c-quiz-options">
            {q.options.map((opt, idx) => {
              let cls = '';
              if (revealed) { if (idx === q.answer) cls = 'correct'; else if (idx === selected) cls = 'incorrect'; }
              else if (idx === selected) cls = 'selected';
              return (
                <button key={idx} className={`c-quiz-option ${cls}`} onClick={() => handleSelect(idx)}>
                  <span className="c-quiz-option-letter">{optionLetters[idx]}</span>{opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="c-quiz-explanation">
              <strong>Explanation: </strong>{q.explanation}
            </motion.div>
          )}
          <div className="c-quiz-footer">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'var(--accent-glow)' }}>{score}</strong></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!revealed && <button className="c-btn-secondary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleReveal} disabled={selected === null}>Submit</button>}
              {revealed && <button className="c-btn-primary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleNext}>{current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight size={14} /></button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: PROJECTS
   ============================================================ */
const ProjectsTab = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filtered = filter === 'All' ? C_PROJECTS : C_PROJECTS.filter(p => p.diff === filter);
  return (
    <div className="c-tab-content">
      <div className="c-projects-filter">
        {filters.map(f => <button key={f} className={`c-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
      </div>
      <div className="c-projects-grid">
        {filtered.map((proj, i) => (
          <motion.div key={i} className="c-project-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="c-project-thumb" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.08))' }}>
              <span style={{ fontSize: '3.5rem' }}>{proj.emoji}</span>
            </div>
            <div className="c-project-body">
              <div className="c-project-tags">{proj.tags.map(t => <span key={t} className="c-project-tag">{t}</span>)}</div>
              <div className="c-project-title">{proj.title}</div>
              <p className="c-project-desc">{proj.desc}</p>
              <div className="c-project-meta">
                <span className={`c-diff-tag diff-${proj.diff.toLowerCase()}`}>{proj.diff}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{proj.time}</span>
              </div>
            </div>
            <div className="c-project-features">
              <h5>Key Features</h5>
              <ul>{proj.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
            </div>
            <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
              <button className="c-btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '9px', justifyContent: 'center' }}><Play size={13} /> Start Project</button>
              <button className="c-btn-secondary" style={{ fontSize: '0.82rem', padding: '9px 14px' }}><Download size={13} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   TAB: INTERVIEW QUESTIONS
   ============================================================ */
const InterviewTab = () => {
  const categories = Object.keys(C_INTERVIEW_QUESTIONS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());
  const toggleBookmark = (key) => setBookmarked(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  return (
    <div className="c-tab-content c-iq-layout">
      <aside className="c-iq-sidebar">
        <div className="c-subsection-title" style={{ marginBottom: '14px' }}>Sections</div>
        {categories.map(cat => (
          <button key={cat} className={`c-iq-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => { setActiveCategory(cat); setExpandedIdx(null); }}>
            {cat}<span className="c-prog-cat-count">{C_INTERVIEW_QUESTIONS[cat].length}</span>
          </button>
        ))}
      </aside>
      <div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="c-iq-list">
            {C_INTERVIEW_QUESTIONS[activeCategory].map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <div key={idx} className="c-iq-card">
                  <div className="c-iq-card-header" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                    <div className="c-iq-question">{item.q}</div>
                    <div className="c-iq-header-meta">
                      {item.freq && <span className="c-iq-freq-badge">🔥 Frequently Asked</span>}
                      <button className={`c-iq-bookmark-btn ${bookmarked.has(key) ? 'active' : ''}`} onClick={e => { e.stopPropagation(); toggleBookmark(key); }}>
                        <Bookmark size={15} fill={bookmarked.has(key) ? 'var(--accent-glow)' : 'none'} />
                      </button>
                      <button className="c-iq-expand-btn">
                        {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="c-iq-answer">
                        <p className="c-iq-answer-text">{item.a}</p>
                        <div className="c-iq-tip"><strong>💡 Tip: </strong>{item.tip}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: DOWNLOADS
   ============================================================ */
const DownloadsTab = () => (
  <div className="c-tab-content">
    <div className="c-downloads-grid">
      {C_DOWNLOADS.map((item, i) => (
        <motion.div key={i} className="c-download-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <div className="c-download-icon-row">
            <div className="c-download-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>{item.icon}</div>
            <div>
              <div className="c-download-title">{item.title}</div>
              <div className="c-download-meta">
                <div className="c-download-meta-item"><FileText size={11} />{item.type}</div>
                <div className="c-download-meta-item"><Database size={11} />{item.size}</div>
                <div className="c-download-meta-item"><Clock size={11} />Updated {item.updated}</div>
              </div>
            </div>
          </div>
          <p className="c-download-desc">{item.desc}</p>
          <button className="c-download-btn"><Download size={15} /> Download {item.type}</button>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   C LOGO SVG
   ============================================================ */
const CLogo = () => (
  <TechnologyLogo svg={TECH_LOGOS.c} name="C" />
);

/* ============================================================
   TABS CONFIG
   ============================================================ */
const TABS = [
  { id: 'overview', label: 'Overview', icon: <Home size={16} /> },
  { id: 'roadmap', label: 'Roadmap', icon: <Map size={16} /> },
  { id: 'lessons', label: 'Lessons', icon: <BookOpen size={16} /> },
  { id: 'programs', label: 'Programs', icon: <Code2 size={16} /> },
  { id: 'practice', label: 'Coding Practice', icon: <Terminal size={16} /> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={16} /> },
  { id: 'projects', label: 'Projects', icon: <Trophy size={16} /> },
  { id: 'interview', label: 'Interview Qs', icon: <Briefcase size={16} /> },
  { id: 'downloads', label: 'Downloads', icon: <Download size={16} /> },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const CLearningHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { state: { scrollToSection: 'technologies' } });
    }
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const { completedLessons: completed, toggleLessonComplete: toggleComplete } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':  return <OverviewTab setActiveTab={setActiveTab} />;
      case 'roadmap':   return <RoadmapTab setActiveTab={setActiveTab} setActiveLessonId={setActiveLessonId} completed={completed} />;
      case 'lessons':   return <LessonsTab activeLessonId={activeLessonId} setActiveLessonId={setActiveLessonId} completed={completed} toggleComplete={toggleComplete} />;
      case 'programs':  return <ProgramsTab />;
      case 'practice':  return <CodingPracticeTab />;
      case 'quiz':      return <QuizTab />;
      case 'projects':  return <ProjectsTab />;
      case 'interview': return <InterviewTab />;
      case 'downloads': return <DownloadsTab />;
      default:          return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="c-hub-wrapper">
      <div className="c-reading-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="c-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: '0' }}>C Language</button>
        {activeTab !== 'overview' && (
          <>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab === 'practice' ? 'Coding Practice' : activeTab === 'interview' ? 'Interview Qs' : activeTab}
            </span>
          </>
        )}
      </div>

      <div className="c-hero-banner">
        <div className="c-hero-inner">
          <CLogo />
          <div className="c-hero-text">
            <span className="c-badge">C LANGUAGE</span>
            <h1 className="c-hero-title">C Programming</h1>
            <p className="c-hero-subtitle">Beginner to Advanced</p>
            <p className="c-hero-desc">Learn C from scratch to advanced — pointers, memory management, data structures, algorithms, and system-level programming.</p>
            <div className="c-hero-stats">
              {[{ val: '45+', label: 'Lessons' }, { val: '120+', label: 'Programs' }, { val: '9+', label: 'Projects' }, { val: '30+', label: 'Quizzes' }, { val: '60+', label: 'Interview Qs' }].map((s, i) => (
                <div key={i} className="c-stat-pill"><strong>{s.val}</strong> {s.label}</div>
              ))}
            </div>
            <div className="c-hero-actions">
              <button className="c-btn-primary" onClick={() => setActiveTab('lessons')}><Play size={15} /> Start Learning <ChevronRight size={14} /></button>
              <button className="c-btn-secondary" onClick={() => setActiveTab('roadmap')}><Map size={15} /> View Roadmap</button>
            </div>
          </div>

          <div className="c-progress-card">
            <h4><TrendingUp size={15} /> Your Progress</h4>
            <div className="c-overall-progress">
              <div className="c-circle-progress">0%<br /><span style={{ fontSize: '0.55rem' }}>Done</span></div>
              <div className="c-progress-rows" style={{ flex: 1 }}>
                {[['Lessons Completed', '0 / 45'], ['Quizzes Completed', '0 / 10'], ['Programs Solved', '0 / 120'], ['Projects Completed', '0 / 9']].map(([l, v]) => (
                  <div key={l} className="c-progress-row"><span>{l}</span><span>{v}</span></div>
                ))}
              </div>
            </div>
            <button className="c-login-btn"><Lock size={13} /> Login to Save Progress</button>
          </div>
        </div>
      </div>

      <div className="c-tab-nav">
        <div className="c-tab-nav-inner">
          {TABS.map(tab => (
            <button key={tab.id} className={`c-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="c-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="c-content-area">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CLearningHub;
