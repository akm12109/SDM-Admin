import React from 'react';
import { Link } from 'react-router-dom';

const GetHelp = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Help & Support</h1>
      
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Need Assistance? Choose an Option Below:</h2>
        
        <ul className="space-y-4">
          <li>
            <Link to="/contact-admin" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Contact Administrator School
            </Link>
          </li>
          <li>
            <Link to="/contact-class-teacher" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Contact Class Teacher
            </Link>
          </li>
          <li>
            <Link to="/developer-support" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Contact Developer
            </Link>
          </li>
          <li>
            <Link to="/register" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Register New Account
            </Link>
          </li>
          <li>
            <Link to="/admit-student" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Admit Yourself/Child as a Student
            </Link>
          </li>
          <li>
            <Link to="/anything-else" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Anything Else
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Know About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-admission" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Contact For Admission
            </Link>
          </li>
          <li>
            <Link to="/locate-us" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Locate Us
            </Link>
          </li>
          <li>
            <Link to="/lost-id-password" className="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Lost Your ID/Password
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GetHelp;
