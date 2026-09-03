import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Code2, ArrowLeft, Search, BookOpen, 
  LayoutDashboard, Map, Info, User, LogOut, LogIn, ChevronDown, Settings, BarChart3
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
  if (!userObj) return '@student';
  if (userObj.username) return `@${userObj.username}`;
  if (userObj.displayName) {
    return `@${userObj.displayName.toLowerCase().replace(/\s+/g, '')}12`;
  }
  if (userObj.uid) return `@student_${userObj.uid.slice(0, 5)}`;
  return '@student';
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

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: ESC key closes search modal & left drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
        setNotifDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when left drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Memoized static nav items array — never recreated
  const navItems = useMemo(() => [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Dashboard', href: '/dashboard', isRoute: true },
    { label: 'Roadmap', href: '/roadmap', isRoute: true },
    { label: 'Resources', href: '#resources', isRoute: false },
    { label: 'About', href: '#about', isRoute: false }
  ], []);

  const handleNavClick = useCallback((e, item) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    
    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    const href = typeof item === 'string' ? item : item.href;
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
  }, [location.pathname, navigate]);

  const handleLogoClick = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  // Memoize the props object passed to sub-navbars to prevent their re-render
  const commonNavbarProps = useMemo(() => ({
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
    setMobileMenuOpen,
    userRole
  }), [
    user, profile, logout, navigate,
    notifDropdownOpen, profileDropdownOpen,
    navItems, handleNavClick,
    searchOpen, searchQuery,
    mobileMenuOpen, userRole
  ]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          {/* Hamburger Menu Button for Mobile & Tablet */}
          {!isLoginPage && (
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}

          {/* Brand Logo */}
          <div className="nav-logo" onClick={handleLogoClick}>
            <span className="brand-mark">✦</span>
            <span className="brand-name">NEXLY</span>
          </div>
        </div>

        {/* Desktop Navigation Links (≥1024px) */}
        {!isLoginPage && (
          <div className="nav-links">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); setActiveMegaMenu(null); }}
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </a>
            <a
              href="/dashboard"
              onClick={(e) => { e.preventDefault(); navigate('/dashboard'); setActiveMegaMenu(null); }}
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </a>
            <a
              href="/roadmap"
              onClick={(e) => { e.preventDefault(); navigate('/roadmap'); setActiveMegaMenu(null); }}
              className={`nav-link ${location.pathname === '/roadmap' ? 'active' : ''}`}
            >
              Roadmap
            </a>
            <a
              href="#resources"
              onClick={(e) => {
                e.preventDefault();
                setActiveMegaMenu(null);
                handleNavClick(e, { label: 'Resources', href: '#resources', isRoute: false });
              }}
              className={`nav-link ${location.hash === '#resources' ? 'active' : ''}`}
            >
              Resources
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setActiveMegaMenu(null);
                handleNavClick(e, { label: 'About', href: '#about', isRoute: false });
              }}
              className={`nav-link ${location.hash === '#about' ? 'active' : ''}`}
            >
              About
            </a>
          </div>
        )}

        {/* Dynamic Controls based on Auth state */}
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
      </nav>

      {/* Slide-out Left Drawer & Backdrop */}
      {!isLoginPage && (
        <>
          <div 
            className={`nav-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <aside 
            className={`nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
            aria-label="Navigation drawer"
            role="dialog"
            aria-modal="true"
          >
            <div className="drawer-header">
              <div className="nav-logo" onClick={() => { handleLogoClick(); setMobileMenuOpen(false); }}>
                <span className="brand-mark">✦</span>
                <span className="brand-name">NEXLY</span>
              </div>
              <button 
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-content">
              {user && (
                <div className="drawer-user-header">
                  <div className="drawer-user-avatar" style={userRole === 'admin' ? { background: 'linear-gradient(135deg, #ef4444, #f87171)' } : {}}>
                    {getInitials(profile?.displayName || user?.displayName || (userRole === 'admin' ? 'Admin' : 'Student'))}
                  </div>
                  <div className="drawer-user-info">
                    <div className="drawer-user-name">
                      {profile?.displayName || user?.displayName || (userRole === 'admin' ? 'Admin User' : 'Student')}
                    </div>
                    <div className="drawer-user-email">
                      {profile?.username ? `@${profile.username}` : getUsername(user)}
                    </div>
                  </div>
                </div>
              )}

              <div className="drawer-nav-list">
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); navigate('/'); setMobileMenuOpen(false); }}
                  className={`drawer-nav-item ${location.pathname === '/' ? 'active' : ''}`}
                >
                  <Code2 size={18} className="drawer-item-icon" />
                  <span>Home</span>
                </a>
                <a
                  href="/dashboard"
                  onClick={(e) => { e.preventDefault(); navigate('/dashboard'); setMobileMenuOpen(false); }}
                  className={`drawer-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <LayoutDashboard size={18} className="drawer-item-icon" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="/roadmap"
                  onClick={(e) => { e.preventDefault(); navigate('/roadmap'); setMobileMenuOpen(false); }}
                  className={`drawer-nav-item ${location.pathname === '/roadmap' ? 'active' : ''}`}
                >
                  <Map size={18} className="drawer-item-icon" />
                  <span>Roadmap</span>
                </a>
                <a
                  href="#resources"
                  onClick={(e) => {
                    handleNavClick(e, { label: 'Resources', href: '#resources', isRoute: false });
                    setMobileMenuOpen(false);
                  }}
                  className={`drawer-nav-item ${location.hash === '#resources' ? 'active' : ''}`}
                >
                  <BookOpen size={18} className="drawer-item-icon" />
                  <span>Resources</span>
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    handleNavClick(e, { label: 'About', href: '#about', isRoute: false });
                    setMobileMenuOpen(false);
                  }}
                  className={`drawer-nav-item ${location.hash === '#about' ? 'active' : ''}`}
                >
                  <Info size={18} className="drawer-item-icon" />
                  <span>About</span>
                </a>
              </div>

              <div className="drawer-footer">
                {user ? (
                  <>
                    <button 
                      className="drawer-action-btn"
                      onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                    >
                      <User size={18} className="drawer-item-icon" />
                      <span>Profile</span>
                    </button>
                    <button 
                      className="drawer-action-btn"
                      onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                    >
                      <Settings size={18} className="drawer-item-icon" />
                      <span>Account Settings</span>
                    </button>
                    <button 
                      className="drawer-action-btn"
                      onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                    >
                      <BarChart3 size={18} className="drawer-item-icon" />
                      <span>My Progress</span>
                    </button>
                    <button 
                      className="drawer-action-btn logout-btn"
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut size={18} className="drawer-item-icon" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button 
                    className="drawer-action-btn login-btn"
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  >
                    <LogIn size={18} className="drawer-item-icon" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Global Search Modal Overlay */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default memo(Navbar);
