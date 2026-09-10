import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroWow from '../components/HeroWow';

// Below-the-fold sections loaded lazily as the user scrolls / after hero renders.
const LiveCodeSnippet = lazy(() => import('../components/sections/LiveCodeSnippet'));
const Technologies    = lazy(() => import('../components/sections/Technologies'));
const HowItWorksLoop  = lazy(() => import('../components/sections/HowItWorksLoop'));
const FounderNoteCTA  = lazy(() => import('../components/sections/FounderNoteCTA'));
const Footer          = lazy(() => import('../components/sections/Footer'));

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

      {/* 2. Live Runnable Code Snippet (5-second trial) */}
      <Suspense fallback={<SectionFallback />}>
        <LiveCodeSnippet />
      </Suspense>

      {/* 3. Core Technology Cards */}
      <Suspense fallback={<SectionFallback />}>
        <Technologies />
      </Suspense>

      {/* 4. How NEXLY Works Loop (Learn -> Practice -> Build) */}
      <Suspense fallback={<SectionFallback />}>
        <HowItWorksLoop />
      </Suspense>

      {/* 5. Founder Note & Closing CTA */}
      <Suspense fallback={<SectionFallback />}>
        <FounderNoteCTA />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
