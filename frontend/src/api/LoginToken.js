import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const LoginToken = async (formData, config) => {
  try {
    const suffix = '/profiles/token'
    const response = await axios.post(`${baseURL}${suffix}`, formData, config);
    
    if (response.data && response.data.access_token) {
      const tokenParts = response.data.access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.sub;

      localStorage.setItem('sub', userId);
      localStorage.setItem('token', response.data.access_token);

      console.log("Client received token: " + response.data.access_token)
      console.log("Client received user profile id: " + userId)
    } else {
      throw new Error('Failed to obtain token');
    }
  } catch (error) {
    console.log("ERROR: " + error)
  }
};

export default LoginToken;

