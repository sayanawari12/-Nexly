import React, { useState } from 'react';
import { Play, LayoutDashboard, Flame } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import HeroLaptop3D from './ui/HeroLaptop3D';
import '../styles/HeroWow.css';

const HeroWow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, resumeLearning } = useProgress();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const userName = profileData?.displayName || user?.displayName || (user?.email ? user.email.split('@')[0] : '');
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

      {/* Cinematic Video Background
          preload="none"  → browser won't download video bytes until playback starts.
          This prevents the 12 MB video from blocking first load.
          A CSS-animated gradient poster is shown while the video waits. */}
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
          {user ? (
            <>
              <div className="hero-tagline user-welcome-tag">
                <span>✨ WELCOME BACK, {userName.toUpperCase()}</span>
                {streakCount > 0 && (
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
                Welcome back to your BCA learning ecosystem. Continue your study track or access your workspace metrics directly from here.
              </p>
              
              <div className="hero-actions">
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
              </div>
            </>
          ) : (
            <>
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
                  Explore Department
                </a>
              </div>
            </>
          )}
        </div>

        {/* Right side Premium 3D Laptop Hero (R3F + Drei) */}
        <div className="hero-image-side">
          <HeroLaptop3D />
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
