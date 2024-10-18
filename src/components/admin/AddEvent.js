// AddEvent.js
import React, { useState, useEffect } from 'react';
import { db } from './../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

const AddEvent = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [events, setEvents] = useState([]); // State to hold events
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Function to fetch events from Firestore
  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEvents(eventsList);
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setErrorMessage('Please upload an image.'); // Set error if no image is selected
      return;
    }

    try {
      const eventsCollection = collection(db, 'events');
      const newEventData = { date, title };

      // Upload the image to Firebase Storage
      const imageURL = await uploadImage(image); // Upload image and get URL
      newEventData.imageURL = imageURL; // Add image URL to event data

      await addDoc(eventsCollection, newEventData);
      setSuccessMessage('Event added successfully!');
      setDate('');
      setTitle('');
      setImage(null); // Reset image state
      setErrorMessage(''); // Reset error message
      fetchEvents(); // Refresh events after adding
    } catch (error) {
      console.error('Error adding event:', error);
      setErrorMessage('Error adding event. Please try again.'); // Show error message
    }
  };

  const uploadImage = async (imageFile) => {
    const storage = getStorage(); // Get Firebase Storage instance
    const storageRef = ref(storage, `events/${imageFile.name}`); // Create a storage reference
    await uploadBytes(storageRef, imageFile); // Upload the image file
    const imageURL = await getDownloadURL(storageRef); // Get the download URL
    return imageURL; // Return the image URL
  };

  const handleDelete = async (id) => {
    try {
      const eventRef = doc(db, 'events', id);
      await deleteDoc(eventRef);
      setSuccessMessage('Event deleted successfully!');
      fetchEvents(); // Refresh events after deleting
    } catch (error) {
      console.error('Error deleting event:', error);
      setErrorMessage('Error deleting event. Please try again.'); // Show error message
    }
  };

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">Add New Event</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Event Title</label>
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
            <label htmlFor="image" className="block text-sm font-bold mb-2">Event Image (Mandatory)</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              accept="image/*"
              required // Make the image input required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">
            Add Event
          </button>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Display error message */}
        </form>

        {/* Display Added Events */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <p className="mb-2">Date: {event.date}</p>
                <img src={event.imageURL} alt={event.title} className="w-full h-32 object-cover rounded mb-2" />
                <button
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-400 transition duration-300"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
