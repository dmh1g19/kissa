import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const GetMe = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const suffix = '/profiles/me'
    const response = await axios.get(`${baseURL}${suffix}`, {
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

