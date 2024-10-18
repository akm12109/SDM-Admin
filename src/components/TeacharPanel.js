import React, { useState, useEffect } from 'react';
import { db, storage } from './../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { v4 as uuidv4 } from 'uuid'; 

const TeacherPanel = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classTeacher, setClassTeacher] = useState('');
  const [photo, setPhoto] = useState(null); 
  const [contactNumber, setContactNumber] = useState(''); // Contact Number
  const [email, setEmail] = useState(''); // Email
  const [telegram, setTelegram] = useState(''); // Telegram ID
  const [whatsapp, setWhatsapp] = useState(''); // WhatsApp Number
  const [teachers, setTeachers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  // Fetch teachers from Firestore
  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersCollection = collection(db, 'teachers');
      const teachersSnapshot = await getDocs(teachersCollection);
      const teachersList = teachersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeachers(teachersList);
    };

    fetchTeachers();
  }, []);

  // Upload image to Firebase Storage
  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `teachers/${uuidv4()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  // Add or update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = null;
    if (photo) {
      photoUrl = await uploadImage(photo);
    }

    if (isEditing) {
      const teacherDoc = doc(db, 'teachers', currentTeacherId);
      await updateDoc(teacherDoc, {
        name,
        subject,
        classTeacher,
        photoUrl,
        contactNumber,
        email,
        telegram,
        whatsapp,
      });
      alert('Teacher updated successfully');
    } else {
      await addDoc(collection(db, 'teachers'), {
        name,
        subject,
        classTeacher,
        photoUrl,
        contactNumber,
        email,
        telegram,
        whatsapp,
      });
      alert('Teacher added successfully');
    }

    setName('');
    setSubject('');
    setClassTeacher('');
    setPhoto(null);
    setContactNumber('');
    setEmail('');
    setTelegram('');
    setWhatsapp('');
    setIsEditing(false);
    setCurrentTeacherId(null);

    const teachersCollection = collection(db, 'teachers');
    const teachersSnapshot = await getDocs(teachersCollection);
    setTeachers(teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Edit Teacher
  const handleEdit = (teacher) => {
    setName(teacher.name);
    setSubject(teacher.subject);
    setClassTeacher(teacher.classTeacher);
    setPhoto(null); 
    setContactNumber(teacher.contactNumber);
    setEmail(teacher.email);
    setTelegram(teacher.telegram);
    setWhatsapp(teacher.whatsapp);
    setIsEditing(true);
    setCurrentTeacherId(teacher.id);
  };

  // Delete Teacher
  const handleDelete = async (id) => {
    const teacherDoc = doc(db, 'teachers', id);
    await deleteDoc(teacherDoc);
    alert('Teacher deleted successfully');
    const teachersCollection = collection(db, 'teachers');
    const teachersSnapshot = await getDocs(teachersCollection);
    setTeachers(teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Teacher Admin Panel</h1>
      
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Teacher' : 'Add Teacher'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter teacher's name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter subject" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Class Teacher of</label>
            <input type="text" value={classTeacher} onChange={(e) => setClassTeacher(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter class teacher details" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Photo</label>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          {/* Contact Details */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Contact Number</label>
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter contact number" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Telegram ID</label>
            <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter Telegram ID Without @" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">WhatsApp Number</label>
            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter WhatsApp number" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {isEditing ? 'Update Teacher' : 'Add Teacher'}
          </button>
        </form>
      </div>

      {/* Display Teacher List */}
      <div className="mt-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Current Teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold">{teacher.name}</h3>
              <p className="text-gray-600">Subject: {teacher.subject}</p>
              <p className="text-gray-600">Class Teacher: {teacher.classTeacher}</p>
              <p className="text-gray-600">Contact: {teacher.contactNumber}</p>
              <p className="text-gray-600">Email: {teacher.email}</p>
              <p className="text-gray-600">Telegram: {teacher.telegram}</p>
              <p className="text-gray-600">WhatsApp: {teacher.whatsapp}</p>
              <button onClick={() => handleEdit(teacher)} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">Edit</button>
              <button onClick={() => handleDelete(teacher.id)} className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
