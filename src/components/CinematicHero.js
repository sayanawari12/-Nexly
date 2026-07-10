import React from 'react';
import { Play } from 'lucide-react';
import laptopMockupImg from '../assets/images/laptop_mockup.jpg';
import '../styles/Hero.css';

const CinematicHero = () => {
  const handleScrollDown = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-simple-section" id="hero">
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>

      {/* Split-screen layout */}
      <div className="hero-grid-split">
        
        {/* Left side text overlays */}
        <div className="hero-text-side">
          <div className="hero-tagline">INNOVATION & EDUCATION</div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME TO</span>
            <span className="title-dept">Department of</span>
            <span className="title-bca text-gradient-purple">BCA</span>
          </h1>
          <p className="hero-subtitle">
            Empowering future software developers, system architects, and tech innovators through advanced, industry-aligned training.
          </p>
          
          <div className="hero-actions">
            <a 
              href="#about" 
              onClick={(e) => handleScrollDown(e, '#about')}
              className="btn-premium-purple"
            >
              Explore Department
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleScrollDown(e, '#gallery')}
              className="btn-premium"
            >
              <Play size={16} fill="currentColor" /> Virtual Tour
            </a>
          </div>
        </div>

        {/* Right side static laptop image wrapper with premium floating & glowing effects */}
        <div className="hero-image-side">
          <div className="hero-image-wrapper">
            <img 
              src={laptopMockupImg} 
              alt="BCA Developer Laptop Mockup" 
              className="hero-laptop-img"
            />
            {/* Subtle glow highlight on screen bezel */}
            <div className="hero-image-overlay-glow" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CinematicHero;
