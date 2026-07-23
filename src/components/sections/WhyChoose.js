import React from 'react';
import { motion } from 'framer-motion';
import { Layers, GraduationCap, Briefcase, Zap, Cpu } from 'lucide-react';
import '../../styles/sections.css';

const WhyChoose = () => {
  const features = [
    {
      icon: <Layers size={28} />,
      title: 'Modern Agile Curriculum',
      desc: 'Our syllabi are custom-adapted annually to drop obsolete stacks and integrate React, Python, Cloud Architectures, and REST standards.'
    },
    {
      icon: <Cpu size={28} />,
      title: 'Industry Ready Sandbox',
      desc: 'Learn on staging systems, use git workflows in groups, and deploy production endpoints. You graduate as an experienced builder, not a theoretician.'
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Eminent Faculty Advisors',
      desc: 'Undergo mentorship from experienced researchers and active software engineers. Learn real-world coding heuristics and tradecraft.'
    },
    {
      icon: <Briefcase size={28} />,
      title: 'Placement Core Launchpad',
      desc: 'Direct networking pipelines to tier-1 companies. We run pre-placement bootcamps, resume engineering reviews, and mock interview drills.'
    },
    {
      icon: <Zap size={28} />,
      title: 'Incubation & Innovation',
      desc: 'Get technical advisory and infrastructure support to launch side-hustles, design SaaS solutions, or incubate academic concepts into startups.'
    }
  ];

  return (
    <section id="why-choose" className="why-section">
      <div className="section-header">
        <span className="section-tag">ADVANTAGES</span>
        <h2 className="section-title">Engineered for Excellence</h2>
        <p className="section-subtitle">
          Discover why our Bachelor of Computer Applications program stands as a premier launchpad for technology professionals.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className="why-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="why-card-icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
