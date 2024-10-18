import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Admin credentials (move these to an environment variable or server-side in real projects)
    const adminUsername = 'admin.akm.dev';
    const adminPassword = 'akm.dev';

    if (username === adminUsername && password === adminPassword) {
      // Set a flag in localStorage for admin authentication
      localStorage.setItem('isAdmin', 'true');
      setError(''); // Clear error message
      navigate('/admin0dsfsdifiyrijh121212ssw', { replace: true }); // Redirect to admin dashboard
    } else {
      setError('Invalid username or password');
      setUsername(''); // Clear username input
      setPassword(''); // Clear password input
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-yellow-100">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <label className="block text-blue-800 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors" 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-800 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
