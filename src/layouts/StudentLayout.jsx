import React from 'react';
import Navbar from '../components/Navbar';

const StudentLayout = ({ children }) => {
  return (
    <div className="student-layout-wrapper">
      <Navbar />
      <main className="main-content-layout student-theme">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
