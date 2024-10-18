import React from 'react';

const Modal = ({ isOpen, onClose, teacher }) => {
  if (!isOpen) return null; // Do not render if not open

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send an email)
    alert(`Message sent to ${teacher.name}!`);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Contact {teacher.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="yourName" className="block text-sm font-bold mb-2">Your Name</label>
            <input type="text" id="yourName" className="border rounded w-full py-2 px-3" required />
          </div>
          <div className="mb-4">
            <label htmlFor="yourEmail" className="block text-sm font-bold mb-2">Your Email</label>
            <input type="email" id="yourEmail" className="border rounded w-full py-2 px-3" required />
          </div>
          <div className="mb-4">
            <label htmlFor="yourMessage" className="block text-sm font-bold mb-2">Your Message</label>
            <textarea id="yourMessage" className="border rounded w-full py-2 px-3" required></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
