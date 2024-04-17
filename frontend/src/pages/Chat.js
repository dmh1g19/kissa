import React, { useState, useEffect } from 'react';
import ButtonMain from '../components/ButtonMain';
import GetMe from '../api/GetMe';
import axios from 'axios';

const MatchPage = () => {
  const [matchDataArray, setMatchDataArray] = useState([]);
  const [profileData, setProfileData] = useState(null);
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
    if (profileData) {
      fetchMatchData(profileData.matches);
    }
  }, [profileData]);

  const fetchMatchData = async (matchIds) => {
    try {
      const token = localStorage.getItem('token');
      const promises = matchIds.map(async (matchId) => {
        const response = await axios.get(`http://localhost:8080/match/${matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      });
      const matchDataArray = await Promise.all(promises);
      setMatchDataArray(matchDataArray);
    } catch (error) {
      setError('Failed to fetch match data');
    }
  };

  return (
    <div>
      <h1>Match Details</h1>
      {error && <div>Error: {error}</div>}
      {matchDataArray.map((matchData, index) => (
        <div key={index}>
          <p>User 1: {matchData.user_1}</p>
          <p>User 2: {matchData.user_2}</p>
        </div>
      ))}
      <ButtonMain />
    </div>
  );
};

export default MatchPage;

