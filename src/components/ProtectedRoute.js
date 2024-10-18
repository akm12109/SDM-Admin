// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook from your AuthContext
import { auth } from '../firebaseConfig'; // Import Firebase authentication

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from auth context

  // Optionally, you can check Firebase auth directly as well
  const firebaseUser = auth.currentUser;

  // Use the user from context or Firebase to determine if access should be granted
  if (!user && !firebaseUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // If user is authenticated, render the protected component
};

export default ProtectedRoute;
