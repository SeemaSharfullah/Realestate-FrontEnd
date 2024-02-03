import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';




const ToggleMessage = ({ message, onClose }) => {
  let iconComponent;

  if (message === 'Property is booked!') {
    // Display CheckCircleIcon for successful booking
    iconComponent = <CheckCircleIcon style={{ color: 'green', fontSize: '36px', marginBottom: '10px' }} />;
  } else if (message === 'This property is already booked!') {
    // Display CancelIcon for already booked property
    iconComponent = <CancelIcon style={{ color: 'red', fontSize: '36px', marginBottom: '10px' }} />;
  }
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
         {iconComponent}
        <p>{message}</p>
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
          &#10006; {/* HTML entity for the "X" character */}
        </span>
      </div>
    );
  };

const BookingButton = ({ propertyId, onRemove}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [showToggleMessage, setShowToggleMessage] = useState(false);
  const [toggleMessage, setToggleMessage] = useState('');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visitMessage, setVisitMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    const userId = user?._id;
    const userBookedProperties = JSON.parse(localStorage.getItem(`booked_${userId}`)) || [];

    setIsBooked(userBookedProperties.includes(propertyId));
    setIsLoggedIn(!!user);
  }, [propertyId, isLoggedIn]);
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  const handleBook = async () => {
    if (!isLoggedIn) {
      setShowToggleMessage(true);
      setToggleMessage('You are not logged in. Please log in to book this property.');
   
      return;
    }

    
    const user = JSON.parse(localStorage.getItem('User'));
  const userId = user?._id;
  const userBookedProperties = JSON.parse(localStorage.getItem(`booked_${userId}`)) || [];

  if (userBookedProperties.includes(propertyId)) {
    // Property is already booked
    setShowToggleMessage(true);
    setToggleMessage('This property is already booked!');
    return;
  }


    let response;
   

    

    const bookingData = {
      propertyId: propertyId,
      userId: userId,
      bookingDate: selectedDate,
      visitMessage,
      // Add additional booking details as needed
    };

    
    try {
      let token= JSON.parse(localStorage.getItem('token'))
      response = await Axios.post(`http://localhost:7000/api/auth/addToBook`, bookingData,{
        headers:{'token':token,
    }
      });
    
       setIsBooked(response.data);

      // Update the local storage with the booked property
      const bookedProperties = JSON.parse(localStorage.getItem(`booked_${userId}`)) || [];
      if (!bookedProperties.includes(propertyId)) {
        bookedProperties.push(propertyId);
      }
     
       
        localStorage.setItem(`booked_${userId}`, JSON.stringify(bookedProperties));

        
        
        setShowToggleMessage(true);
        setToggleMessage('Appointment Request Submitted!');
        setIsBooked(true);
  
      
        setBookingDialogOpen(false);
    
       

     } catch (error) {
      console.error('Error booking property:', error);
    }
  };

  const closeToggleMessage = () => {
    setShowToggleMessage(false);
  };

  return (
    <div style={{ display: 'flex', paddingLeft: '200px' }}>
      {showToggleMessage && <ToggleMessage message={toggleMessage} onClose={closeToggleMessage} />}

      { isLoggedIn && (
        <>
          <button
            onClick={() => setBookingDialogOpen(true)}
            style={{
              backgroundColor: '#2196F3', // Blue color
              color: 'white',
              border: 'none',
              borderRadius: '5px', // Rounded border
              cursor: 'pointer',
              textAlign: 'left-justify',
              marginTop:'15px',
              width: '70%',
              height: '50px',
              backgroundColor:'#1a237e'
            }}
          >
           Book Appointment
          </button>
          <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)}>
            <DialogTitle>Book Property</DialogTitle>
            <DialogContent>
              <TextField
                label="Select Date"
                type="date"
                value={selectedDate.toISOString().split('T')[0]} 
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                fullWidth
              />
              <TextField
                label="Visit Message"
                multiline
                rows={3}
                fullWidth
                value={visitMessage}
                onChange={(e) => setVisitMessage(e.target.value)}
                margin="normal"
              />
              <div style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleBook}>
                  Book Property
                </Button>
                
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default BookingButton;
