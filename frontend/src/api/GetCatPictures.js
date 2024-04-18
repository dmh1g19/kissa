import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const GetCatPictures = async (pid) => {
  try {
    const token = localStorage.getItem('token');

    const suffix = `/pictures/${pid}`;
    const response = await axios.get(`${baseURL}${suffix}`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      },
      timeout: timeout, 
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat profile picture');
  }
};

export default GetCatPictures;

