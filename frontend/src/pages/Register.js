import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import RegisterUser from '../api/RegisterUser';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const formattedDate = dob.split('-').reverse().join('/');
    const { email, password, confirmPassword, name, surname, gender, preference, dob, location, cat } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await RegisterUser(formData);
      navigate('/pictures');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;

