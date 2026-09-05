import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroWow from '../components/HeroWow';

// Below-the-fold sections loaded lazily as the user scrolls / after hero renders.
// HeroBackup is kept as a synchronous import only when needed (flag is false here).
const About       = lazy(() => import('../components/sections/About'));
const Technologies = lazy(() => import('../components/sections/Technologies'));
const Placement   = lazy(() => import('../components/sections/Placement'));
const Contact     = lazy(() => import('../components/sections/Contact'));
const Footer      = lazy(() => import('../components/sections/Footer'));

// Minimal inline fallback — avoids importing PageLoader into the home chunk
const SectionFallback = () => (
  <div style={{ minHeight: '200px', background: 'transparent' }} aria-hidden="true" />
);

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const el = document.getElementById(location.state.scrollToSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location]);

  return (
    <div className="home-wrapper">
      {/* 1. Hero — eagerly rendered (LCP element) */}
      <HeroWow />

      {/* All sections below are lazy-loaded; each has its own Suspense boundary
          so they degrade gracefully and don't block each other */}
      <Suspense fallback={<SectionFallback />}>
        {/* 2. About */}
        <About />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        {/* 3. Technologies Stack */}
        <Technologies />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        {/* 6. Placements Launchpad */}
        <Placement />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        {/* 9. Contact Gateway */}
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        {/* 10. Luxury Footer */}
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
