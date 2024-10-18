// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    // If not logged in as admin, redirect to login
    return <Navigate to="/admin-login" />;
  }

  // If logged in as admin, render the AdminPanel
  return children;
};

export default ProtectedAdminRoute;
