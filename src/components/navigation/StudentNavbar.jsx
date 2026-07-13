import React, { useRef, useEffect } from 'react';
import { 
  Search, Bell, ChevronDown, Award, BookOpen, 
  CheckCircle, Flame, LayoutDashboard, User, Bookmark, 
  Download, Settings, HelpCircle, LogOut 
} from 'lucide-react';

const StudentNavbar = ({
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
            <Bell size={20} className="bell-ring-active" />
            <span className="nav-badge">3</span>
          </button>

          {notifDropdownOpen && (
            <div className="nav-notif-dropdown">
              <div className="nav-notif-header">Notifications</div>
              <div className="nav-notif-list">
                <div className="nav-notif-item">
                  <Award className="nav-notif-item-icon" size={16} />
                  <div className="nav-notif-item-text">
                    🏆 New Achievement Unlocked
                    <span>2 mins ago</span>
                  </div>
                </div>
                <div className="nav-notif-item">
                  <BookOpen className="nav-notif-item-icon" size={16} />
                  <div className="nav-notif-item-text">
                    📚 Continue C Programming
                    <span>1 hour ago</span>
                  </div>
                </div>
                <div className="nav-notif-item">
                  <CheckCircle className="nav-notif-item-icon" size={16} />
                  <div className="nav-notif-item-text">
                    ✅ Quiz Result Available
                    <span>5 hours ago</span>
                  </div>
                </div>
                <div className="nav-notif-item">
                  <Flame className="nav-notif-item-icon" size={16} />
                  <div className="nav-notif-item-text">
                    🔥 Daily Challenge Ready
                    <span>1 day ago</span>
                  </div>
                </div>
              </div>
              <span className="nav-notif-footer">See All Notifications →</span>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div 
            className="nav-profile-trigger"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="nav-avatar">
              {getInitials(user.displayName)}
            </div>
            <span className="nav-profile-name">Hi, {user.displayName ? user.displayName.split(' ')[0] : 'Student'}</span>
            <ChevronDown size={14} className="nav-chevron" />
          </div>

          {profileDropdownOpen && (
            <div className="nav-profile-dropdown">
              <div className="nav-profile-dropdown-header">
                <div className="dropdown-avatar">
                  {getInitials(user.displayName)}
                </div>
                <h4 className="dropdown-name">{user.displayName || 'Student'}</h4>
                <span className="dropdown-username">{getUsername(user)}</span>
                <span className="dropdown-joined">Joined July 2026</span>
              </div>

              <div className="nav-profile-dropdown-list">
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/dashboard'); setProfileDropdownOpen(false); }}>
                  <LayoutDashboard size={14} /> Dashboard
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <User size={14} /> My Profile
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/technologies/c'); setProfileDropdownOpen(false); }}>
                  <BookOpen size={14} /> Continue Learning
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <Bookmark size={14} /> Bookmarks
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <Award size={14} /> Certificates
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <Download size={14} /> Downloads
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <Settings size={14} /> Settings
                </div>
                <div className="nav-profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>
                  <HelpCircle size={14} /> Help & Support
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

export default StudentNavbar;
