import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';

const GuestLayout = ({ children }) => {
  return (
    <div className="guest-layout-wrapper">
      <Navbar />
      <main className="main-content-layout">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
