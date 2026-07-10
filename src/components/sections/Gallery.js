import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import '../../styles/sections.css';

const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const galleryItems = [
    {
      title: 'Computing Web Lab',
      tag: 'Infrastructure',
      desc: 'Our high-speed programming workspace hosting GCC systems and terminal environments.'
    },
    {
      title: 'Smart Seminar Hub',
      tag: 'Academics',
      desc: 'Equipped with digital projection setups to host research talks, tech briefings, and thesis defenses.'
    },
    {
      title: 'Hackathon Arena 2026',
      tag: 'Events',
      desc: 'Annual 36-hour creative coding marathon where teams construct working SaaS architectures from scratch.'
    },
    {
      title: 'IoT Prototyping Rack',
      tag: 'Hardware',
      desc: 'Hardware staging area hosting Raspberry Pi units, microcontrollers, sensor kits, and logic readers.'
    },
    {
      title: 'Main Library Archives',
      tag: 'Research',
      desc: 'Housing hundreds of digital resource journals, IEEE archives, and advanced programming texts.'
    },
    {
      title: 'Collaborative Garden',
      tag: 'Campus Life',
      desc: 'Outdoor WiFi-equipped courtyard designed for group discussions, code reviews, and creative exchanges.'
    }
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  return (
    <section id="gallery">
      <div className="section-header">
        <span className="section-tag">Campus Tour</span>
        <h2 className="section-title">Department Portals & Labs</h2>
        <p className="section-subtitle">
          Take a virtual walk through our classrooms, sandbox incubators, hardware test grids, and academic centers.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="gallery-card"
            onClick={() => setSelectedIdx(idx)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div className="gallery-card-inner">
              <div className="gallery-icon-box">
                <ImageIcon size={20} />
              </div>
              <h3 className="gallery-card-title">{item.title}</h3>
              <span className="gallery-card-tag">{item.tag}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox-close" 
                onClick={() => setSelectedIdx(null)}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              <div className="glass-card lightbox-main-card">
                {/* Visual Placeholder for high-end graphic */}
                <div className="lightbox-visual-display">
                  <ImageIcon size={48} />
                </div>
                
                <h3 className="lightbox-title">{galleryItems[selectedIdx].title}</h3>
                <p className="lightbox-desc">{galleryItems[selectedIdx].desc}</p>
                <span className="section-tag" style={{ fontSize: '10px' }}>{galleryItems[selectedIdx].tag}</span>

                <div className="lightbox-meta" style={{ marginTop: '30px' }}>
                  <button className="lightbox-nav-btn" onClick={handlePrev}>
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button className="lightbox-nav-btn" onClick={handleNext}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
