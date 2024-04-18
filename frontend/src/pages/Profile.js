import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetMe from '../api/GetMe';
import GetProfilePicture from '../api/GetProfilePicture';
import ButtonMain from '../components/ButtonMain';
import Loading from '../components/Loading';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await GetMe();
        setProfileData(data);
      } catch (error) {
        setError('Failed to fetch profile data');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    async function fetchPicture() {
      try {

        const response = await GetProfilePicture(profileData);
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
    return <Loading />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
      <p>Matches left: {profileData.matches_allowed}</p>
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

