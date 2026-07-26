import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroBackup from '../components/HeroBackup';
import HeroWow from '../components/HeroWow';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import WhyChoose from '../components/sections/WhyChoose';
import Roadmap from '../components/sections/Roadmap';
import Technologies from '../components/sections/Technologies';
import Labs from '../components/sections/Labs';
import Projects from '../components/sections/Projects';
import Placement from '../components/sections/Placement';
import Gallery from '../components/sections/Gallery';
import Resources from '../components/sections/Resources';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

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

  const USE_WOW_HERO = true;

  return (
    <div className="home-wrapper">
      {/* 1. Cinematic Hero Section */}
      {USE_WOW_HERO ? <HeroWow /> : <HeroBackup />}
      
      {/* 2. About Department */}
      <About />
      
      {/* 3. Stats Section */}
      <Stats />
      
      {/* 4. Why Choose BCA */}
      <WhyChoose />
      
      {/* 5. Semester Roadmap */}
      <Roadmap />
      
      {/* 6. Technologies Stack */}
      <Technologies />
      
      {/* 7. Specialized Labs */}
      <Labs />
      
      {/* 9. Student Projects */}
      <Projects />
      
      {/* 10. Placements Launchpad */}
      <Placement />
      
      {/* 11. Campus Gallery */}
      <Gallery />
      
      {/* 12. Resources Portal */}
      <Resources />
      
      {/* 13. Testimonials */}
      <Testimonials />
      
      {/* 14. FAQ Accordions */}
      <FAQ />
      
      {/* 15. Contact Gateway */}
      <Contact />
      
      {/* 16. Luxury Footer */}
      <Footer />
    </div>
  );
};

export default Home;
