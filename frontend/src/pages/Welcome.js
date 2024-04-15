import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/profiles/token');
  };

  const handleRegister = () => {
    navigate('/profiles/register');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button type="button" onClick={handleLogin}>Login</button>
      <button type="button" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Welcome;

