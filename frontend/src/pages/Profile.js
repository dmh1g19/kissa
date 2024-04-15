import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonMain from '../components/ButtonMain';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>

      <div>
        <ButtonMain 
          onProfileClick={() => console.log('Profile clicked')}
          onMatchClick={() => console.log('Match clicked')}
          onChatClick={() => console.log('Chat clicked')}
        />
      </div>
    </div>
  );
};

export default UserProfile;

