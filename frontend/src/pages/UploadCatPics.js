import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadCatPics = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:8080/pictures/cat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response);
      navigate('/profiles/me');
    } catch (err) {
      setError('Failed to upload cat pictures');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Cat Pictures</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCatPics;

