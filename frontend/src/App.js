import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import UserProfile from './pages/Profile'; 
import UploadUserPic from './pages/UploadUserPic';
import UploadCatPics from './pages/UploadCatPics';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/profiles/register" element={<Register />} />
        <Route path="/pictures" element={<UploadUserPic />} />
        <Route path="/pictures/cat" element={<UploadCatPics />} />
        <Route path="/profiles/me" element={<UserProfile />} />
        <Route path="/profiles/token" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

