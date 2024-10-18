// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Import firebase authentication
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(); // Create context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if authenticated
      setLoading(false); // Stop loading after checking auth state
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Provide user and loading state
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook to use auth context
