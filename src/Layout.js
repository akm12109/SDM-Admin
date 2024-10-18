// src/components/Layout.js
import React from 'react';
import NavBar from './NavBar'; // Adjust the path if necessary

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main style={{
        padding: '70px 20px 20px', // Added top padding to account for the fixed navbar
        backgroundColor: '#f9f9f9',
        minHeight: 'calc(100vh - 60px)',
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
