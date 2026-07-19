import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import laptopMockupImg from '../assets/images/laptop_mockup.jpg';
import '../styles/HeroWow.css';

const HeroWow = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate tilt offset angles (limit to -10 to +10 degrees for elegant restraint)
    const x = (clientX / innerWidth - 0.5) * 12;
    const y = (clientY / innerHeight - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    // Reset back to center smoothly
    setTilt({ x: 0, y: 0 });
  };

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
    <section className="hero-simple-section" id="hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

      {/* ── Cinematic Video Background ── */}
      <video
        className="hero-video-bg"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Dark overlay to preserve text readability */}
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Split-screen layout */}
      <div className="hero-grid-split">
        
        {/* Left side text overlays */}
        <div className="hero-text-side">
          <div className="hero-tagline">✨ INNOVATION & EDUCATION</div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME TO</span>
            <span className="title-dept">Department of</span>
            <span className="title-bca">BCA</span>
          </h1>
          <p className="hero-subtitle">
            Empowering future software developers, system architects, and tech innovators through advanced, industry-aligned training.
          </p>
          
          <div className="hero-actions">
            <Link 
              to="/compiler" 
              className="btn-premium-purple"
            >
              🚀 Start Coding
            </Link>
            <a 
              href="#about" 
              onClick={(e) => handleScrollDown(e, '#about')}
              className="btn-premium"
            >
              Explore Department
            </a>
          </div>
        </div>

        {/* Right side static laptop image wrapper with premium floating & glowing effects */}
        <div className="hero-image-side">
          <div 
            className="hero-image-wrapper"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(0, -6px, 15px)`,
              transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease'
            }}
          >
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

      {/* Premium animated scroll indicator */}
      <div className="hero-scroll-indicator" onClick={(e) => handleScrollDown(e, '#about')}>
        <span className="scroll-arrow">↓</span>
        <span className="scroll-text">Explore More</span>
      </div>
    </section>
  );
};

export default HeroWow;
