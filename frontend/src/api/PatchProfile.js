import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const PatchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('sub');

    if (!token) {
      throw new Error('Token not found in local storage');
    }

    if (!userId) {
      throw new Error('User ID not found in local storage');
    }

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const suffix = `/profiles/${userId}` 
    await axios.patch(`${baseURL}${suffix}`, {
      location: [latitude, longitude] // Patch the user's profile with the current location
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export default PatchProfile;

