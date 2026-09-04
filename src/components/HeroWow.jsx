import React, { useState } from 'react';
import { Play, LayoutDashboard, Flame } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import LiveCodeEditor from './LiveCodeEditor';
import '../styles/HeroWow.css';

const HeroWow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, resumeLearning } = useProgress();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const streakCount = profileData?.learningStats?.currentStreak || profileData?.streak || 0;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate tilt offset angles
    const x = (clientX / innerWidth - 0.5) * 12;
    const y = (clientY / innerHeight - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
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

      {/* Cinematic Video Background */}
      <video
        className="hero-video-bg"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Split-screen layout */}
      <div className="hero-grid-split">
        
        {/* Left side text overlays */}
        <div className="hero-text-side">
          <div className="hero-tagline user-welcome-tag">
            <span>✦ READY TO BUILD</span>
            {user && streakCount > 0 && (
              <span className="hero-streak-pill">
                <Flame size={12} fill="#ef4444" color="#ef4444" /> {streakCount}d Streak
              </span>
            )}
          </div>
          <h1 className="hero-title">
            <span className="title-welcome">READY TO MASTER</span>
            <span className="title-dept">Next-Gen Tech</span>
            <span className="title-bca">Skills</span>
          </h1>
          <p className="hero-subtitle">
            Master programming, explore modern technologies, practice real problems, and build skills that move you forward.
          </p>
          
          <div className="hero-actions">
            {user ? (
              <>
                <button 
                  onClick={() => resumeLearning ? resumeLearning(navigate) : navigate('/dashboard')}
                  className="btn-premium-purple"
                >
                  <Play size={16} fill="currentColor" /> Continue Learning
                </button>
                <Link 
                  to="/dashboard"
                  className="btn-premium"
                >
                  <LayoutDashboard size={16} /> Open Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/roadmap" 
                  className="btn-premium-purple"
                >
                  🚀 Start Learning
                </Link>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollDown(e, '#about')}
                  className="btn-premium"
                >
                  Explore Platform
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right side — Premium Live Code Editor */}
        <div className="hero-image-side">
          <div
            className="hero-image-wrapper"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.y * 0.6}deg) rotateY(${tilt.x * 0.6}deg) translate3d(0, -4px, 10px)`,
              transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <LiveCodeEditor />
          </div>
        </div>

      </div>

      {/* Animated scroll indicator */}
      <div className="hero-scroll-indicator" onClick={(e) => handleScrollDown(e, '#about')}>
        <span className="scroll-arrow">↓</span>
        <span className="scroll-text">Explore More</span>
      </div>
    </section>
  );
};

export default HeroWow;
