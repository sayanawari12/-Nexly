import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/sections.css';

const Roadmap = () => {
  const navigate = useNavigate();
  const [activeSem, setActiveSem] = useState(1);

  const semestersData = {
    1: {
      title: 'Foundational Programming',
      theme: 'Establishing core engineering logic, mathematical patterns, and syntax skills.',
      subjects: [
        { 
          code: 'BCA-101', 
          name: 'Problem Solving Using C', 
          desc: 'Learn programming fundamentals including variables, data types, operators, decision making, loops, functions, arrays, pointers, structures, file handling, and problem-solving techniques using the C programming language.' 
        },
        { 
          code: 'BCA-102', 
          name: 'Computer Architecture', 
          desc: 'Study computer organization, CPU architecture, memory hierarchy, input/output systems, instruction execution, registers, logic gates, and digital computer fundamentals.' 
        },
        { 
          code: 'BCA-103', 
          name: 'Mathematics Foundation to Computer Science', 
          desc: 'Build strong mathematical foundations including sets, relations, functions, matrices, logic, graph theory, Boolean algebra, and numerical methods for computer science.' 
        },
        { 
          code: 'BCA-104', 
          name: 'General English', 
          desc: 'Develop communication, vocabulary, grammar, technical writing, presentation skills, and professional English for academic and industry environments.' 
        },
        { 
          code: 'BCA-105', 
          name: 'Indian Knowledge System', 
          desc: "Explore India's scientific heritage, traditional knowledge systems, ethical values, innovation, philosophy, and their relevance in modern technology and education." 
        },
        { 
          code: 'BCA-106', 
          name: 'Environmental Science and Sustainability', 
          desc: 'Understand environmental protection, sustainable development, climate change, biodiversity conservation, renewable resources, and responsible technological practices.' 
        }
      ]
    },
    2: {
      title: 'Object Orientation & Structures',
      theme: 'Structuring complex datasets, OOP patterns, and physical circuits.',
      subjects: [
        { 
          code: 'BCA-201', 
          name: 'Object Oriented Programming using C++', 
          desc: 'Learn object-oriented programming concepts including classes, objects, constructors, inheritance, polymorphism, abstraction, encapsulation, file handling, and exception handling using C++.' 
        },
        { 
          code: 'BCA-202', 
          name: 'Data Structures', 
          desc: 'Study arrays, linked lists, stacks, queues, trees, graphs, hashing, searching, sorting, recursion, and algorithm complexity.' 
        },
        { 
          code: 'BCA-203', 
          name: 'Operating Systems', 
          desc: 'Understand process management, CPU scheduling, memory management, deadlocks, file systems, synchronization, and operating system concepts.' 
        },
        { 
          code: 'BCA-204', 
          name: 'Web Technologies', 
          desc: 'Learn HTML5, CSS3, JavaScript, responsive web design, forms, DOM manipulation, and modern web development fundamentals.' 
        },
        { 
          code: 'BCA-205', 
          name: 'Object Oriented Programming using Java', 
          desc: 'Study Java programming, OOP concepts, classes, objects, inheritance, interfaces, exception handling, collections, multithreading, and file handling.' 
        },
        { 
          code: 'BCA-206', 
          name: 'Indian Constitution', 
          desc: 'Understand the Constitution of India, Fundamental Rights, Fundamental Duties, Directive Principles, constitutional values, governance, and democratic institutions.' 
        }
      ]
    },
    3: {
      title: 'Systems & Relational Databases',
      theme: 'Connecting code to physical systems and structural database nodes.',
      subjects: [
        { code: 'BCA-301', name: 'Operating Systems', desc: 'Thread scheduling, paging systems, file structures, and lock systems.' },
        { code: 'BCA-302', name: 'Relational DBMS', desc: 'SQL standards, normalization rules, ACID properties, and indexing structures.' },
        { code: 'BCA-303', name: 'Python Engineering', desc: 'Iterators, scripts, file handling, and NumPy data analytics.' },
        { code: 'BCA-304', name: 'Software Development Life', desc: 'Agile architectures, UML modeling, and testing metrics.' }
      ]
    },
    4: {
      title: 'Networking & Web Architectures',
      theme: 'Structuring distributed systems, net sockets, and modern HTML engines.',
      subjects: [
        { code: 'BCA-401', name: 'Java Platform Core', desc: 'JVM specifications, multithreading, swings, and socket ports.' },
        { code: 'BCA-402', name: 'Computer Networks', desc: 'TCP/IP layers, routing protocols, subnets, and DNS nodes.' },
        { code: 'BCA-403', name: 'Web Technologies Stack', desc: 'DOM methods, CSS layouts, JS ES6 asynchronous loops, and API requests.' },
        { code: 'BCA-404', name: 'Organizational Behaviors', desc: 'Engineering project management and operational dynamics.' }
      ]
    },
    5: {
      title: 'Advanced Applications & Cloud Platforms',
      theme: 'Deploying cloud instances, creating app binaries, and scaling backends.',
      subjects: [
        { code: 'BCA-501', name: 'Advanced Web Dev (React)', desc: 'SPA architectures, virtual DOM, hooks, and REST APIs.' },
        { code: 'BCA-502', name: 'Cloud Server Platforms', desc: 'AWS services, virtualization, serverless code nodes, and Docker.' },
        { code: 'BCA-503', name: 'Mobile App Architecture', desc: 'Android layouts, intent links, services, and local databases.' },
        { code: 'BCA-504', name: 'Network Security Crypt', desc: 'RSA ciphers, hashing, firewalls, and HTTPS handshakes.' }
      ]
    },
    6: {
      title: 'AI, Graphics & Major Production',
      theme: 'Developing ML engines, shader scripts, and defending a thesis portfolio.',
      subjects: [
        { code: 'BCA-601', name: 'Machine Learning Core', desc: 'Regression, neural nodes, tensor layers, and training validations.' },
        { code: 'BCA-602', name: 'Computer Graphics Canvas', desc: 'Rasterization algorithms, transformation matrices, and shader concepts.' },
        { code: 'BCA-603', name: 'Major Thesis Project', desc: 'Designing, packaging, testing, and deploying a commercial SaaS system.' },
        { code: 'BCA-604', name: 'Enterprise Java Framework', desc: 'Spring Boot APIs, database mapping, and microservices.' }
      ]
    }
  };

  const handleSubjectClick = (subCode) => {
    // Slugs mapping for Semester 2 subjects
    const sem2Slugs = {
      'BCA-201': 'cpp-oop',
      'BCA-202': 'data-structures',
      'BCA-203': 'operating-systems',
      'BCA-204': 'web-technologies',
      'BCA-205': 'java-oop',
      'BCA-206': 'indian-constitution'
    };

    if (sem2Slugs[subCode]) {
      navigate(`/curriculum/semester-2/${sem2Slugs[subCode]}`);
      window.scrollTo(0, 0); // Snaps to top of documentation view
    }
  };

  return (
    <section id="roadmap">
      <div className="section-header">
        <span className="section-tag">Syllabus Grid</span>
        <h2 className="section-title">Academic Semester Roadmap</h2>
        <p className="section-subtitle">
          Explore our modern, industry-aligned course path structure. Click a semester below to view its main subjects.
        </p>
      </div>

      <div className="roadmap-container">
        {/* Semester selector tabs */}
        <div className="roadmap-tabs">
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              className={`roadmap-tab ${activeSem === sem ? 'active' : ''}`}
              onClick={() => setActiveSem(sem)}
            >
              Semester {sem}
            </button>
          ))}
        </div>

        {/* Content displays */}
        <div className="roadmap-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSem}
              className="glass-card roadmap-content-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="roadmap-header">
                <h3>{semestersData[activeSem].title}</h3>
                <p>{semestersData[activeSem].theme}</p>
              </div>

              <div className="subjects-grid">
                {semestersData[activeSem].subjects.map((sub, idx) => {
                  const isClickable = activeSem === 2;
                  return (
                    <div 
                      key={idx} 
                      className={`subject-item ${isClickable ? 'clickable-subject' : ''}`}
                      onClick={() => handleSubjectClick(sub.code)}
                      style={{ cursor: isClickable ? 'pointer' : 'default' }}
                    >
                      <span className="subject-code">{sub.code}</span>
                      <h4 className="subject-name">
                        {sub.name}
                        {isClickable && <span className="clickable-badge">Interactive Syllabus</span>}
                      </h4>
                      <p className="subject-desc">{sub.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
