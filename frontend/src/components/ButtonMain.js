import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonMain = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profiles/me');
  };

  const handleMatchClick = () => {
    navigate('/profiles');
  };

  const handleChatClick = () => {
    console.log("Clicked the chat button")
  };

  return (
    <div>
      <button onClick={handleProfileClick}>Profile</button>
      <button onClick={handleMatchClick}>Meet</button>
      <button onClick={handleChatClick}>Chat</button>
    </div>
  );
};

export default ButtonMain;

