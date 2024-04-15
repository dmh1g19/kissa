import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadUserPic = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const token = localStorage.getItem('token');
  
      const response = await axios.post('http://localhost:8080/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response);
      navigate('/pictures/cat');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Provide an image of yourself?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {preview && (
          <div>
            <img src={preview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadUserPic;

