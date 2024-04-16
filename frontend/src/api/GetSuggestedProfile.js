import axios from 'axios';

const GetSuggestedProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await axios.get('http://localhost:8080/match/suggest', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch suggested cat profile');
  }
};

export default GetSuggestedProfile;

