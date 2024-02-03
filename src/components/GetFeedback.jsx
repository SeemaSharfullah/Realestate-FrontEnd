import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';



const CARDS_PER_ROW = 3;
const MAX_ROWS_TO_DISPLAY = 2;
const INITIAL_ROWS_TO_DISPLAY = 2;
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function FeedbackCard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [numRowsToShow, setNumRowsToShow] = useState(INITIAL_ROWS_TO_DISPLAY);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        let token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get(`http://localhost:7000/api/auth/backget`, {
          headers: { "token": token }
        });

        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleReadMore = (feedback) => {
    setSelectedFeedback(feedback);
  };
  const handleCloseDetails = () => {
    setSelectedFeedback(null);
  };

  const handleDeleteFeedback = async (id) => {
    
    try {
      let token = JSON.parse(localStorage.getItem('token'));
      await axios.delete(
        `http://localhost:7000/api/auth/deletefeedback/${id}`,
        {
          data: { feedback: id }, // Send feedback in the request body
          headers: {
            'token': token
          }
        }
      );

      // Remove the deleted feedback from the state
      setFeedbackList((prevFeedback) => prevFeedback.filter((feedback) => feedback._id !== id));


      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, );
      setSelectedFeedback(null);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };
 

  const handleShowMore = () => {
    setNumRowsToShow((prevNum) => Math.min(prevNum + 1, Math.ceil(feedbackList.length / CARDS_PER_ROW)));
  };

  const handleShowLess = () => {
    setNumRowsToShow(INITIAL_ROWS_TO_DISPLAY);
  };
  return (
    <div
    style={{
       backgroundImage: 'url(https://wallpaperheart.com/wp-content/uploads/2018/04/background-pictures.jpg)', // Replace with the path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {deleteSuccess && (
        <Alert
          severity="success"
          sx={{
            width: '350px',
            height:'80px'
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setDeleteSuccess(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          Feedback successfully deleted!
        </Alert>
      )}
      
      
      {feedbackList.slice(0, numRowsToShow * CARDS_PER_ROW).map((feedback, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            width: 300,
            height: 300,
            borderRadius: 10,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            overflow: 'hidden', 
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <CardContent>
          <Box
              component="img"
              src={`http://localhost:7000/uploads/${feedback?.userId?.profileImage}`}
              alt="user"
              sx={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }}
            />
            <Typography variant="h6">{feedback?.userId?.username}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {new Date(feedback.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#2196F3' }}>
            {feedback.feedback.length > 50 ? `${feedback.feedback.slice(0, 50)}...` : feedback.feedback}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center',flexDirection: 'column' }}>
            
           
            <Button onClick={() => handleReadMore(feedback)}  sx={{ marginLeft: 'auto', color: '#fff', backgroundColor: 'black',marginTop: 5 }}>Read More</Button>
          </CardActions>
        </Card>
      ))}
      

    </Box>
    {feedbackList.length > numRowsToShow * CARDS_PER_ROW && (
        <Button onClick={handleShowMore} sx={{ color: '#fff', backgroundColor: 'black', marginTop: 5 }}>
          Show More
        </Button>
      )}

      {numRowsToShow > INITIAL_ROWS_TO_DISPLAY && (
        <Button onClick={handleShowLess} sx={{ color: '#fff', backgroundColor: 'black', marginTop: 5 }}>
          Show Less
        </Button>
      )}
    <Modal
        open={!!selectedFeedback}
        onClose={handleCloseDetails}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: 400, textAlign: 'center', border: '2px solid #000', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
          <CardContent>
            <Box
              component="img"
              src={`http://localhost:7000/uploads/${selectedFeedback?.userId?.profileImage}`}
              alt="user"
              sx={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
              {selectedFeedback?.userId?.username}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, color: '#757575' }}>
              {new Date(selectedFeedback?.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
              {selectedFeedback?.feedback}
            </Typography>
          </CardContent>
          <CardActions>
          <IconButton
              aria-label="delete"
              onClick={() => handleDeleteFeedback(selectedFeedback?._id)}
            >
              <DeleteIcon />
            </IconButton>
            <Button onClick={handleCloseDetails} color="primary" sx={{ marginLeft: 'auto', color: '#fff', backgroundColor: '#2196F3' }}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Modal>
</div>
  );
}
