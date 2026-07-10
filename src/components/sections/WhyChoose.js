import React from 'react';
import { motion } from 'framer-motion';
import { Layers, GraduationCap, Briefcase, Zap, Cpu } from 'lucide-react';
import '../../styles/sections.css';

const WhyChoose = () => {
  const features = [
    {
      icon: <Layers size={32} />,
      title: 'Modern Agile Curriculum',
      desc: 'Our syllabi are custom-adapted annually to drop obsolete stacks and integrate React, Python, Cloud Architectures, and REST standards.'
    },
    {
      icon: <Cpu size={32} />,
      title: 'Industry Ready Sandbox',
      desc: 'Learn on staging systems, use git workflows in groups, and deploy production endpoints. You graduate as an experienced builder, not a theoretician.'
    },
    {
      icon: <GraduationCap size={32} />,
      title: 'Eminent Faculty Advisors',
      desc: 'Undergo mentorship from experienced researchers and active software engineers. Learn real-world coding heuristics and tradecraft.'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Placement Core Launchpad',
      desc: 'Direct networking pipelines to tier-1 companies. We run pre-placement bootcamps, resume engineering reviews, and mock interview drills.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Incubation & Innovation',
      desc: 'Get technical advisory and infrastructure support to launch side-hustles, design SaaS solutions, or incubate academic concepts into startups.'
    }
  ];

  return (
    <section id="why-choose">
      <div className="section-header">
        <span className="section-tag">ADVANTAGES</span>
        <h2 className="section-title">Engineered for Excellence</h2>
        <p className="section-subtitle">
          Discover why our Bachelor of Computer Applications program stands as a premier launches for technology professionals.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className="glass-card why-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
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
