import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'; // For notifications
import PropTypes from 'prop-types'; // For PropTypes validation
import { Link } from 'react-router-dom'; // Import Link for routing

const AdminPanel = () => {
  // State variables for form inputs and errors
  const [noticeMessage, setNoticeMessage] = useState('');
  const [classSubject, setClassSubject] = useState('');
  const [classTime, setClassTime] = useState('');
  const [classJitsiLink, setClassJitsiLink] = useState('https://meet.jitsi.com/VideoXClass');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState(''); // Added
  const [videoLink, setVideoLink] = useState(''); // Added
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkPhoto, setHomeworkPhoto] = useState(null);
  const [dueDate, setDueDate] = useState(''); // New state for due date
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate class inputs
  const validateClassInput = () => {
    return classSubject && classTime && classJitsiLink;
  };

  // Function to handle adding notices
  const handleAddNotice = async () => {
    if (!noticeMessage) {
      setErrorMessage('Notice message cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'notices'), {
        message: noticeMessage,
        createdAt: new Date(),
      });
      setNoticeMessage('');
      toast.success('Notice added successfully!'); // Using toast notifications
    } catch (error) {
      console.error('Error adding notice:', error.message);
    }
  };

  // Function to handle adding classes
  const handleAddClass = async () => {
    if (!validateClassInput()) {
      setErrorMessage('Please fill out all fields for the class');
      return;
    }
    try {
      await addDoc(collection(db, 'classes'), {
        subject: classSubject,
        startTime: new Date(classTime).toISOString(),
        jitsiLink: classJitsiLink,
      });
      setClassSubject('');
      setClassTime('');
      setClassJitsiLink(''); // Reset with protocol
      toast.success('Class added successfully!'); // Using toast notifications
    } catch (error) {
      console.error('Error adding class:', error.message);
    }
  };

  // Function to handle adding videos
  const handleAddVideo = async () => {
    if (!videoTitle || !videoDescription || !videoLink) {
      setErrorMessage('Video title, description, and link cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'videos'), {
        title: videoTitle,
        description: videoDescription,
        link: videoLink,
        createdAt: new Date(),
      });
      setVideoTitle('');
      setVideoDescription('');
      setVideoLink('');
      toast.success('Video added successfully!'); // Using toast notifications
    } catch (error) {
      console.error('Error adding video:', error.message);
    }
  };

  // Function to handle homework photo changes
  const handleHomeworkPhotoChange = (e) => {
    if (e.target.files[0]) {
      setHomeworkPhoto(e.target.files[0]);
    }
  };

  // Function to handle adding homework
  const handleAddHomework = async () => {
    if (!homeworkTitle || !homeworkPhoto || !dueDate) { // Validate for due date
      setErrorMessage('Homework title, photo, and due date cannot be empty');
      return;
    }

    const photoRef = ref(storage, `homework_photos/${homeworkPhoto.name}`);
    const uploadTask = uploadBytesResumable(photoRef, homeworkPhoto);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading homework photo:', error.message);
        setErrorMessage('Error uploading photo, please try again.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          await addDoc(collection(db, 'homework'), {
            title: homeworkTitle,
            photoURL: downloadURL,
            dueDate: new Date(dueDate).toISOString(), // Include due date
            createdAt: new Date(),
          });
          setHomeworkTitle('');
          setHomeworkPhoto(null);
          setDueDate(''); // Reset due date
          setUploadProgress(0);
          toast.success('Homework added successfully!'); // Using toast notifications
        } catch (error) {
          console.error('Error adding homework:', error.message);
          setErrorMessage('Error adding homework, please try again.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-gray-800" 
          initial={{ y: -50 }} 
          animate={{ y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Admin Panel
        </motion.h1>

        {errorMessage && (
          <div className="bg-red-300 text-red-800 p-2 rounded-md mb-4">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Notice */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add Notice</h2>
            <input
              type="text"
              placeholder="Notice message"
              value={noticeMessage}
              onChange={(e) => setNoticeMessage(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <button
              onClick={handleAddNotice}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Notice
            </button>
          </motion.div>

          {/* Add Class */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add Class</h2>
            <input
              type="text"
              placeholder="Class subject"
              value={classSubject}
              onChange={(e) => setClassSubject(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="datetime-local"
              value={classTime}
              onChange={(e) => setClassTime(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="text"
              placeholder="Jitsi Meet link"
              value={classJitsiLink}
              onChange={(e) => setClassJitsiLink(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <button
              onClick={handleAddClass}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Add Class
            </button>
          </motion.div>

          {/* Add Video */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add Video</h2>
            <input
              type="text"
              placeholder="Video title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="text"
              placeholder="Video description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="text"
              placeholder="Video link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <button
              onClick={handleAddVideo}
              className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition duration-300"
            >
              Add Video
            </button>
          </motion.div>

          {/* Add Homework */}
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add Homework</h2>
            <input
              type="text"
              placeholder="Homework title"
              value={homeworkTitle}
              onChange={(e) => setHomeworkTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="file"
              onChange={handleHomeworkPhotoChange}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <button
              onClick={handleAddHomework}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Add Homework
            </button>
          </motion.div>
        </div>

        {uploadProgress > 0 && (
          <div className="mt-4">
            <p className="text-center text-gray-700">Upload Progress: {uploadProgress}%</p>
            <div className="w-full bg-gray-200 h-4 rounded-md overflow-hidden">
              <div 
                className="bg-green-600 h-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes validation (if needed for props)
AdminPanel.propTypes = {};

export default AdminPanel;
