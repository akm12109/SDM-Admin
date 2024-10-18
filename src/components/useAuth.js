import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Adjust the path as necessary

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext); // Get the authentication context

  // Ensure the context is available
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // Return the context
};
