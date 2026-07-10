import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BookOpen, Binary, FileQuestion } from 'lucide-react';
import '../../styles/sections.css';

const Resources = () => {
  const resourceCategories = [
    {
      icon: <BookOpen size={22} />,
      title: 'Academic Syllabus',
      items: [
        { name: 'BCA Course Curriculum (2026)', size: '1.2 MB', ext: 'PDF' },
        { name: 'Lab Evaluation Standards', size: '420 KB', ext: 'PDF' }
      ]
    },
    {
      icon: <FileText size={22} />,
      title: 'Study Lecture Notes',
      items: [
        { name: 'C Programming Syntaxes', size: '2.4 MB', ext: 'PDF' },
        { name: 'DBMS Relations & SQL Guide', size: '3.1 MB', ext: 'PDF' },
        { name: 'React SPA Hooks Cheat Sheet', size: '950 KB', ext: 'PDF' }
      ]
    },
    {
      icon: <FileQuestion size={22} />,
      title: 'Previous Papers (PYQs)',
      items: [
        { name: 'Database Exam Papers 2025', size: '850 KB', ext: 'ZIP' },
        { name: 'Networks Mid-Sem Papers 2024', size: '620 KB', ext: 'PDF' }
      ]
    },
    {
      icon: <Binary size={22} />,
      title: 'Coding Task Sheets',
      items: [
        { name: 'Data Structures Lab Manual', size: '1.8 MB', ext: 'PDF' },
        { name: 'Unix Shell Scripting Labs', size: '780 KB', ext: 'PDF' }
      ]
    }
  ];

  return (
    <section id="resources">
      <div className="section-header">
        <span className="section-tag">Learning Assets</span>
        <h2 className="section-title">Academic Study Resources</h2>
        <p className="section-subtitle">
          Access syllabi, study notes, past papers, and laboratory task guides. Download direct resource binaries instantly.
        </p>
      </div>

      <div className="resources-grid">
        {resourceCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="glass-card resource-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <div className="resource-header">
              <div className="resource-icon-wrapper">{cat.icon}</div>
              <h3>{cat.title}</h3>
            </div>

            <div className="resource-body">
              <ul className="resource-list">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="resource-item">
                    <div>
                      <div className="resource-name">{item.name}</div>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{item.ext} // {item.size}</span>
                    </div>
                    {/* Simulated download anchor */}
                    <a href="#resources" className="resource-download" aria-label="Download Resource">
                      <Download size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
