import React, { useEffect, useState } from 'react';
import { db } from './../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ContactTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teacher list from Firestore
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, 'teachers');
        const teachersSnapshot = await getDocs(teachersCollection);
        const teachersList = teachersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teachers:', err.message);
        setError('Failed to load teacher data');
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading teachers...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Contact Your Teacher</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            {teacher.photoUrl ? (
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={teacher.photoUrl}
                  alt={`Photo of ${teacher.name}, ${teacher.subject} teacher`}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg mb-4">
                <span className="text-gray-600">No photo available</span>
              </div>
            )}
            <h3 className="text-2xl font-semibold">{teacher.name}</h3>
            <p className="text-gray-600">Subject: {teacher.subject}</p>
            <p className="text-gray-600">Class Teacher: {teacher.classTeacher}</p>
            {teacher.contactNumber && (
              <p className="text-gray-600">Contact Number: {teacher.contactNumber}</p>
            )}
            {teacher.email && <p className="text-gray-600">Email: {teacher.email}</p>}
            {teacher.telegram && <p className="text-gray-600">Telegram: {teacher.telegram}</p>}
            {teacher.whatsapp && <p className="text-gray-600">WhatsApp: {teacher.whatsapp}</p>}
            <div className="mt-4">
              {teacher.contactNumber && (
                <a
                  href={`tel:${teacher.contactNumber}`}
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg mb-2"
                >
                  Call
                </a>
              )}
              {teacher.email && (
                <a
                  href={`mailto:${teacher.email}`}
                  className="block bg-blue-500 text-white px-4 py-2 rounded-lg mb-2"
                >
                  Email
                </a>
              )}
              {teacher.telegram && (
                <a
                  href={`https://t.me/${teacher.telegram}`}
                  className="block bg-purple-500 text-white px-4 py-2 rounded-lg mb-2"
                >
                  Telegram
                </a>
              )}
              {teacher.whatsapp && (
                <a
                  href={`https://wa.me/${teacher.whatsapp}`}
                  className="block bg-green-600 text-white px-4 py-2 rounded-lg mb-2"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactTeacher;
