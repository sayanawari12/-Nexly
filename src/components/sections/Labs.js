import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Globe, Layers } from 'lucide-react';
import '../../styles/sections.css';

const Labs = () => {
  const labs = [
    {
      icon: <Terminal className="lab-icon-glow" size={36} />,
      title: 'Programming Core Lab',
      desc: 'Our fundamental syntax staging ground. Equipped with GCC compilers, Java JDK suites, VS Code, and automated evaluation scripts.',
      tags: ['C/C++', 'Core Java', 'Data Structures', 'Python']
    },
    {
      icon: <Database className="lab-icon-glow" size={36} />,
      title: 'Database Systems Lab',
      desc: 'Optimized server stacks for running query engines, structuring relations, normalization pipelines, and practicing transaction controls.',
      tags: ['MySQL Server', 'PostgreSQL', 'NoSQL Nodes', 'SQL Queries']
    },
    {
      icon: <Globe className="lab-icon-glow" size={36} />,
      title: 'Computer Networks Lab',
      desc: 'Physical rack set with routers, L3 switches, network analyzers, packet capturing, and virtualization platforms to practice routing TCP/IP packets.',
      tags: ['Cisco Packets', 'WireShark', 'Subnets TCP', 'Sockets']
    },
    {
      icon: <Layers className="lab-icon-glow" size={36} />,
      title: 'Advanced Incubator Lab',
      desc: 'Incubation sandbox for major project teams. Features GPU architectures for training ML tensors, Android SDK platforms, and cloud interfaces.',
      tags: ['TensorFlow', 'Android SDK', 'React Framework', 'AWS Shell']
    }
  ];

  return (
    <section id="labs">
      <div className="section-header">
        <span className="section-tag">Infrastructure</span>
        <h2 className="section-title">Specialized Sandboxed Labs</h2>
        <p className="section-subtitle">
          Practice your engineering skills in high-fidelity computer centers equipped with modern operating systems and core developer tools.
        </p>
      </div>

      <div className="labs-grid">
        {labs.map((lab, idx) => (
          <motion.div
            key={idx}
            className="glass-card lab-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Lab visual card head */}
            <div className="lab-visual">
              {lab.icon}
            </div>

            <div className="lab-content">
              <h3 className="lab-title">{lab.title}</h3>
              <p className="lab-desc">{lab.desc}</p>
              
              <div className="lab-features">
                {lab.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="lab-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Labs;
