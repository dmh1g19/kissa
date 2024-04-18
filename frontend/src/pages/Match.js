import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonMain from '../components/ButtonMain';
import PatchProfile from '../api/PatchProfile';
import GetSuggestedProfile from '../api/GetSuggestedProfile';
import SkipProfile from '../api/SkipProfile';
import MatchProfile from '../api/MatchProfile';
import GetCatPictures from '../api/GetCatPictures'; 
import Loading from '../components/Loading';

const Match = () => {
  const [suggestedCatProfile, setSuggestedCatProfile] = useState(null);
  const [catPictures, setCatPictures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuggestedProfile();
  }, []); 

  //TODO: Add try catch to each one

  // A patch request prviding the location is needed before suggestions will work
  // thisis to ensure suggestions are current to the user's location
  const fetchSuggestedProfile = async () => {
    await PatchProfile();
    getNextSuggestion();
  };

  const handleSkipClick = async () => {
    await SkipProfile(suggestedCatProfile, setError);
    getNextSuggestion();
  };

  const handleMatchClick = async () => {
    const response = await MatchProfile(suggestedCatProfile);
    getNextSuggestion();
  };

  const getNextSuggestion = async () => {
    const profile = await GetSuggestedProfile();

    if (profile) {
      const images = await Promise.all(profile.image_ids.map(imageId => GetCatPictures(imageId)));
      setCatPictures(images);
      setSuggestedCatProfile(profile);
    } else {
      setError('No matching cat profile found');
    }
  };

  if (!suggestedCatProfile || !catPictures) {
    return <Loading />;
  }

return (
    <div>
      <div>
        <h1>Suggested</h1>
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        suggestedCatProfile && (
          <div>
            <div>
              <div>
                {catPictures.map((image, index) => (
                  <img 
                    key={index} 
                    src={`data:image/*;base64,${image}`} 
                    alt={`Cat Profile ${index}`} 
                    style={{ maxWidth: '250px', maxHeight: '250px' }} 
                  />
                ))}
              </div>

              <p>Name: {suggestedCatProfile.name}</p>
              <p>Age: {suggestedCatProfile.age}</p>
              <p>Bio: {suggestedCatProfile.bio}</p>
            </div>

            <div>
              <button onClick={handleSkipClick}>Skip</button>
              <button onClick={handleMatchClick}>Match</button>
            </div>
          </div>
        )
      )}
      <ButtonMain />
    </div>
  );
};

export default Match;

