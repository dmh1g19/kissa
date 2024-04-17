import axios from 'axios';

const SkipProfile = async (suggestedCatProfile, setError) => {
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
  } catch (error) {
    setError('Failed to skip suggested cat profile');
  }
};

export default SkipProfile;

