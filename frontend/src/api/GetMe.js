import axios from 'axios';

const GetMe = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await axios.get('http://localhost:8080/profiles/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile data');
  }
};

export default GetMe;

