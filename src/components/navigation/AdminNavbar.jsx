import React, { useRef, useEffect } from 'react';
import { 
  Search, Bell, ChevronDown, Award, BookOpen, 
  CheckCircle, LayoutDashboard, User, Settings, 
  HelpCircle, LogOut, Users, FileCode, CheckSquare, BarChart3 
} from 'lucide-react';

const AdminNavbar = ({
  user,
  logout,
  navigate,
  getInitials,
  getUsername,
  notifDropdownOpen,
  setNotifDropdownOpen,
  profileDropdownOpen,
  setProfileDropdownOpen,
  setSearchModalOpen,
  setSearchQuery
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

  return (
    <div className="nav-right">
      <div className="nav-auth-group">
        {/* Admin Branding badge */}
        <span className="logo-dept" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
          ADMIN PORTAL
        </span>

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

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div 
            className="nav-profile-trigger"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="nav-avatar" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
              {getInitials(user.displayName)}
            </div>
            <span className="nav-profile-name" style={{ color: '#f87171' }}>Hi, {user.displayName ? user.displayName.split(' ')[0] : 'Admin'}</span>
            <ChevronDown size={14} className="nav-chevron" />
          </div>

          {profileDropdownOpen && (
            <div className="nav-profile-dropdown">
              <div className="nav-profile-dropdown-header">
                <div className="dropdown-avatar" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                  {getInitials(user.displayName)}
                </div>
                <h4 className="dropdown-name">{user.displayName || 'Administrator'}</h4>
                <span className="dropdown-username" style={{ color: '#f87171' }}>{getUsername(user)}</span>
                <span className="dropdown-joined">Admin Joined July 2026</span>
              </div>

              <div className="nav-profile-dropdown-list">
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <LayoutDashboard size={14} /> Admin Dashboard
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <Users size={14} /> Manage Students
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <FileCode size={14} /> Manage Roadmaps
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <BookOpen size={14} /> Manage Lessons
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <Bookmark size={14} /> Manage Programs
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <CheckSquare size={14} /> Manage Quizzes
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <Award size={14} /> Certificates
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <BarChart3 size={14} /> Analytics
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/'); setProfileDropdownOpen(false); }}>
                  <Settings size={14} /> Settings
                </div>
              </div>

              <div className="nav-profile-dropdown-signout" onClick={() => { logout(); setProfileDropdownOpen(false); }}>
                <LogOut size={14} /> Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
