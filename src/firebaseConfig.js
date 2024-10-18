// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa2MMycTIOKnoEFbmTlLl9egw62NP4Cas",
  authDomain: "video-realcall.firebaseapp.com",
  databaseURL: "https://video-realcall-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-realcall",
  storageBucket: "video-realcall.appspot.com",
  messagingSenderId: "317991905780",
  appId: "1:317991905780:web:07513a02523e23ad65b1a1",
  measurementId: "G-MNLQ5G11B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app

export const auth = getAuth(app); // Initialize and export Auth
export const storage = getStorage(app); // Initialize and export Storage
export const db = getFirestore(app); // Initialize and export Firestore
