import React from 'react';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/sections.css';

const Footer = () => {
  const handleScrollTop = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        
        {/* Footer Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <Code2 size={26} color="#A855F7" />
            <span className="footer-logo-title">
              BCA <span className="footer-dept-badge">DEPT</span>
            </span>
          </div>

          <p className="footer-brand-desc">
            Shaping future developers and tech leaders through premium technical training and research excellence.
          </p>

          <div className="footer-socials">
            {/* Github Inline SVG */}
            <motion.a 
              href="https://github.com" 
              className="footer-social-icon" 
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </motion.a>
            
            {/* LinkedIn Inline SVG */}
            <motion.a 
              href="https://linkedin.com" 
              className="footer-social-icon" 
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </motion.a>
            
            {/* Twitter Inline SVG */}
            <motion.a 
              href="https://twitter.com" 
              className="footer-social-icon" 
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </motion.a>
            
            {/* Youtube Inline SVG */}
            <motion.a 
              href="https://youtube.com" 
              className="footer-social-icon" 
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Column 1: Directory */}
        <div className="footer-col">
          <h4>Directory</h4>
          <ul className="footer-links">
            <li><a href="#about" onClick={(e) => handleScrollTop(e, '#about')}>About Us</a></li>
            <li><a href="#roadmap" onClick={(e) => handleScrollTop(e, '#roadmap')}>Curriculum</a></li>
            <li><a href="#labs" onClick={(e) => handleScrollTop(e, '#labs')}>Specialized Labs</a></li>
            <li><a href="#projects" onClick={(e) => handleScrollTop(e, '#projects')}>Student Portfolios</a></li>
          </ul>
        </div>

        {/* Column 2: Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="#resources" onClick={(e) => handleScrollTop(e, '#resources')}>Study Material</a></li>
            <li><a href="#resources" onClick={(e) => handleScrollTop(e, '#resources')}>Syllabus Pack</a></li>
            <li><a href="#resources" onClick={(e) => handleScrollTop(e, '#resources')}>Previous Papers</a></li>
            <li><a href="#faqs" onClick={(e) => handleScrollTop(e, '#faqs')}>FAQ Portal</a></li>
          </ul>
        </div>

        {/* Column 3: Admissions */}
        <div className="footer-col">
          <h4>Admissions</h4>
          <ul className="footer-links">
            <li><a href="#contact" onClick={(e) => handleScrollTop(e, '#contact')}>Contact Desk</a></li>
            <li><a href="#placements" onClick={(e) => handleScrollTop(e, '#placements')}>Placement Stats</a></li>
            <li><a href="#contact" onClick={(e) => handleScrollTop(e, '#contact')}>Incubator Shell</a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Department of Bachelor of Computer Applications (BCA). All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#about" onClick={(e) => handleScrollTop(e, '#about')}>Privacy Protocols</a>
          <a href="#about" onClick={(e) => handleScrollTop(e, '#about')}>Terms of Usage</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
