import React, { useRef, useEffect } from 'react';
import { 
  Search, Bell, ChevronDown, Award, BookOpen, 
  CheckCircle, Flame, LayoutDashboard, User, Bookmark, 
  Download, Settings, HelpCircle, LogOut, FileCode, CheckSquare, BarChart3
} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const AuthNavbar = ({
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
  userRole
}) => {
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setNotifDropdownOpen, setProfileDropdownOpen]);

  const isAdmin = userRole === 'admin';

  const studentItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={14} />, path: '/dashboard' },
    { label: 'Learning Roadmap', icon: <BarChart3 size={14} />, path: '/roadmap' },
    { label: 'My Profile', icon: <User size={14} />, path: '/profile' },
    { label: 'Continue Learning', icon: <BookOpen size={14} />, path: '/technologies/c' },
    { label: 'Bookmarks', icon: <Bookmark size={14} />, path: '/profile' },
    { label: 'Certificates', icon: <Award size={14} />, path: '/profile' },
    { label: 'Downloads', icon: <Download size={14} />, path: '/profile' },
    { label: 'Settings', icon: <Settings size={14} />, path: '/profile' },
    { label: 'Help & Support', icon: <HelpCircle size={14} />, path: '/profile' }
  ];

  const adminItems = [
    { label: 'Admin Dashboard', icon: <LayoutDashboard size={14} />, path: '/dashboard' },
    { label: 'Manage Students', icon: <User size={14} />, path: '/dashboard' },
    { label: 'Manage Roadmaps', icon: <FileCode size={14} />, path: '/dashboard' },
    { label: 'Manage Lessons', icon: <BookOpen size={14} />, path: '/dashboard' },
    { label: 'Manage Programs', icon: <Bookmark size={14} />, path: '/dashboard' },
    { label: 'Manage Quizzes', icon: <CheckSquare size={14} />, path: '/dashboard' },
    { label: 'Certificates', icon: <Award size={14} />, path: '/profile' },
    { label: 'Settings', icon: <Settings size={14} />, path: '/profile' }
  ];

  const menuItems = isAdmin ? adminItems : studentItems;

  return (
    <div className="nav-right">
      <div className="nav-auth-group">
        {isAdmin && (
          <span className="logo-dept" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
            ADMIN
          </span>
        )}

        {/* Search Icon */}
        <button 
          className="nav-icon-btn"
          onClick={() => { setSearchQuery(''); setSearchModalOpen(true); }}
          aria-label="Search learning database"
        >
          <Search size={20} />
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button 
            className="nav-icon-btn"
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {notifDropdownOpen && (
            <div className="nav-notif-dropdown">
              <div className="nav-notif-header">Notifications</div>
              <div className="nav-notif-list">
                <div className="nav-notif-empty">No new notifications</div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown Trigger & Floating Panel */}
        <div style={{ position: 'relative' }} ref={profileRef} className="nav-profile-wrapper">
          <div 
            className="nav-profile-trigger"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            aria-expanded={profileDropdownOpen}
            aria-haspopup="true"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setProfileDropdownOpen(!profileDropdownOpen);
              }
            }}
          >
            <div className="nav-avatar" style={isAdmin ? { background: 'linear-gradient(135deg, #ef4444, #f87171)' } : {}}>
              {getInitials(profile?.displayName || user?.displayName || (isAdmin ? 'Admin' : 'Student'))}
            </div>
            <span className="nav-profile-name" style={isAdmin ? { color: '#f87171' } : {}}>
              Hi, {(profile?.displayName || user?.displayName || (isAdmin ? 'Admin' : 'Student')).split(' ')[0]}
            </span>
            <ChevronDown size={14} className="nav-chevron" />
          </div>

          <ProfileDropdown
            isOpen={profileDropdownOpen}
            onClose={() => setProfileDropdownOpen(false)}
            user={user}
            profile={profile}
            logout={logout}
            isAdmin={isAdmin}
            getInitials={getInitials}
            getUsername={getUsername}
            triggerRef={profileRef}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
