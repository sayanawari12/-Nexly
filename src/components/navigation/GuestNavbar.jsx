import React from 'react';
import { Search } from 'lucide-react';

const GuestNavbar = ({ 
  navItems, 
  handleNavClick, 
  handleLogoClick, 
  searchOpen, 
  setSearchOpen, 
  searchQuery, 
  setSearchQuery, 
  setSearchModalOpen,
  navigate,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
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
          onClick={() => setSearchModalOpen ? setSearchModalOpen(true) : setSearchOpen(!searchOpen)}
          aria-label="Search learning database (Ctrl+K)"
          title="Search (Ctrl+K)"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Auth CTA */}
      <a 
        href="/login" 
        onClick={(e) => { e.preventDefault(); navigate('/login'); }}
        className="btn-premium btn-nav-cta"
        style={{ marginRight: '8px' }}
      >
        Sign In
      </a>

      {/* Start Learning CTA */}
      <a 
        href="/technologies/cpp" 
        onClick={(e) => { e.preventDefault(); navigate('/technologies/cpp'); }}
        className="btn-premium-purple btn-nav-cta"
      >
        Start Learning
      </a>
    </div>
  );
};

export default GuestNavbar;
