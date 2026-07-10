import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Code2 } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Curriculum', href: '#roadmap' },
    { label: 'Labs', href: '#labs' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resources', href: '#resources' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // If not on the homepage, route to home first and then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={handleLogoClick}>
        <Code2 className="logo-icon" size={24} />
        <span>BCA <span className="logo-dept">DEPT</span></span>
      </div>

      {/* Desktop Menu */}
      <div className="nav-links">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="nav-link"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="nav-right">
        {/* Search Bar */}
        <div className={`search-container ${searchOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search notes, codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Contact CTA */}
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')}
          className="btn-premium-purple btn-nav-cta"
        >
          Explore Dept
        </a>

        {/* Mobile Hamburguer */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="mobile-link"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-premium-purple"
            style={{ marginTop: '20px', width: '80%', justifyContent: 'center' }}
          >
            Explore Dept
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
