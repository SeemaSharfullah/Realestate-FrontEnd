import React, { useState,useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function Delete({selectUser,DeleteClose,value,setValue,setconDelete}) {
  const Navigate=useNavigate()
  const params=useParams();
  const userId=params.id;
const Delete=async(item)=>{

DeleteClose()


let token= JSON.parse(localStorage.getItem('token'))
Axios.delete(`http://localhost:7000/api/user/delete/${userId}`,{
  headers: {
    'token': token
  }
})

    .then((res)=>{
    const val = res.data
    setconDelete((prev)=>!prev)
     //res.data is syntax
    
    })
    .catch((error)=>{  
      console.error('View Error', error)
    })
     localStorage.removeItem('token');
    localStorage.removeItem('User');
   
    Navigate('/')
  
    }
  return (
    
        <Card sx={style}>
      
      
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
    
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Are you sure you want to delete {selectUser.name}'s Account?
        </Typography>
      </CardContent>
      <CardActions>
    
             <Button
     
     size="small"onClick={()=>Delete(selectUser)} >DELETE</Button>
        <Button size="small" onClick={DeleteClose}>CLOSE</Button>
      </CardActions>
    
    </Card>
  );
}