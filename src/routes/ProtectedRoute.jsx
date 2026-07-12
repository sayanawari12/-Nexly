import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Reusable route guard component.
 * Redirects to the login route if the user session is unauthenticated,
 * while preserving the originally requested URL in the history state.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        background: '#050505', 
        color: '#ffffff' 
      }}>
        <div style={{ 
          fontSize: '1.1rem', 
          fontFamily: 'Space Grotesk, sans-serif',
          color: '#A855F7',
          textShadow: '0 0 10px rgba(168, 85, 247, 0.3)'
        }}>
          Verifying session...
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, but save the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
