// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import DeveloperSupport from './components/DeveloperSupport';
import ListPage from './components/ListPage';
import GetHelp from './components/GetHelp';
import ContactClassTeacher from './components/ContactClassTeacher';
import TeacherPanel from './components/TeacharPanel';
import AddEvent from './components/admin/AddEvent';
import SlidePanel from './components/admin/SlidePhoto';
import Layout from './Layout'; // Import the Layout component

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home and public routes */}
          <Route path="/" element={<AdminPanel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/developer-support" element={<DeveloperSupport />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/gethelpinloggin" element={<GetHelp />} />
          <Route path="/t--p" element={<TeacherPanel />} />
          <Route path="/contact-class-teacher" element={<ContactClassTeacher />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/photos-add" element={<SlidePanel />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
