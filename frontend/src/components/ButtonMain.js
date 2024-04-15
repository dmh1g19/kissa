import React from 'react';

const ButtonMain = ({ onProfileClick, onMatchClick, onChatClick }) => {
  return (
    <div>
      <button onClick={onProfileClick}>Profile</button>
      <button onClick={onMatchClick}>Match</button>
      <button onClick={onChatClick}>Chat</button>
    </div>
  );
};

export default ButtonMain;

