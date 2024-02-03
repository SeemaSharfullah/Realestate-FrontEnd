import React, { useState,useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F5F5F5', // Light gray background color
  border: '2px solid #424242', // Dark gray border color
  boxShadow: 24,
  p: 4,
  borderRadius: '10px', // Rounded corners

  };

  const buttonStyle = {
   
    backgroundColor: '#FF6347', // Coral color for the button
    color: 'white', // White text color
    '&:hover': {
      backgroundColor: '#FF4500', // Adjust the color on hover
    },
  };
  const closeButtonStyle = {
    marginLeft: 'auto', // Push the close button to the right
    backgroundColor: '#4CAF50', // Green color for the close button
    color: 'white', // White text color
  };
  const textStyles = {
    color: '#424242', // Dark gray text color
  fontSize: '16px', // Adjust the font size
  fontWeight: 'bold', // Apply bold font weight
  marginBottom: '10px', // Add spacing at the bottom
  };
export default function Delete({selectUser,DeleteClose,value,setValue,setconDelete}) {
  const Navigate=useNavigate()
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
const Delete=async(item)=>{

DeleteClose()

let token= JSON.parse(localStorage.getItem('token'))
await Axios.delete(`http://localhost:7000/api/listing/delete/${selectUser._id}`,
{
  headers:{'token':token,
 
},
},
)

    .then((res)=>{
    const val = res.data
    setconDelete((prev)=>!prev)
    
     setTimeout(() => {
      setDeleteSuccess(false);
      Navigate('/view',{ state: { successMessage: 'Property deleted successfully!' } }); // Navigate after the delay
    },);
    })
    .catch((error)=>{  
      console.error('View Error', error)
    })
   
    }
  return (
    <>
   
    
        <Card sx={style}>
      
      
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
    
        </Typography>
        <Typography variant="body2" sx={textStyles}>
        Are you sure you want to delete {selectUser.name}'s Property detail?
        </Typography>
      </CardContent>
     
       <CardActions > 
        <Button
          size="small"
          onClick={() => Delete(selectUser)}
          style={buttonStyle} // Apply the button style
        >
          DELETE
        </Button>
        <Button size="small" onClick={DeleteClose} sx={closeButtonStyle}>
          CLOSE
        </Button>
      </CardActions>
    
    </Card>
    </>
    
  );
  
}