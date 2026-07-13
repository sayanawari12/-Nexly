import React from 'react';
import Navbar from '../components/Navbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout-wrapper">
      <Navbar />
      <main className="main-content-layout admin-theme">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
