// src/components/Register.js
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, off } from "firebase/database"; // <-- Add 'off' here
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [age, setAge] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]); // State to hold registered users

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');
    
    // Listener to fetch users from Firebase
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      const usersArray = [];
      for (let id in userData) {
        usersArray.push({ id, ...userData[id] });
      }
      setUsers(usersArray);
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe(); // Use the unsubscribe function to detach the listener
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        
        // Storing additional user data in the database
        set(userRef, {
          name: name,
          class: className,
          age: age,
          email: email,
          profilePhoto: profilePhoto ? URL.createObjectURL(profilePhoto) : null
        });

        // Clear form fields
        setName('');
        setClassName('');
        setAge('');
        setEmail('');
        setPassword('');
        setProfilePhoto(null);
        
        console.log("User registered:", userCredential.user);
        // Redirect to your dashboard here if needed
      })
      .catch((error) => {
        setError('Registration failed: ' + error.message);
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <form className="w-full max-w-sm p-4 bg-white shadow-lg rounded" onSubmit={handleRegister}>
        <h2 className="text-2xl mb-4 text-center">Register Student</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Class</label>
          <input 
            type="text" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setProfilePhoto(e.target.files[0])} 
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
          Register
        </button>
      </form>

      {/* Display Registered Users */}
      <div className="mt-8 w-full max-w-4xl">
        <h3 className="text-2xl mb-4 text-center">Registered Users</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="p-4 bg-gray-100 rounded shadow">
              {user.profilePhoto && (
                <img src={user.profilePhoto} alt={user.name} className="w-full h-32 object-cover rounded mb-2" />
              )}
              <h4 className="font-bold">{user.name}</h4>
              <p>Class: {user.class}</p>
              <p>Age: {user.age}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
