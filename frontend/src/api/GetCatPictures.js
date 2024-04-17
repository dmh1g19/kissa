import axios from 'axios';

const GetCatPictures = async (pid) => {
  try {
    const token = localStorage.getItem('token');
  
    const response = await axios.get(`http://localhost:8080/pictures/${pid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat profile picture');
  }
};

export default GetCatPictures;

