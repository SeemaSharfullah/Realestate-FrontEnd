
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const FeedbackContainer = styled('div')({
 
  flexDirection: 'column',
  alignItems: 'center',
  padding: (theme) => theme.spacing(4),
  maxWidth: '800px', // Increase the maxWidth to your desired value
  margin: 'auto',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const FeedbackInput = styled(TextField)({
  marginBottom: (theme) => theme.spacing(2),
});



const SubmitButton = styled(Button)({
    width: '100%',
    backgroundColor: 'midnightblue', // Set your desired button background color to black
    color: '#fff', // Set the text color to white
    '&:hover': {
      backgroundColor: '#333', // Change color on hover
    },
  });
  
  const StyledDialog = styled(Dialog)({
    '& .MuiDialogTitle-root': {
      backgroundColor: 'midnightblue', // Set dialog title background color to black
      color: '#fff', // Set dialog title text color to white
    },
    '& .MuiDialogContent-root': {
      padding: (theme) => theme.spacing(3),
    },
  });


const FeedbackForm = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const user = JSON.parse(localStorage.getItem('User'));
  const userId = user?._id;

  const submitFeedback = async () => {
    try {
      const currentDate = new Date();
      let token = JSON.parse(localStorage.getItem('token'));
      await axios.post(
        `http://localhost:7000/api/auth/feedback`,
        {
          userId: userId,
          feedback: feedback,
          date: currentDate.toISOString(),
        },
        {
          headers: { token: token },
        }
      );
      console.log('Feedback submitted successfully');
      setFeedback('');
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    onClose();
  };

  return (
    <StyledDialog open onClose={onClose}>
      <DialogTitle>Give Feedback</DialogTitle>
      <DialogContent>
        <FeedbackContainer>
          <FeedbackInput
            label="Feedback"
            multiline
            rows={5}
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
          />
          <SubmitButton variant="contained" onClick={submitFeedback}>
            Submit Feedback
          </SubmitButton>
          {showSuccessMessage && (
            <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
              Feedback submitted successfully!
            </Alert>
          )}
        </FeedbackContainer>
      </DialogContent>
    </StyledDialog>
  );
};

export default FeedbackForm;
