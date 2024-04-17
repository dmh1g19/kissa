import axios from 'axios';

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

    // Get user's current location using Geolocation API
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    // Patch the user's profile with the current location
    await axios.patch(`http://localhost:8080/profiles/${userId}`, {
      location: [latitude, longitude]
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

