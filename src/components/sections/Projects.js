import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import '../../styles/sections.css';

const Projects = () => {
  const projects = [
    {
      title: 'DevArena // Group Shell',
      desc: 'Real-time collaborative code editor supporting multi-user socket buffers, instant compilation terminals, and terminal chat systems.',
      tech: ['React.js', 'Socket.io', 'Node.js', 'Docker API'],
      live: '#',
      github: '#'
    },
    {
      title: 'NeuroScan // MRI Analyzer',
      desc: 'Deep learning imaging pipeline designed to process brain MRI scans, identify micro-structural anomalies, and generate report layouts.',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
      live: '#',
      github: '#'
    },
    {
      title: 'CloudVault // Crypt Engine',
      desc: 'Distributed passwords and keys vault utilizing client-side RSA ciphers, zero-knowledge sync, and automatic leak warnings.',
      tech: ['Go', 'WebAssembly', 'React', 'PostgreSQL'],
      live: '#',
      github: '#'
    },
    {
      title: 'VoxelRender // 3D Matrix',
      desc: 'In-browser graphics sandbox allowing users to load GLTF models, manipulate lighting arrays, and render custom particle fields.',
      tech: ['React Fiber', 'Three.js', 'GLSL Shaders', 'Vite'],
      live: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-tag">Showcase</span>
        <h2 className="section-title">Student Project Portfolios</h2>
        <p className="section-subtitle">
          Explore production-level applications, neural networks, and cryptography systems engineered by our senior BCA batches.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="glass-card project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
          >
            <div className="project-header">
              <div className="project-icon-box">
                <FolderGit2 size={24} />
              </div>
              <div className="project-links">
                <a href={proj.github} className="project-link-icon" aria-label="GitHub Repository" style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a href={proj.live} className="project-link-icon" aria-label="Live Demo Link">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.desc}</p>
            
            <div className="project-tech">
              {proj.tech.map((tag, tIdx) => (
                <span key={tIdx} className="project-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
