import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const MatchProfile = async (suggestedCatProfile) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const suffix = '/match/confirm'
    await axios.post(`${baseURL}${suffix}`, {
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

