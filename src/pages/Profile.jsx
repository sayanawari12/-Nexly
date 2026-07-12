import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getUserProfile, updateUserProfile, checkUsernameAvailability } from '../services/userDatabase';
import { useProgress } from '../context/ProgressContext';
import { 
  User, School, BookOpen, Calendar, Flame, Target, 
  Award, Clock, CheckCircle, Code, Shield, FileText, 
  Globe, ExternalLink, Camera, Edit2, X 
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
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { profileData, loadingProgress: loadingProfile } = useProgress();
  const [editModalOpen, setEditModalOpen] = useState(false);

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
      // Check username uniqueness if it was changed
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

  // Remove Photo handler
  const handleRemovePhoto = async () => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, { photoURL: '' });
      setEditPhotoURL('');
    } catch (err) {
      console.error("Failed to remove photo:", err);
    }
  };

  const usernameHandle = profileData?.username ? `@${profileData.username}` : `@student_${user.uid.slice(0, 5)}`;
  const joinedDate = profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'July 2026';

  return (
    <div className="profile-page-wrapper">
      
      {/* 1. Large Hero Profile Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-avatar-container">
            <div className="profile-large-avatar">
              {profileData?.photoURL ? (
                <img src={profileData.photoURL} alt="Profile" />
              ) : (
                getInitials(profileData?.displayName)
              )}
            </div>
            <div className="profile-avatar-overlay" onClick={() => setEditModalOpen(true)}>
              <Camera size={18} />
            </div>
          </div>

          <div className="profile-identity-info">
            <h1 className="profile-display-name">{profileData?.displayName || 'Student'}</h1>
            <span className="profile-username">{usernameHandle}</span>
            {profileData?.bio && <p className="profile-bio">{profileData.bio}</p>}
            
            <div className="profile-details-list">
              <div className="profile-detail-chip">
                <School size={13} /> {profileData?.college || 'BCA Department'}
              </div>
              <div className="profile-detail-chip">
                <BookOpen size={13} /> {profileData?.course || 'Bachelor of Computer Applications'}
              </div>
              <div className="profile-detail-chip">
                <Target size={13} /> {profileData?.semester || 'Semester II'}
              </div>
              <div className="profile-detail-chip">
                <Calendar size={13} /> Joined {joinedDate}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-hero-right">
          <div className="profile-streak-badge">
            <Flame size={16} />
            <span>Streak: {profileData?.learningStats?.currentStreak || 5} days</span>
          </div>
          
          <button 
            className="btn-premium"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
            onClick={() => setEditModalOpen(true)}
          >
            <Edit2 size={13} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Social Links Panel (Architecture Only) */}
      <div className="profile-section-card" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', padding: '16px 24px', marginBottom: '32px' }}>
        <a 
          href={profileData?.githubURL || profileData?.socials?.github || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="profile-detail-chip" 
          style={{ textDecoration: 'none', color: 'inherit', opacity: (profileData?.githubURL || profileData?.socials?.github) ? 1 : 0.4 }}
        >
          <GithubIcon size={14} /> GitHub {(profileData?.githubURL || profileData?.socials?.github) && <ExternalLink size={10} style={{ marginLeft: '4px' }} />}
        </a>
        <a 
          href={profileData?.linkedinURL || profileData?.socials?.linkedin || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="profile-detail-chip" 
          style={{ textDecoration: 'none', color: 'inherit', opacity: (profileData?.linkedinURL || profileData?.socials?.linkedin) ? 1 : 0.4 }}
        >
          <LinkedinIcon size={14} /> LinkedIn {(profileData?.linkedinURL || profileData?.socials?.linkedin) && <ExternalLink size={10} style={{ marginLeft: '4px' }} />}
        </a>
        <a 
          href={profileData?.resumeURL || profileData?.socials?.resume || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="profile-detail-chip" 
          style={{ textDecoration: 'none', color: 'inherit', opacity: (profileData?.resumeURL || profileData?.socials?.resume) ? 1 : 0.4 }}
        >
          <FileText size={14} /> Resume {(profileData?.resumeURL || profileData?.socials?.resume) && <ExternalLink size={10} style={{ marginLeft: '4px' }} />}
        </a>
        <span className="profile-detail-chip" style={{ opacity: 0.5 }}>
          <Globe size={14} /> Placement: {profileData?.placementStatus || 'Seeking Internships'}
        </span>
      </div>

      {/* 2. Grid Dashboard Layout */}
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.programsSolved || 54}</div>
          <div className="profile-stat-label">Programs Solved</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.lessonsCompleted || 12}</div>
          <div className="profile-stat-label">Lessons Completed</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.roadmapsCompleted || 1}</div>
          <div className="profile-stat-label">Roadmaps Completed</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.quizAccuracy || 88}%</div>
          <div className="profile-stat-label">Quiz Accuracy</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.learningHours || 15}h</div>
          <div className="profile-stat-label">Learning Hours</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-val">{profileData?.learningStats?.certificates || 1}</div>
          <div className="profile-stat-label">Certificates Earned</div>
        </div>
      </div>

      <div className="profile-grid-container">
        {/* Left Grid Section */}
        <div>
          {/* 3. Continue Learning */}
          <div className="profile-section-card">
            <h2 className="profile-section-title"><BookOpen size={18} /> Continue Learning</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '20px', borderRadius: '14px' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>C Programming Roadmap</h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Next Node: Step 05 — Pointer Swapping in memory.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '180px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--primary-purple)' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--accent-glow)' }}>80% Complete</span>
                </div>
              </div>
              <button 
                className="btn-premium-purple"
                style={{ fontSize: '0.8rem', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => navigate('/technologies/c')}
              >
                Resume Journey
              </button>
            </div>
          </div>

          {/* 4. Achievements */}
          <div className="profile-section-card">
            <h2 className="profile-section-title"><Award size={18} /> Achievements</h2>
            <div className="profile-achievements-list">
              <div className="profile-achievement-item">
                <span className="profile-achievement-icon">🚀</span>
                <div className="profile-achievement-details">
                  <span className="profile-achievement-title">Rocket Starter</span>
                  <span className="profile-achievement-desc">Completed Step 01 of C Roadmap.</span>
                </div>
              </div>
              <div className="profile-achievement-item">
                <span className="profile-achievement-icon">🎓</span>
                <div className="profile-achievement-details">
                  <span className="profile-achievement-title">Pointer Master</span>
                  <span className="profile-achievement-desc">Solved all Pointer C Programs.</span>
                </div>
              </div>
              <div className="profile-achievement-item locked">
                <span className="profile-achievement-icon">🛡️</span>
                <div className="profile-achievement-details">
                  <span className="profile-achievement-title">Code Guardian</span>
                  <span className="profile-achievement-desc">Score 100% in Data Structures Quiz.</span>
                </div>
              </div>
              <div className="profile-achievement-item locked">
                <span className="profile-achievement-icon">🔥</span>
                <div className="profile-achievement-details">
                  <span className="profile-achievement-title">Streak Flame</span>
                  <span className="profile-achievement-desc">Reach a 7-day learning streak.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Grid Section */}
        <div>
          {/* 6. Learning Goals */}
          <div className="profile-section-card">
            <h2 className="profile-section-title"><Target size={18} /> Learning Goals</h2>
            <div className="profile-goal-item">
              <div className="profile-goal-header">
                <span>Complete Semester 2 Labs</span>
                <span>75%</span>
              </div>
              <div className="profile-goal-bar-bg">
                <div className="profile-goal-bar-fill" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="profile-goal-item">
              <div className="profile-goal-header">
                <span>Solve Pointer Challenges</span>
                <span>40%</span>
              </div>
              <div className="profile-goal-bar-bg">
                <div className="profile-goal-bar-fill" style={{ width: '40%' }} />
              </div>
            </div>
            <div className="profile-goal-item">
              <div className="profile-goal-header">
                <span>Linked List Syllabus</span>
                <span>100%</span>
              </div>
              <div className="profile-goal-bar-bg">
                <div className="profile-goal-bar-fill" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* 5. Recent Activity */}
          <div className="profile-section-card">
            <h2 className="profile-section-title"><Clock size={18} /> Recent Activity</h2>
            <div className="profile-activity-list">
              <div className="profile-activity-item">
                <div className="profile-activity-item-left">
                  <BookOpen size={14} className="profile-activity-icon" />
                  <span className="profile-activity-text">Lesson Completed</span>
                </div>
                <span className="profile-activity-time">1h ago</span>
              </div>
              <div className="profile-activity-item">
                <div className="profile-activity-item-left">
                  <Code size={14} className="profile-activity-icon" />
                  <span className="profile-activity-text">Program Solved</span>
                </div>
                <span className="profile-activity-time">2h ago</span>
              </div>
              <div className="profile-activity-item">
                <div className="profile-activity-item-left">
                  <CheckCircle size={14} className="profile-activity-icon" />
                  <span className="profile-activity-text">Quiz Attempted</span>
                </div>
                <span className="profile-activity-time">1d ago</span>
              </div>
              <div className="profile-activity-item">
                <div className="profile-activity-item-left">
                  <Shield size={14} className="profile-activity-icon" />
                  <span className="profile-activity-text">Bookmarked File</span>
                </div>
                <span className="profile-activity-time">2d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="profile-modal-backdrop" onClick={() => setEditModalOpen(false)}>
          <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="profile-modal-title" style={{ margin: 0 }}>Edit Profile Snapshot</h2>
              <button 
                onClick={() => setEditModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveChanges}>
              <div className="profile-form-group">
                <label className="profile-form-label">Display Name</label>
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
                  <p style={{ color: '#ef4444', fontSize: '0.74rem', margin: '4px 0 0', textAlign: 'left' }}>
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
                      className="search-recent-clear-btn" 
                      style={{ fontSize: '0.74rem' }}
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
                  placeholder="System level engineer | BCA student..." 
                  className="profile-form-textarea"
                  rows={3}
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">College / Institute</label>
                <input 
                  type="text" 
                  value={editCollege} 
                  onChange={(e) => setEditCollege(e.target.value)} 
                  className="profile-form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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

              <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', margin: '20px 0 10px', textAlign: 'left' }}>
                Social Connections (Architecture only)
              </h4>

              <div className="profile-form-group">
                <label className="profile-form-label">GitHub URL</label>
                <input 
                  type="url" 
                  value={editGithub} 
                  onChange={(e) => setEditGithub(e.target.value)} 
                  placeholder="https://github.com/..." 
                  className="profile-form-input"
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">LinkedIn URL</label>
                <input 
                  type="url" 
                  value={editLinkedin} 
                  onChange={(e) => setEditLinkedin(e.target.value)} 
                  placeholder="https://linkedin.com/in/..." 
                  className="profile-form-input"
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Resume Link</label>
                <input 
                  type="url" 
                  value={editResume} 
                  onChange={(e) => setEditResume(e.target.value)} 
                  placeholder="https://drive.google.com/file/d/..." 
                  className="profile-form-input"
                />
              </div>

              <div className="profile-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setEditModalOpen(false)}
                  className="search-empty-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-premium-purple"
                  style={{ fontSize: '0.86rem', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' }}
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
