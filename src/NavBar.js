// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '10px 20px',
      backgroundColor: '#4B79A1', // Background color
      background: 'linear-gradient(90deg, #283E51 0%, #4B79A1 100%)', // Gradient effect
      color: 'white',
      zIndex: 1000,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow for depth
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontSize: '24px',
          margin: 0,
          fontFamily: 'Arial, sans-serif',
        }}>
          School Admin
        </h1>
        <ul style={{
          listStyleType: 'none',
          display: 'flex',
          margin: 0,
          padding: 0,
        }}>
          <li style={{ margin: '0 15px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Home</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link to="/t--p" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Add Teachers</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link to="/listpage" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Edit Data</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Register New Student</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link to="/photos-add" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Add Photos</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link to="/addevent" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Add Events</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
