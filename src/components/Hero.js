import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line1">Find your notes.</span>
            <span className="title-line2">Instantly.</span>
          </h1>
          <p className="hero-subtitle">
            Search all BCA study material in one place. No folders. No confusion. Just results.
          </p>
          <div className="hero-buttons">
            <button className="btn-explore">Explore Notes</button>
            <button className="btn-secondary">Browse Subjects</button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glass-card">
            <div className="mock-header">
              <div className="mock-dot"></div>
              <div className="mock-dot"></div>
              <div className="mock-dot"></div>
            </div>
            <div className="mock-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(203, 213, 245, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <div className="mock-search-line"></div>
            </div>
            <div className="mock-content">
              {[1, 2, 3, 4].map((i) => (
                <div className="mock-row" key={i}>
                  <div className="mock-icon"></div>
                  <div className="mock-text" style={{width: `${Math.random() * 40 + 40}%`}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
