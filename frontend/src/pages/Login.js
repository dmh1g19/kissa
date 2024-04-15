import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const response = await axios.post('http://localhost:8080/profiles/token', formData, config);
      
      if (response.data && response.data.access_token) {
        const tokenParts = response.data.access_token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.sub;

        localStorage.setItem('sub', userId);
        localStorage.setItem('token', response.data.access_token);

        console.log("Client received token: " + response.data.access_token)
        console.log("Client received user profile id: " + userId)

        navigate('/profiles/me');
      
      } else {
        throw new Error('Failed to obtain token');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.log("ERROR: " + error)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

