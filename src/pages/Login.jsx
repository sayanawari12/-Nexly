import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Check, AlertCircle, ArrowLeft, BookOpen, Code2, Terminal, Trophy } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import '../styles/Login.css';

const getPasswordStrength = (pass) => {
  if (!pass) return null;
  if (pass.length < 6) return 'weak';
  
  const onlyLetters = /^[a-zA-Z]+$/.test(pass);
  if (onlyLetters) return 'weak';
  
  const hasUppercase = /[A-Z]/.test(pass);
  const hasLowercase = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);
  
  if (pass.length >= 8 && hasUppercase && hasLowercase && hasNumber && hasSpecial) {
    return 'strong';
  }
  
  return 'medium';
};

const Login = () => {
  const { login, signup, resetPassword, loginGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Modes: 'login' | 'signup' | 'forgot'
  const [mode, setMode] = useState('login');
  
  // Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');

  // Mouse Reactive Glow Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user && !success) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath, success]);

  // Mouse movement capture inside the page container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Validations
  const isEmailValid = email.includes('@') && email.length > 4;
  const isPasswordValid = password.length >= 6;
  const isConfirmMatch = password === confirmPassword;
  const isNameValid = name.trim().length > 1;

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await loginGoogle();
      const displayName = result.user?.displayName || result.user?.email?.split('@')[0] || 'User';
      setSuccessName(displayName);
      setSuccess(true);
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 900);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to authenticate with Google.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'forgot') {
      if (!isEmailValid) {
        setError('Please enter a valid email address.');
        return;
      }
      setLoading(true);
      try {
        await resetPassword(email);
        setSuccessName(email);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setMode('login');
          setLoading(false);
        }, 900);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to send password reset link.');
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup') {
      if (!isNameValid) {
        setError('Please enter your name.');
        return;
      }
      if (!isEmailValid) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!isPasswordValid) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (!isConfirmMatch) {
        setError('Passwords do not match.');
        return;
      }
      
      setLoading(true);
      try {
        await signup(email, password);
        setSuccessName(name);
        setSuccess(true);
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 900);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to create an account.');
        setLoading(false);
      }
    } else {
      if (!isEmailValid || !isPasswordValid) {
        setError('Please enter a valid email and password.');
        return;
      }
      
      setLoading(true);
      try {
        const result = await login(email, password);
        const displayName = result.user?.displayName || email.split('@')[0] || 'User';
        setSuccessName(displayName);
        setSuccess(true);
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 900);
      } catch (err) {
        console.error(err);
        setError('Invalid credentials.');
        setLoading(false);
      }
    }
  };

  return (
    <div 
      className="auth-page-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Success Takeover overlay */}
      {success && (
        <div className="auth-success-overlay">
          <div className="auth-success-circle">
            <Check size={28} />
          </div>
          <h2 className="auth-success-title">
            {mode === 'forgot' ? 'Email Dispatched!' : `Welcome Back, ${successName}!`}
          </h2>
          <p className="auth-success-subtitle">
            {mode === 'forgot' 
              ? 'Password reset instructions sent.' 
              : 'Redirecting to your dashboard...'}
          </p>
        </div>
      )}

      {/* Background Grids, Aurora Ambient Lights & Mouse glows */}
      <div className="auth-bg-grid" />
      <div className="auth-grid-shine" />
      <div className="auth-aurora-glow" />
      <div className="auth-ambient-glow-secondary" />
      <div 
        className="auth-mouse-glow" 
        style={{
          transform: `translate3d(calc(${mousePos.x}px - 50%), calc(${mousePos.y}px - 50%), 0)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* LEFT PANEL - Large branding details */}
      <div className="auth-left-panel">
        <div className="auth-branding animate-fade-in delay-1">
          <div className="auth-brand-logo">
            <Check size={18} color="#ffffff" strokeWidth={3} />
          </div>
          <span className="auth-brand-name">BCA Learning Portal</span>
        </div>

        <div className="auth-left-content">
          <span className="auth-left-tagline animate-fade-in delay-2">Premium Student Dashboard</span>
          <h2 className="auth-left-title animate-scale-in delay-3">
            {mode === 'signup' 
              ? 'Start Your Programming Journey Today' 
              : 'Continue Your Learning Journey'}
          </h2>
          <p className="auth-left-desc animate-fade-in delay-4">
            Access your modular syllabus lessons, trace compiled programs outputs, practice coding in our sandbox terminal compiler, and track career flowcharts.
          </p>

          {/* Elevated feature cards grid with load stagger sequences */}
          <div className="auth-features-list">
            <div className="auth-feature-card animate-scale-in delay-4">
              <div className="auth-feature-icon-wrapper">
                <BookOpen size={20} />
              </div>
              <div>
                <h5>Modular Lessons</h5>
                <p>24+ detailed syllabus lectures</p>
              </div>
            </div>
            <div className="auth-feature-card animate-scale-in delay-5">
              <div className="auth-feature-icon-wrapper">
                <Code2 size={20} />
              </div>
              <div>
                <h5>Programs Database</h5>
                <p>54+ synchronized examples</p>
              </div>
            </div>
            <div className="auth-feature-card animate-scale-in delay-6">
              <div className="auth-feature-icon-wrapper">
                <Terminal size={20} />
              </div>
              <div>
                <h5>Console Sandbox</h5>
                <p>Compile C/C++ code locally</p>
              </div>
            </div>
            <div className="auth-feature-card animate-scale-in delay-7">
              <div className="auth-feature-icon-wrapper">
                <Trophy size={20} />
              </div>
              <div>
                <h5>Career Flowcharts</h5>
                <p>Structured tech pathways</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Authentication card */}
      <div className="auth-right-panel">
        <div className="auth-glass-card animate-scale-in delay-8">
          <div className="auth-card-header">
            <h3>
              {mode === 'forgot' 
                ? 'Reset Password' 
                : 'Welcome Back'}
            </h3>
            <p>
              {mode === 'forgot' 
                ? 'Enter email to receive password reset link' 
                : 'Continue your learning journey.'}
            </p>
          </div>

          {error && (
            <div className="auth-error-banner">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Social login option */}
          {mode !== 'forgot' && (
            <>
              <button 
                type="button" 
                className="btn-google-auth" 
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              <div className="auth-divider">──────── OR ────────</div>
            </>
          )}

          {/* Form wrapper */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="auth-form-group">
                <label className="auth-form-label">Name</label>
                <div className="auth-input-wrapper">
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'rgba(255,255,255,0.3)' }} />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter name" 
                    className="auth-input"
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-form-group">
              <label className="auth-form-label">Email</label>
              <div className="auth-input-wrapper">
                <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'rgba(255,255,255,0.3)' }} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter email" 
                  className="auth-input"
                  style={{ paddingLeft: '40px' }}
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="auth-form-group">
                <label className="auth-form-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'rgba(255,255,255,0.3)' }} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password" 
                    className="auth-input"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    required
                  />
                  <button 
                    type="button" 
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {mode === 'signup' && password.length > 0 && (
                  <div className="auth-password-info">
                    {password.length < 6 && (
                      <span className="auth-validation-msg error">
                        Password must be at least 6 characters.
                      </span>
                    )}
                    <div className="auth-strength-row">
                      <span className="auth-strength-label">Password Strength</span>
                      {getPasswordStrength(password) === 'weak' && <span className="auth-strength-value weak">🔴 Weak</span>}
                      {getPasswordStrength(password) === 'medium' && <span className="auth-strength-value medium">🟡 Medium</span>}
                      {getPasswordStrength(password) === 'strong' && (
                        <span className="auth-strength-value strong">
                          <Check size={13} style={{ marginRight: '2px' }} /> Strong password
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <span 
                    className="auth-forgot-link" 
                    onClick={() => { setError(null); setMode('forgot'); }}
                  >
                    Forgot Password?
                  </span>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="auth-form-group">
                <label className="auth-form-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'rgba(255,255,255,0.3)' }} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm password" 
                    className="auth-input"
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
                {confirmPassword.length > 0 && (
                  <div className="auth-confirm-info">
                    {isConfirmMatch ? (
                      <span className="auth-validation-msg success">
                        <Check size={13} style={{ marginRight: '2px' }} /> Passwords match
                      </span>
                    ) : (
                      <span className="auth-validation-msg error">
                        Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-auth-submit"
              disabled={loading}
            >
              {loading 
                ? 'Verifying...' 
                : mode === 'forgot' 
                  ? 'Send Reset Instructions' 
                  : mode === 'signup' 
                    ? 'Register Now' 
                    : 'Sign In'}
            </button>

            {/* Trust authentication text */}
            <div className="auth-trust-text">
              <span>🔒 Secure authentication powered by Firebase</span>
            </div>
          </form>

          {/* Switch links */}
          <div className="auth-bottom-switch">
            {mode === 'forgot' ? (
              <span 
                className="auth-switch-link" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => { setError(null); setMode('login'); }}
              >
                <ArrowLeft size={14} /> Back to Sign In
              </span>
            ) : mode === 'signup' ? (
              <>
                Already have an account?
                <span className="auth-switch-link" onClick={() => { setError(null); setMode('login'); }}>
                  Sign In
                </span>
              </>
            ) : (
              <>
                Don't have an account?
                <span className="auth-switch-link" onClick={() => { setError(null); setMode('signup'); }}>
                  Create Account
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
