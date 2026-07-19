import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Code2, ArrowLeft, Search, FileCode, BookOpen, 
  Code2 as CodeIcon, CheckCircle, Download, LayoutDashboard 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import GuestNavbar from './navigation/GuestNavbar';
import StudentNavbar from './navigation/StudentNavbar';
import AuthNavbar from './navigation/AuthNavbar';
import SearchModal from './navigation/SearchModal';
import '../styles/Navbar.css';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const getUsername = (userObj) => {
  if (userObj.username) return `@${userObj.username}`;
  if (userObj.displayName) {
    return `@${userObj.displayName.toLowerCase().replace(/\s+/g, '')}12`;
  }
  return `@student_${userObj.uid.slice(0, 5)}`;
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, logout, profile } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdowns/modal open states
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search modal on Escape key press, open on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = user ? [
    { label: 'Dashboard', href: '/dashboard', isRoute: true },
    { label: 'Roadmap', href: '/roadmap', isRoute: true },
    { label: 'Practice', href: '/practice', isRoute: true },
    { label: '🏆 Contests', href: '/contests', isRoute: true },
    { label: '💻 Coding Workspace', href: '/compiler', isRoute: true },
    { label: 'Analytics', href: '/analytics', isRoute: true }
  ] : [
    { label: 'About', href: '#about' },
    { label: 'Curriculum', href: '#roadmap' },
    { label: 'Labs', href: '#labs' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resources', href: '#resources' },
  ];

  const searchItems = [
    { title: "Introduction to C", category: "Roadmaps", type: "roadmap" },
    { title: "Setup & Environment", category: "Roadmaps", type: "roadmap" },
    { title: "Lecture 1: History of C", category: "Lessons", type: "lesson" },
    { title: "Lecture 2: C Compilation", category: "Lessons", type: "lesson" },
    { title: "Hello World in C", category: "Programs", type: "program" },
    { title: "Array Traversal", category: "Programs", type: "program" },
    { title: "Loops Challenge Quiz", category: "Quizzes", type: "quiz" },
    { title: "Syllabus Semester 2 PDF", category: "Downloads", type: "download" },
    { title: "Tic Tac Toe Console Game", category: "Projects", type: "project" }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    const href = item.href;
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

  const filteredSearch = searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Common Props for Child Navbars
  const commonNavbarProps = {
    user,
    profile,
    logout,
    navigate,
    getInitials,
    getUsername,
    notifDropdownOpen,
    setNotifDropdownOpen,
    profileDropdownOpen,
    setProfileDropdownOpen,
    setSearchModalOpen,
    setSearchQuery,
    navItems,
    handleNavClick,
    searchOpen,
    setSearchOpen,
    searchQuery,
    mobileMenuOpen,
    setMobileMenuOpen
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={handleLogoClick}>
          <Code2 className="logo-icon" size={24} />
          <span>BCA <span className="logo-dept">DEPT</span></span>
        </div>

        {/* Desktop Menu - Common Nav Links */}
        {!isLoginPage && (
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Dynamic Navigation Delegated based on Role state */}
        {isLoginPage ? (
          <div className="nav-right">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="btn-premium"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '10px 18px', borderRadius: '8px' }}
            >
              <ArrowLeft size={14} /> Back to Home
            </a>
          </div>
        ) : user ? (
          <AuthNavbar {...commonNavbarProps} />
        ) : (
          <GuestNavbar {...commonNavbarProps} />
        )}

        {/* Mobile Hamburguer for Authenticated Users */}
        {!isLoginPage && user && (
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'none' }} /* Hidden via media query, activated on small screens */
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {!isLoginPage && (
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-links">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="mobile-link"
              >
                {item.label}
              </a>
            ))}
            
            {user ? (
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="btn-premium"
                style={{ marginTop: '20px', width: '80%', justifyContent: 'center', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            ) : (
              <a 
                href="/login" 
                onClick={(e) => { e.preventDefault(); navigate('/login'); setMobileMenuOpen(false); }}
                className="btn-premium"
                style={{ marginTop: '20px', width: '80%', justifyContent: 'center' }}
              >
                Sign In
              </a>
            )}

            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-premium-purple"
              style={{ marginTop: '12px', width: '80%', justifyContent: 'center' }}
            >
              Explore Dept
            </a>
          </div>
        </div>
      )}

      {/* Premium Spotlight Global Search Modal Overlay */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default Navbar;
