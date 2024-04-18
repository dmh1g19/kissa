import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const SkipProfile = async (suggestedCatProfile, setError) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const suffix = '/match/skip'
    await axios.post(`${baseURL}${suffix}`, {
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

