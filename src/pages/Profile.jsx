import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getUserProfile, updateUserProfile, checkUsernameAvailability } from '../services/userDatabase';
import { useProgress } from '../context/ProgressContext';
import { 
  User, School, BookOpen, Calendar, Flame, Target, 
  Award, Clock, CheckCircle, Code, Shield, FileText, 
  Globe, ExternalLink, Camera, Edit2, X, Play, ArrowRight,
  Download, LogOut, Key, Settings, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import '../styles/Profile.css';

const GithubIcon = ({ size = 14 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const { profileData, completedLessons, resumeLearning, loadingProgress: loadingProfile } = useProgress();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Edit form states
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editSemester, setEditSemester] = useState('');
  const [editPhotoURL, setEditPhotoURL] = useState('');
  const [editGithub, setEditGithub] = useState('');
  const [editLinkedin, setEditLinkedin] = useState('');
  const [editResume, setEditResume] = useState('');

  // Sync form inputs when profile data is loaded or changes
  useEffect(() => {
    if (profileData) {
      setEditDisplayName(profileData.displayName || '');
      setEditUsername(profileData.username || '');
      setUsernameError('');
      setEditBio(profileData.bio || '');
      setEditCollege(profileData.college || '');
      setEditCourse(profileData.course || '');
      setEditSemester(profileData.semester || '');
      setEditPhotoURL(profileData.photoURL || '');
      setEditGithub(profileData.githubURL || profileData.socials?.github || '');
      setEditLinkedin(profileData.linkedinURL || profileData.socials?.linkedin || '');
      setEditResume(profileData.resumeURL || profileData.socials?.resume || '');
    }
  }, [profileData]);

  if (loadingProfile) {
    return (
      <div className="profile-page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#a855f7', textShadow: '0 0 10px rgba(168,85,247,0.3)' }}>
          Loading profile...
        </h2>
      </div>
    );
  }

  // Handle Edit Save Changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!user) return;
    setUsernameError('');

    const cleanUsername = editUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUsername) {
      setUsernameError('Username cannot be empty and can only contain letters, numbers, and underscores.');
      return;
    }

    try {
      if (cleanUsername !== (profileData?.username || '').toLowerCase()) {
        const isAvailable = await checkUsernameAvailability(cleanUsername);
        if (!isAvailable) {
          setUsernameError('This username is already taken. Please choose another one.');
          return;
        }
      }

      const updates = {
        displayName: editDisplayName.trim(),
        username: cleanUsername,
        bio: editBio.trim(),
        college: editCollege.trim(),
        course: editCourse.trim(),
        semester: editSemester.trim(),
        photoURL: editPhotoURL.trim(),
        githubURL: editGithub.trim(),
        linkedinURL: editLinkedin.trim(),
        resumeURL: editResume.trim(),
        socials: {
          github: editGithub.trim(),
          linkedin: editLinkedin.trim(),
          resume: editResume.trim()
        }
      };
      await updateUserProfile(user.uid, updates);
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to save profile changes:", err);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, { photoURL: '' });
      setEditPhotoURL('');
    } catch (err) {
      console.error("Failed to remove photo:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const usernameHandle = profileData?.username ? `@${profileData.username}` : `@student_${user?.uid?.slice(0, 5)}`;
  const joinedDate = profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'July 2026';
  const streakCount = profileData?.learningStats?.currentStreak || profileData?.streak || 5;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        
        {/* 1. SECTION: Profile Header */}
        <div className="profile-hero-card">
          <div className="profile-hero-left">
            <div className="profile-avatar-container">
              <div className="profile-large-avatar">
                {profileData?.photoURL ? (
                  <img src={profileData.photoURL} alt="Profile" />
                ) : (
                  getInitials(profileData?.displayName || user?.displayName)
                )}
              </div>
              <div 
                className="profile-avatar-overlay" 
                onClick={() => setEditModalOpen(true)}
                role="button"
                aria-label="Change Profile Picture"
              >
                <Camera size={18} />
              </div>
            </div>

            <div className="profile-identity-info">
              <div className="profile-name-row">
                <h1 className="profile-display-name">{profileData?.displayName || user?.displayName || 'Student'}</h1>
                <span className="profile-username">{usernameHandle}</span>
              </div>

              {profileData?.bio ? (
                <p className="profile-bio">{profileData.bio}</p>
              ) : (
                <p className="profile-bio" style={{ opacity: 0.5, fontStyle: 'italic' }}>
                  BCA Computer Science Scholar • Passionate about full-stack engineering & algorithms.
                </p>
              )}
              
              <div className="profile-details-list">
                <div className="profile-detail-chip">
                  <School size={13} /> {profileData?.college || 'School of Computer Sciences'}
                </div>
                <div className="profile-detail-chip">
                  <BookOpen size={13} /> {profileData?.course || 'Department of BCA'}
                </div>
                <div className="profile-detail-chip">
                  <Target size={13} /> {profileData?.semester || 'Semester 4 • Batch 2024–2027'}
                </div>
                <div className="profile-detail-chip">
                  <Calendar size={13} /> Joined {joinedDate}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-hero-right">
            <div className="profile-streak-badge">
              <Flame size={16} fill="#ef4444" color="#ef4444" />
              <span>{streakCount} Day Streak</span>
            </div>
            
            <button 
              className="btn-premium-purple"
              style={{ minHeight: '48px', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer' }}
              onClick={() => setEditModalOpen(true)}
            >
              <Edit2 size={15} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Social Links Panel */}
        <div className="profile-social-panel">
          <a 
            href={profileData?.githubURL || profileData?.socials?.github || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="profile-social-chip" 
            style={{ opacity: (profileData?.githubURL || profileData?.socials?.github) ? 1 : 0.6 }}
          >
            <GithubIcon size={15} /> GitHub {(profileData?.githubURL || profileData?.socials?.github) && <ExternalLink size={10} />}
          </a>
          <a 
            href={profileData?.linkedinURL || profileData?.socials?.linkedin || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="profile-social-chip" 
            style={{ opacity: (profileData?.linkedinURL || profileData?.socials?.linkedin) ? 1 : 0.6 }}
          >
            <LinkedinIcon size={15} /> LinkedIn {(profileData?.linkedinURL || profileData?.socials?.linkedin) && <ExternalLink size={10} />}
          </a>
          <a 
            href={profileData?.resumeURL || profileData?.socials?.resume || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="profile-social-chip" 
            style={{ opacity: (profileData?.resumeURL || profileData?.socials?.resume) ? 1 : 0.6 }}
          >
            <FileText size={15} /> Resume {(profileData?.resumeURL || profileData?.socials?.resume) && <ExternalLink size={10} />}
          </a>
          <span className="profile-social-chip" style={{ opacity: 0.6 }}>
            <Globe size={15} /> Status: {profileData?.placementStatus || 'Active BCA Student'}
          </span>
        </div>

        {/* 2. SECTION: Learning Summary Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <div className="profile-stat-val">{profileData?.learningStats?.roadmapsCompleted || 2}</div>
            <div className="profile-stat-label">Roadmaps Completed</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-val">{completedLessons?.size || profileData?.learningStats?.lessonsCompleted || 12}</div>
            <div className="profile-stat-label">Lessons Completed</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-val">{profileData?.learningStats?.resourcesDownloaded || 14}</div>
            <div className="profile-stat-label">Resources Downloaded</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-val">{profileData?.learningStats?.programsSolved || 54}</div>
            <div className="profile-stat-label">Programs Solved</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-val">{profileData?.learningStats?.quizAccuracy || 88}%</div>
            <div className="profile-stat-label">Overall Progress</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-val">{profileData?.certificates?.length || 1}</div>
            <div className="profile-stat-label">Certificates Earned</div>
          </div>
        </div>

        {/* Main Workspace Layout Split */}
        <div className="profile-grid-container">
          
          {/* Left Column */}
          <div className="profile-left-col">
            
            {/* 3. SECTION: Continue Learning CTA Card */}
            <div className="profile-section-card">
              <h2 className="profile-section-title">
                <Play size={18} style={{ color: 'var(--accent-glow)' }} /> Continue Learning Track
              </h2>
              <div className="profile-continue-banner">
                <div className="profile-continue-info">
                  <span className="profile-continue-tag">C Programming Track</span>
                  <h3 className="profile-continue-title">Pointers & Memory Allocation</h3>
                  <p className="profile-continue-desc">
                    Next Node: Memory references, pointer swapping, and dynamic allocation with malloc/calloc.
                  </p>
                  <div className="profile-continue-bar-row">
                    <div className="profile-continue-bar-bg">
                      <div className="profile-continue-bar-fill" style={{ width: '80%' }} />
                    </div>
                    <span className="profile-continue-percent">80% Complete</span>
                  </div>
                </div>

                <button 
                  className="btn-premium-purple"
                  style={{ minHeight: '48px', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' }}
                  onClick={() => resumeLearning ? resumeLearning(navigate) : navigate('/roadmap')}
                >
                  <Play size={16} fill="currentColor" /> Continue Learning <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* 5. SECTION: Achievements & Skill Badges */}
            <div className="profile-section-card">
              <h2 className="profile-section-title">
                <Award size={18} style={{ color: '#f59e0b' }} /> Achievements & Badges
              </h2>
              <div className="profile-achievements-list">
                <div className="profile-achievement-item">
                  <span className="profile-achievement-icon">🚀</span>
                  <div className="profile-achievement-details">
                    <span className="profile-achievement-title">First Login</span>
                    <span className="profile-achievement-desc">Initiated learning journey on BCA Portal.</span>
                  </div>
                </div>
                <div className="profile-achievement-item">
                  <span className="profile-achievement-icon">🎓</span>
                  <div className="profile-achievement-details">
                    <span className="profile-achievement-title">C Master Module</span>
                    <span className="profile-achievement-desc">Completed C Syntax & Pointer Track.</span>
                  </div>
                </div>
                <div className="profile-achievement-item">
                  <span className="profile-achievement-icon">🔥</span>
                  <div className="profile-achievement-details">
                    <span className="profile-achievement-title">Streak Master</span>
                    <span className="profile-achievement-desc">Maintained active 5-day streak.</span>
                  </div>
                </div>
                <div className="profile-achievement-item locked">
                  <span className="profile-achievement-icon">🛡️</span>
                  <div className="profile-achievement-details">
                    <span className="profile-achievement-title">Code Guardian</span>
                    <span className="profile-achievement-desc">Score 100% in Data Structures Quiz.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="profile-right-col">
            
            {/* 4. SECTION: Recent Activity Feed */}
            <div className="profile-section-card">
              <h2 className="profile-section-title">
                <Clock size={18} style={{ color: '#3b82f6' }} /> Recent Learning History
              </h2>
              <div className="profile-activity-list">
                <div className="profile-activity-item">
                  <div className="profile-activity-item-left">
                    <BookOpen size={15} className="profile-activity-icon" />
                    <div>
                      <span className="profile-activity-text">Completed C Lesson 04</span>
                      <span className="profile-activity-sub">Pointers & Memory Swapping</span>
                    </div>
                  </div>
                  <span className="profile-activity-time">1h ago</span>
                </div>

                <div className="profile-activity-item">
                  <div className="profile-activity-item-left">
                    <Download size={15} className="profile-activity-icon" style={{ color: '#34d399' }} />
                    <div>
                      <span className="profile-activity-text">Downloaded Lecture Notes</span>
                      <span className="profile-activity-sub">DBMS SQL Guide.pdf</span>
                    </div>
                  </div>
                  <span className="profile-activity-time">3h ago</span>
                </div>

                <div className="profile-activity-item">
                  <div className="profile-activity-item-left">
                    <Code size={15} className="profile-activity-icon" style={{ color: '#c084fc' }} />
                    <div>
                      <span className="profile-activity-text">Compiled Playground Code</span>
                      <span className="profile-activity-sub">Binary Search Tree C Program</span>
                    </div>
                  </div>
                  <span className="profile-activity-time">Yesterday</span>
                </div>
              </div>
            </div>

            {/* 6. SECTION: Account & Security Settings */}
            <div className="profile-section-card">
              <h2 className="profile-section-title">
                <Settings size={18} style={{ color: '#c084fc' }} /> Account & Security
              </h2>

              <div className="account-settings-list">
                <div className="settings-item-row" onClick={() => setEditModalOpen(true)}>
                  <div className="settings-icon-box">
                    <User size={16} />
                  </div>
                  <div className="settings-info">
                    <h4>Edit Profile Information</h4>
                    <p>Update display name, bio, and college details</p>
                  </div>
                  <ChevronRight size={16} className="settings-arrow" />
                </div>

                <div className="settings-item-row" onClick={() => alert("Password reset link sent to your registered email!")}>
                  <div className="settings-icon-box">
                    <Key size={16} />
                  </div>
                  <div className="settings-info">
                    <h4>Change Security Password</h4>
                    <p>Send password reset instructions to email</p>
                  </div>
                  <ChevronRight size={16} className="settings-arrow" />
                </div>

                <div className="settings-item-row danger" onClick={handleLogout}>
                  <div className="settings-icon-box danger">
                    <LogOut size={16} />
                  </div>
                  <div className="settings-info">
                    <h4 className="danger-text">Logout Session</h4>
                    <p>Securely end your current login session</p>
                  </div>
                  <ChevronRight size={16} className="settings-arrow" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="profile-modal-backdrop" onClick={() => setEditModalOpen(false)}>
          <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2 className="profile-modal-title">Edit Profile Information</h2>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="profile-modal-close"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveChanges}>
              <div className="profile-form-group">
                <label className="profile-form-label">Full Name</label>
                <input 
                  type="text" 
                  value={editDisplayName} 
                  onChange={(e) => setEditDisplayName(e.target.value)} 
                  className="profile-form-input"
                  required
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Username</label>
                <input 
                  type="text" 
                  value={editUsername} 
                  onChange={(e) => setEditUsername(e.target.value)} 
                  className="profile-form-input"
                  required
                />
                {usernameError && (
                  <p style={{ color: '#ef4444', fontSize: '0.74rem', margin: '4px 0 0' }}>
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Profile Image URL</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="url" 
                    value={editPhotoURL} 
                    onChange={(e) => setEditPhotoURL(e.target.value)} 
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="profile-form-input"
                    style={{ flex: 1 }}
                  />
                  {editPhotoURL && (
                    <button 
                      type="button" 
                      onClick={handleRemovePhoto} 
                      className="btn-reset-filters" 
                      style={{ fontSize: '0.75rem', padding: '6px 12px', minHeight: 'auto' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Bio / Tagline</label>
                <textarea 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)} 
                  placeholder="BCA student | Full-stack software developer..." 
                  className="profile-form-textarea"
                  rows={3}
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">College / Institution</label>
                <input 
                  type="text" 
                  value={editCollege} 
                  onChange={(e) => setEditCollege(e.target.value)} 
                  className="profile-form-input"
                />
              </div>

              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label className="profile-form-label">Course</label>
                  <input 
                    type="text" 
                    value={editCourse} 
                    onChange={(e) => setEditCourse(e.target.value)} 
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Semester</label>
                  <input 
                    type="text" 
                    value={editSemester} 
                    onChange={(e) => setEditSemester(e.target.value)} 
                    className="profile-form-input"
                  />
                </div>
              </div>

              <div className="profile-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setEditModalOpen(false)}
                  className="btn-reset-filters"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-premium-purple"
                  style={{ minHeight: '48px', padding: '10px 22px', borderRadius: '12px', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
