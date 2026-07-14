/**
 * HeroWow.jsx
 * Active hero component (USE_WOW_HERO = true in Home.js).
 *
 * Layout: split-screen
 *   Left  — text content (title, subtitle, CTA buttons) — unchanged
 *   Right — HeroScene (3D WebGL laptop) replaces the static img
 *
 * Mouse tracking for parallax is handled inside HeroScene itself.
 */
import React from 'react';
import { Play } from 'lucide-react';
import '../styles/HeroWow.css';
import HeroScene from './hero3d/HeroScene';

const HeroWow = () => {
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
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Split-screen layout */}
      <div className="hero-grid-split">

        {/* Left: text content — untouched */}
        <div className="hero-text-side">
          <div className="hero-tagline">✨ INNOVATION &amp; EDUCATION</div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME TO</span>
            <span className="title-dept">Department of</span>
            <span className="title-bca">BCA</span>
          </h1>
          <p className="hero-subtitle">
            Empowering future software developers, system architects, and tech innovators
            through advanced, industry-aligned training.
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

        {/* Right: 3D WebGL laptop — replaces static img */}
        <div className="hero-image-side">
          <HeroScene />
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
