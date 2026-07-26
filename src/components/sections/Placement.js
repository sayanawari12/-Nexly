import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Sparkles,
  Briefcase,
  BookOpen,
  Code2,
  Brain,
  UserCheck,
  CheckCircle,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { COMPANY_LOGOS } from './CompanyLogos';
import '../../styles/sections.css';

const Placement = () => {
  /* ── 1. Realistic Career Ranges ── */
  const careerRanges = [
    {
      range: '₹3–6 LPA',
      label: 'Typical Entry-Level Range',
      icon: <Briefcase size={22} />,
      badge: 'Foundation'
    },
    {
      range: '₹6–12 LPA',
      label: 'Strong Skill Profile',
      icon: <TrendingUp size={22} />,
      badge: 'Intermediate'
    },
    {
      range: '₹12–20+ LPA',
      label: 'Top Product Companies',
      icon: <Award size={22} />,
      badge: 'Advanced'
    },
    {
      range: 'Internships',
      label: 'Paid Opportunities',
      icon: <Sparkles size={22} />,
      badge: 'Early Career'
    }
  ];

  /* ── 2. Company Logos Array ── */
  const companies = [
    { id: 'microsoft', name: 'Microsoft' },
    { id: 'google', name: 'Google' },
    { id: 'amazon', name: 'Amazon' },
    { id: 'ibm', name: 'IBM' },
    { id: 'infosys', name: 'Infosys' },
    { id: 'tcs', name: 'TCS' },
    { id: 'wipro', name: 'Wipro' },
    { id: 'accenture', name: 'Accenture' },
    { id: 'cognizant', name: 'Cognizant' },
    { id: 'oracle', name: 'Oracle' },
    { id: 'adobe', name: 'Adobe' },
    { id: 'intel', name: 'Intel' }
  ];

  /* ── 3. Learning Journey Steps ── */
  const journeySteps = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Master fundamentals, C/C++, Java & Python concepts',
      icon: <BookOpen size={20} />
    },
    {
      num: '02',
      title: 'Build Projects',
      desc: 'Develop real-world web apps & software solutions',
      icon: <Code2 size={20} />
    },
    {
      num: '03',
      title: 'Practice Coding',
      desc: 'Solve DSA challenges & optimize algorithms',
      icon: <Brain size={20} />
    },
    {
      num: '04',
      title: 'Prepare for Interviews',
      desc: 'Practice mock technical & system design drills',
      icon: <UserCheck size={20} />
    },
    {
      num: '05',
      title: 'Apply with Confidence',
      desc: 'Target paid internships & software engineering roles',
      icon: <CheckCircle size={20} />
    }
  ];

  return (
    <section id="placements" className="career-section-wrapper">
      
      {/* ── Section Header ── */}
      <div className="section-header">
        <span className="section-tag">Career Opportunities</span>
        <h2 className="section-title">
          Build Real Skills.<br />
          <span className="purple-gradient-text">Unlock Career Opportunities.</span>
        </h2>
        <p className="section-subtitle career-subtitle">
          Master programming, build real-world projects, strengthen your problem-solving skills, and prepare yourself for internships and entry-level software engineering opportunities.
        </p>
        <p className="career-subtitle-secondary">
          Your dedication, projects, coding skills, and interview preparation can help you stand out during the hiring process.
        </p>
      </div>

      <div className="career-main-container">

        {/* ── 1. Realistic Career Range Cards ── */}
        <motion.div 
          className="career-ranges-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {careerRanges.map((item, idx) => (
            <div key={idx} className="glass-card career-range-card">
              <div className="career-card-header">
                <div className="career-icon-box">
                  {item.icon}
                </div>
                <span className="career-badge">{item.badge}</span>
              </div>
              <div className="career-range-val">{item.range}</div>
              <div className="career-range-lbl">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── 2. Companies Where Skills Are Valued ── */}
        <motion.div 
          className="companies-section-box glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="companies-box-header">
            <h3 className="companies-title">Companies Where These Skills Are Valued</h3>
            <p className="companies-disclaimer">
              These logos represent tech companies where software engineering, data structures, and system skills are commonly valued during recruiting.
            </p>
          </div>

          <div className="companies-grid">
            {companies.map((comp) => (
              <div 
                key={comp.id} 
                className="company-logo-card"
                title={comp.name}
                dangerouslySetInnerHTML={{ __html: COMPANY_LOGOS[comp.id] }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── 3. Learning Journey Pipeline ── */}
        <motion.div 
          className="learning-journey-container glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="journey-header">
            <span className="journey-tag">Roadmap To Success</span>
            <h3 className="journey-main-title">Your 5-Step Career Preparation Journey</h3>
          </div>

          <div className="journey-pipeline">
            {journeySteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="journey-step-card">
                  <div className="step-top-row">
                    <span className="step-num">{step.num}</span>
                    <div className="step-icon-circle">{step.icon}</div>
                  </div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>

                {idx < journeySteps.length - 1 && (
                  <div className="journey-arrow-divider" aria-hidden="true">
                    <ChevronRight size={22} className="desktop-arrow" />
                    <ArrowRight size={18} className="mobile-arrow" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Placement;
