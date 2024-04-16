import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonMain from '../components/ButtonMain';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }

        const response = await axios.get('http://localhost:8080/profiles/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        setError('Failed to fetch profile data');
      }
    }

    fetchUserProfile();
  }, []);

  useEffect(() => {
    async function fetchPicture() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/pictures/${profileData.profile_pic_url}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPictureData(response.data);
      } catch (error) {
        setError('Failed to fetch picture data');
      }
    }

    if (profileData) {
      fetchPicture();
    }
  }, [profileData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData || !pictureData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      <div style={{ maxWidth: '250px', maxHeight: '250px', overflow: 'hidden' }}>
        <img
          src={`data:image/jpeg;base64,${pictureData}`}
          alt="User"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      <div>
        <ButtonMain />
      </div>
    </div>
  );
};

export default UserProfile;

