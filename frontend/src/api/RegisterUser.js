import axios from 'axios';
import { baseURL, timeout, headers } from './ApiConfig';

const RegisterUser = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const formattedDate = dob.split('-').reverse().join('/');
    const { email, password, confirmPassword, name, surname, gender, preference, dob, location, cat } = formData;

    const suffix = '/profiles/register';
    const response = await axios.post(`${baseURL}${suffix}`, {
      email,
      password,
      name,
      surname,
      gender,
      preference,
      dob: formattedDate,
      age_range: [18, 25],
      profile_pic_url: '',
      location,
      cat,
    });

    const { access_token, sub } = response.data;

    localStorage.setItem('sub', sub);
    localStorage.setItem('token', access_token);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat profile picture');
  }
};

export default RegisterUser;

