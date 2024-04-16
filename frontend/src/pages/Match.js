import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonMain from '../components/ButtonMain';
import PatchProfile from '../api/PatchProfile';
import GetSuggestedProfile from '../api/GetSuggestedProfile';

const Match = () => {
  const [suggestedCatProfile, setSuggestedCatProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchSuggestedProfile = async () => {
    try {
      await PatchProfile();
      const profile = await GetSuggestedProfile();

      if (profile) {
        setSuggestedCatProfile(profile);
      } else {
        setError('No matching cat profile found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSuggestedProfile();
  }, []); 

  const handleMatchClick = async () => {
    fetchSuggestedProfile(); 
  };

  const handleSkipClick = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found in local storage');
      }

      await axios.post('http://localhost:8080/match/skip', {
        oid: suggestedCatProfile.owner_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchSuggestedProfile(); // Fetch next suggested profile after skipping
    } catch (error) {
      setError('Failed to skip suggested cat profile');
    }
  };

  return (
    <div>
      <div>
        <h1>Suggested</h1>
      </div>
      {error && <div>Error: {error}</div>}
      {suggestedCatProfile && (
        <div>
          <p>Name: {suggestedCatProfile.name}</p>
          <p>Bio: {suggestedCatProfile.bio}</p>
          <p>Age: {suggestedCatProfile.age}</p>
        </div>
      )}
      <div>
        <button onClick={handleSkipClick}>Skip</button>
        <button>Match</button>
      </div>
      <ButtonMain />
    </div>
  );
};

export default Match;

