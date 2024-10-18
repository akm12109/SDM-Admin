// SlidePanel.js
import React, { useState, useEffect } from 'react';
import { db } from './../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const SlidePanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [slides, setSlides] = useState([]); // State to hold slides
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch slides from Firestore
  const fetchSlides = async () => {
    const slidesCollection = collection(db, 'slides');
    const slidesSnapshot = await getDocs(slidesCollection);
    const slidesList = slidesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSlides(slidesList);
  };

  useEffect(() => {
    fetchSlides(); // Fetch slides when component mounts
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setErrorMessage('Please upload an image.');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `slides/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(storageRef);

      const slidesCollection = collection(db, 'slides');
      await addDoc(slidesCollection, {
        title,
        description,
        imageURL,
      });

      setSuccessMessage('Slide added successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
      fetchSlides(); // Refresh slides after adding
    } catch (error) {
      console.error('Error adding slide:', error);
      setErrorMessage('Error adding slide. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const slideRef = doc(db, 'slides', id);
      await deleteDoc(slideRef);
      setSuccessMessage('Slide deleted successfully!');
      fetchSlides(); // Refresh slides after deleting
    } catch (error) {
      console.error('Error deleting slide:', error);
      setErrorMessage('Error deleting slide. Please try again.');
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center text-white">Admin Panel: Add New Slide</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">Slide Image (Mandatory)</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition duration-300">
            Add Slide
          </button>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>

        {/* Display Uploaded Slides */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center text-white mb-4">Uploaded Slides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slides.map((slide) => (
              <div key={slide.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-xl font-bold mb-2">{slide.title}</h4>
                <p className="mb-2">{slide.description}</p>
                <img src={slide.imageURL} alt={slide.title} className="w-full h-32 object-cover rounded mb-2" />
                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-400 transition duration-300"
                    onClick={() => handleDelete(slide.id)}
                  >
                    Delete
                  </button>
                  <button className="bg-yellow-500 text-white font-bold py-1 px-3 rounded hover:bg-yellow-400 transition duration-300">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlidePanel;
