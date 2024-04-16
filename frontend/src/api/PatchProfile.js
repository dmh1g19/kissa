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

    await axios.patch(`http://localhost:8080/profiles/${userId}`, {
      location: [50.9469, -1.4112]
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

