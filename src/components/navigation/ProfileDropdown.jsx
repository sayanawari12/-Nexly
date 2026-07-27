import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Map, User, Bookmark, Award, Download, 
  Settings, HelpCircle, LogOut, Flame, Sparkles, ChevronRight, 
  BookOpen, ShieldCheck, Zap
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import '../../styles/Navbar.css';

const ProfileDropdown = ({
  isOpen,
  onClose,
  user,
  profile,
  logout,
  isAdmin = false,
  getInitials,
  getUsername,
  triggerRef
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const itemsRef = useRef([]);

  // Safely grab progress context if available
  let overallProgress = 68;
  let completedCount = 12;
  try {
    const progressCtx = useProgress();
    if (progressCtx) {
      if (typeof progressCtx.overallProgress === 'number') {
        overallProgress = Math.min(100, Math.max(0, Math.round(progressCtx.overallProgress)));
      }
      if (Array.isArray(progressCtx.completedLessons)) {
        completedCount = progressCtx.completedLessons.length;
      }
    }
  } catch (e) {
    // Fallback defaults if context is omitted
  }

  const displayName = profile?.displayName || user?.displayName || (isAdmin ? 'Admin User' : 'BCA Student');
  const username = profile?.username ? `@${profile.username}` : (getUsername ? getUsername(user) : '@student');

  // Handle Click Outside & Keyboard Navigation (ESC / Arrow keys)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef?.current && 
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const focusableItems = itemsRef.current.filter(Boolean);
        if (focusableItems.length === 0) return;

        const currentIndex = focusableItems.indexOf(document.activeElement);
        let nextIndex = 0;

        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'ArrowUp') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1;
        }

        focusableItems[nextIndex]?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleItemClick = (path) => {
    onClose();
    if (path) {
      navigate(path);
    }
  };

  const handleSignOut = () => {
    onClose();
    if (logout) {
      logout();
    }
  };

  const menuGroups = [
    {
      title: 'LEARNING HUB',
      items: [
        { label: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/dashboard', badge: 'Overview' },
        { label: 'Continue Learning', icon: <BookOpen size={16} />, path: '/technologies/c', badge: 'C Hub' },
        { label: 'Learning Roadmap', icon: <Map size={16} />, path: '/roadmap' }
      ]
    },
    {
      title: 'MY WORKSPACE',
      items: [
        { label: 'My Profile', icon: <User size={16} />, path: '/profile' },
        { label: 'Bookmarks', icon: <Bookmark size={16} />, path: '/profile' },
        { label: 'Certificates', icon: <Award size={16} />, path: '/profile' },
        { label: 'Downloads', icon: <Download size={16} />, path: '/profile' }
      ]
    },
    {
      title: 'PREFERENCES',
      items: [
        { label: 'Settings', icon: <Settings size={16} />, path: '/profile' },
        { label: 'Help & Support', icon: <HelpCircle size={16} />, path: '/profile' }
      ]
    }
  ];

  let itemIndexTracker = 0;

  return (
    <div 
      className="nav-profile-dropdown open-animated" 
      ref={dropdownRef}
      role="menu"
      aria-label="User profile and dashboard menu"
      tabIndex={-1}
    >
      {/* ─── MINI DASHBOARD HEADER ─── */}
      <div className="mini-dashboard-header">
        <div className="header-top-row">
          <div className="avatar-wrapper">
            <div 
              className="header-avatar"
              style={isAdmin ? { background: 'linear-gradient(135deg, #ef4444, #f87171)' } : {}}
            >
              {getInitials ? getInitials(displayName) : displayName.slice(0, 2).toUpperCase()}
            </div>
            <span className="online-indicator" title="Active Session" />
          </div>

          <div className="header-user-info">
            <div className="user-name-row">
              <h4 className="user-name">{displayName}</h4>
              {isAdmin ? (
                <span className="role-badge admin-badge"><ShieldCheck size={11} /> Admin</span>
              ) : (
                <span className="role-badge student-badge"><Sparkles size={11} /> BCA '26</span>
              )}
            </div>
            <span className="user-handle" style={isAdmin ? { color: '#f87171' } : {}}>
              {username}
            </span>
          </div>
        </div>

        {/* ─── LEARNING METRICS STRIP ─── */}
        {!isAdmin && (
          <div className="header-metrics-card">
            <div className="metrics-top">
              <span className="streak-badge">
                <Flame size={13} className="streak-fire" />
                <span className="streak-text">5 Day Streak</span>
              </span>
              <span className="progress-value">{overallProgress}% Done</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="metrics-bottom">
              <span>Semester 4</span>
              <span>{completedCount} Lessons Solved</span>
            </div>
          </div>
        )}
      </div>

      <div className="dropdown-divider" />

      {/* ─── CATEGORIZED MENU LIST ─── */}
      <div className="mini-dashboard-body">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="menu-group">
            <div className="group-title">{group.title}</div>
            <div className="group-items">
              {group.items.map((item, iIdx) => {
                const currentRefIndex = itemIndexTracker++;
                return (
                  <button
                    key={iIdx}
                    ref={(el) => (itemsRef.current[currentRefIndex] = el)}
                    className="menu-item-btn"
                    onClick={() => handleItemClick(item.path)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <span className="item-left">
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-label">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="item-badge">{item.badge}</span>
                    ) : (
                      <ChevronRight size={14} className="item-chevron" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="dropdown-divider" />

      {/* ─── DANGER ZONE FOOTER ─── */}
      <div className="mini-dashboard-footer">
        <button
          ref={(el) => (itemsRef.current[itemIndexTracker] = el)}
          className="signout-btn"
          onClick={handleSignOut}
          role="menuitem"
          tabIndex={0}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
