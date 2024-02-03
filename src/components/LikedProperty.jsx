
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const ToggleMessage = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
        color: '#333',
      }}
    >
      <CheckCircleIcon style={{ color: 'green', fontSize: '36px', marginRight: '10px' }} />
      <p style={{ margin: 0 }}>{message}</p>
      <span
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#999',
        }}
        onClick={onClose}
      >
        &#10006;
      </span>
    </div>
  );
};

const FavoriteButton = ({ propertyId, onRemove, state }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToggleMessage, setShowToggleMessage] = useState(false);
  const [toggleMessage, setToggleMessage] = useState('');
  const [navigateToFav, setNavigateToFav] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    const userId = user?._id;
    const userFavoritedProperties = JSON.parse(localStorage.getItem(`favoritedProperties_${userId}`)) || [];

    setIsFavorited(userFavoritedProperties.includes(propertyId));
    setIsLoggedIn(!!user);
  }, [propertyId, isLoggedIn]);

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      setShowToggleMessage(true);
      setToggleMessage('You are not logged in. Please log in to add to favorites.');
      onRemove(propertyId);
      return;
    }

    let response;
    const user = JSON.parse(localStorage.getItem('User'));
    const userId = user?._id;

    const Ids = {
      property_id: propertyId,
      user_id: userId,
    };
    let token = JSON.parse(localStorage.getItem('token'));
    response = await Axios.post(
      `http://localhost:7000/api/auth/addToFavorites`,
      Ids,
      {
        headers: { token: token },
      }
    )
      .then((res) => {
        setIsFavorited(res.data);

        const favoritedProperties =
          JSON.parse(localStorage.getItem(`favoritedProperties_${userId}`)) || [];
        if (!favoritedProperties.includes(propertyId)) {
          favoritedProperties.push(propertyId);
        }
        localStorage.setItem(`favoritedProperties_${userId}`, JSON.stringify(favoritedProperties));

        localStorage.setItem(`hasClickedBefore_${propertyId}`, JSON.stringify(true));

        setShowToggleMessage(true);
        setToggleMessage('Property is favorited!');
        setIsFavorited(true);

        setNavigateToFav(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeToggleMessage = () => {
    setShowToggleMessage(false);
   
  };

  return (
    <div style={{ display: 'flex', paddingLeft: '200px' }}>
      {showToggleMessage && <ToggleMessage message={toggleMessage} onClose={closeToggleMessage} />}

      {!isFavorited && isLoggedIn && (
        <button
          type="button"
          onClick={handleFavorite}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'left-justify',
            width: '10%',
            height: '50px',
          }}
        >
          Add to Favorites
        </button>
      )}

      {isFavorited && isLoggedIn && (
        <button
          onClick={() => navigate('/getlike')}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'left-justify',
            width: '10%',
            height: '50px',
            marginLeft: '10px',
            backgroundColor:'red'
          }}
        >
          Go to Favorites
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
