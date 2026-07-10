import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import '../../styles/sections.css';

const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqs = [
    {
      q: "What is the eligibility criteria for BCA admission?",
      a: "Candidates must have completed their 10+2 (Higher Secondary) exams from a recognized board with minimum 50% aggregate score. Mathematics or Computer Application at 10+2 is highly preferred but not mandatory."
    },
    {
      q: "What programming stacks are covered in the curriculum?",
      a: "Our modern syllabus covers fundamental C/C++ syntax, Core Java platform constructs, Python scripting, full stack Web Technologies (HTML, CSS, modern JavaScript, React.js, Node.js), Relational Databases (SQL, DBMS), and Linux operating tools."
    },
    {
      q: "Does the department conduct mock placement preparations?",
      a: "Absolutely. The placement cell coordinates resume writing bootcamps, technical mockup coding rounds, structural database optimization worksheets, and mock personal interviews starting in the fifth semester."
    },
    {
      q: "Can students incubate start-up ideas inside the department?",
      a: "Yes. Our Incubator Lab provides workspace desks, server instances, GPU staging resources, and direct mentorship from industry consultants to build side-hustles, SaaS prototypes, or university projects into startups."
    },
    {
      q: "Are the PYQs, class notes, and syllabi available online?",
      a: "All academic resource sheets (detailed syllabi, class notes, coding manuals, previous years question papers) are kept open for public download on our digital Resources Portal, accessible on both desktop and mobile devices."
    }
  ];

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="faqs">
      <div className="section-header">
        <span className="section-tag">Help Desk</span>
        <h2 className="section-title">Frequently Asked Queries</h2>
        <p className="section-subtitle">
          Have queries about the course layout, admissions, coding labs, or placement vectors? Review our answers.
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`glass-card faq-item ${activeIdx === idx ? 'active' : ''}`}
            style={{ 
              borderColor: activeIdx === idx ? 'rgba(139, 92, 246, 0.25)' : 'var(--border-primary)',
              background: activeIdx === idx ? 'rgba(255, 255, 255, 0.04)' : 'var(--card-bg)'
            }}
          >
            <button 
              className="faq-trigger" 
              onClick={() => toggleAccordion(idx)}
              aria-expanded={activeIdx === idx}
            >
              <h3>{faq.q}</h3>
              <div className="faq-icon-wrapper">
                <ChevronDown size={18} />
              </div>
            </button>
            
            <div 
              className="faq-content"
              style={{ 
                maxHeight: activeIdx === idx ? '200px' : '0'
              }}
            >
              <p className="faq-answer">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
