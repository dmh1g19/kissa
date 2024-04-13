import React, { useState, useEffect } from 'react';
import axios from 'axios';

  const Register = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      gender: '',
      preference: '',
      dob: '', 
      location: [],
      cat: { 'name': '',
             'age': '',
             'breed': '',
             'sex': '',
             'bio': ''
      },
      profile_pic_url: ''
  });
  
  const { 
    email, 
    password, 
    confirmPassword, 
    name,
    surname,
    gender,
    preference,
    dob,
    location,
    cat
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target; 
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevFormData => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = dob.split('-').reverse().join('/');
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/profiles/register', {
        email,
        password,
        name,
        surname,
        gender,
        preference,
        dob: formattedDate,
        age_range: [18, 25],
        profile_pic_url: 'TEMP',
        location,
        cat,
      });

      console.log(response);
    } catch (err) {
      console.error(err); 
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setFormData(prevFormData => ({ ...prevFormData, location: [latitude, longitude] }));
          },
          error => {
            console.error(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation(); 
  }, []);

  return (
    <div>
    <h2>How can we call you?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type='email' name='email' value={email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type='password' name='password' value={password} onChange={handleChange} minLength='6' required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} minLength='6' required />
        </div>
        <div>
          <label>Name:</label>
          <input type='text' name='name' value={name} onChange={handleChange} minLength='2' required />
        </div>
        <div>
          <label>Surname:</label>
          <input type='text' name='surname' value={surname} onChange={handleChange} minLength='2' required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <input type="radio" id="male" name="gender" value="male" onChange={handleChange} checked={gender === 'male'} />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" value="female" onChange={handleChange} checked={gender === 'female'} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label>Preference:</label>
          <div>
            <input type="radio" id="male-pref" name="preference" value="male" onChange={handleChange} checked={preference === 'male'} />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female-pref" name="preference" value="female" onChange={handleChange} checked={preference === 'female'} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label>Pet name:</label>
          <input type="text" name="cat.name" value={cat.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Pet age:</label>
          <input type="number" name="cat.age" value={cat.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Pet breed:</label>
          <input type="text" name="cat.breed" value={cat.breed} onChange={handleChange} required />
        </div>
        <div>
          <label>Pet Preference:</label>
          <div>
            <input type="radio" id="pet-male-sex" name="cat.sex" value="male" onChange={() => setFormData({ ...formData, cat: { ...cat, sex: true } })} checked={cat.sex === true} />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="pet-female-sex" name="cat.sex" value="female" onChange={() => setFormData({ ...formData, cat: { ...cat, sex: false } })} checked={cat.sex === false} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label>Pet bio:</label>
          <textarea name="cat.bio" value={cat.bio} onChange={handleChange} rows={4}  cols={50} required/>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;

