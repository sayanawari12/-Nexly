import React from 'react';
import CinematicHero from '../components/CinematicHero';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import WhyChoose from '../components/sections/WhyChoose';
import Roadmap from '../components/sections/Roadmap';
import Technologies from '../components/sections/Technologies';
import Faculty from '../components/sections/Faculty';
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
  return (
    <div className="home-wrapper">
      {/* 1. Cinematic Hero Section */}
      <CinematicHero />
      
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
      
      {/* 7. Faculty Mentors */}
      <Faculty />
      
      {/* 8. Specialized Labs */}
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
