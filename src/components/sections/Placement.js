import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, Users, CheckCircle2 } from 'lucide-react';
import { COMPANY_LOGOS } from './CompanyLogos';
import '../../styles/sections.css';

const Placement = () => {
  const stats = [
    { number: '18 LPA', label: 'Highest Package', icon: <TrendingUp size={20} /> },
    { number: '6.5 LPA', label: 'Average Package', icon: <Building2 size={20} /> },
    { number: '98.2%', label: 'Placement Rate', icon: <CheckCircle2 size={20} /> },
    { number: '45+', label: 'Hiring Partners', icon: <Users size={20} /> }
  ];

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

  const successStory = {
    quote: "The academic rigor, hands-on lab projects, and mock placement drills at the BCA department prepared me perfectly. I signed my software engineering offer with IBM even before writing my final semester exams!",
    author: "Amit Roy — Systems Engineer, IBM (Batch of 2025)",
    package: "IBM Cloud Platforms // 11 LPA Offer"
  };

  return (
    <section id="placements">
      <div className="section-header">
        <span className="section-tag">Career Portal</span>
        <h2 className="section-title">Launch Into Tier-1 Tech</h2>
        <p className="section-subtitle">
          We maintain direct ties with global software companies, providing a fast-track pipeline for internships and full-time engineering offers.
        </p>
      </div>

      <div className="placement-container">
        {/* Placement statistics */}
        <motion.div 
          className="placement-stats"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card placement-stat-card">
              <div style={{ display: 'inline-flex', background: 'rgba(139,92,246,0.1)', padding: '10px', borderRadius: '50%', color: 'var(--accent-glow)', marginBottom: '12px' }}>
                {stat.icon}
              </div>
              <div className="placement-stat-number">{stat.number}</div>
              <div className="placement-stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Company logos and success story */}
        <motion.div 
          className="placement-companies"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Companies Grid */}
          <div className="companies-grid">
            {companies.map((comp) => (
              <div 
                key={comp.id} 
                className="glass-card company-logo-card"
                title={comp.name}
                dangerouslySetInnerHTML={{ __html: COMPANY_LOGOS[comp.id] }}
              />
            ))}
          </div>

          {/* Success highlight */}
          <div className="glass-card success-highlight">
            <p className="success-quote">"{successStory.quote}"</p>
            <div className="success-author">{successStory.author}</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-glow)', marginTop: '4px', fontWeight: 'bold' }}>{successStory.package}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Placement;

