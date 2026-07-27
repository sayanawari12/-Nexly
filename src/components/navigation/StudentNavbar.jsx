import React, { useRef, useEffect } from 'react';
import { 
  Search, Bell, ChevronDown, Award, BookOpen, 
  CheckCircle, Flame, LayoutDashboard, User, Bookmark, 
  Download, Settings, HelpCircle, LogOut 
} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

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
            <div className="nav-avatar">
              {getInitials(user?.displayName)}
            </div>
            <span className="nav-profile-name">Hi, {user?.displayName ? user.displayName.split(' ')[0] : 'Student'}</span>
            <ChevronDown size={14} className="nav-chevron" />
          </div>

          <ProfileDropdown
            isOpen={profileDropdownOpen}
            onClose={() => setProfileDropdownOpen(false)}
            user={user}
            logout={logout}
            isAdmin={false}
            getInitials={getInitials}
            getUsername={getUsername}
            triggerRef={profileRef}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;
