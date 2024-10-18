import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc, query, getDocs } from 'firebase/firestore';

const ListSection = ({ title, items, handleDelete, handleDeleteAll, itemType }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="card-container">
      {items.map(item => (
        <div key={item.id} className="card">
          <h4>{item.title || 'Notice'}</h4>
          <p>{item.message || `Time: ${new Date(item.startTime).toLocaleString()}`}</p>
          <button className="delete-btn" onClick={() => handleDelete(itemType, item.id)}>Delete</button>
        </div>
      ))}
    </div>
    <button className="delete-all-btn" onClick={() => handleDeleteAll(itemType)}>Delete All {title}</button>
  </div>
);

const ListPage = () => {
  const [notices, setNotices] = useState([]);
  const [classes, setClasses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [homework, setHomework] = useState([]);
  const [testimonials, setTestimonials] = useState([]); // State for testimonials
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCollection = (collectionName, setter) => {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      setter(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false); // Stop loading when data is fetched
    });
  };

  useEffect(() => {
    const unsubscribeNotices = fetchCollection('notices', setNotices);
    const unsubscribeClasses = fetchCollection('classes', setClasses);
    const unsubscribeVideos = fetchCollection('videos', setVideos);
    const unsubscribeHomework = fetchCollection('homework', setHomework);
    const unsubscribeTestimonials = fetchCollection('testimonials', setTestimonials); // Fetch testimonials
    
    return () => {
      unsubscribeNotices();
      unsubscribeClasses();
      unsubscribeVideos();
      unsubscribeHomework();
      unsubscribeTestimonials(); // Cleanup for testimonials
    };
  }, []);

  const handleDelete = async (collectionName, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleDeleteAll = async (collectionName) => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docItem) => {
          await deleteDoc(doc(db, collectionName, docItem.id));
        });
        alert('All items deleted successfully!');
      } catch (error) {
        console.error('Error deleting all items:', error);
      }
    }
  };

  return (
    <div>
      <style>
        {`
          .list-page-container {
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
          }
          .section {
            margin-bottom: 40px;
          }
          .section h2 {
            color: #343a40;
            margin-bottom: 20px;
            font-size: 1.5rem;
          }
          .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
          .card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;
            position: relative;
          }
          .card h4 {
            color: #007bff;
            font-size: 1.2rem;
            margin-bottom: 10px;
          }
          .card p {
            color: #6c757d;
            margin-bottom: 10px;
          }
          .delete-btn, .delete-all-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
          }
          .delete-all-btn {
            margin-top: 20px;
          }
          .loading {
            text-align: center;
            font-size: 1.5rem;
            color: #007bff;
          }
        `}
      </style>

      <div className="list-page-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <ListSection 
              title="Notices"
              items={notices}
              handleDelete={handleDelete}
              handleDeleteAll={handleDeleteAll}
              itemType="notices"
            />
            <ListSection 
              title="Classes"
              items={classes}
              handleDelete={handleDelete}
              handleDeleteAll={handleDeleteAll}
              itemType="classes"
            />
            <ListSection 
              title="Videos"
              items={videos}
              handleDelete={handleDelete}
              handleDeleteAll={handleDeleteAll}
              itemType="videos"
            />
            <ListSection 
              title="Homework"
              items={homework}
              handleDelete={handleDelete}
              handleDeleteAll={handleDeleteAll}
              itemType="homework"
            />
            <ListSection 
              title="Testimonials" // New section for testimonials
              items={testimonials}
              handleDelete={handleDelete}
              handleDeleteAll={handleDeleteAll}
              itemType="testimonials" // New item type
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ListPage;
