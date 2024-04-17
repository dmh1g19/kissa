import axios from 'axios';

const MatchProfile = async (suggestedCatProfile) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found in local storage');
    }

    await axios.post('http://localhost:8080/match/confirm', {
      oid: suggestedCatProfile.owner_id 
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw new Error('Failed to confirm match');
  }
};

export default MatchProfile;

