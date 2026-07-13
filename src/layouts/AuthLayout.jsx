import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout-wrapper auth-page-container">
      {children}
    </div>
  );
};

export default AuthLayout;
