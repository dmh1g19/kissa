import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const GetCatPictures = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const suffix = `/pictures/${profileData.profile_pic_url}`;
    const response = await axios.get(`${baseURL}${suffix}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    throw new Error('Failed to fetch cat profile picture');
  }
};

export default GetCatPictures;

