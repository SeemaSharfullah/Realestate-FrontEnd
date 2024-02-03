import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Title from './Title';
import Axios from 'axios';  



 function Design({ type = '' }) {
 
  const [total, setTotal] = useState(0);



  useEffect(() => {
   
    const fetchData = async () => {
      try {
        let endpoint = '';
  
        if (type === 'properties') {
          endpoint = 'http://localhost:7000/api/listing/get';
          const token = JSON.parse(localStorage.getItem('token'));
          const responseUsers = await Axios.get(endpoint, {
            headers: {
              'token': token
            }
            });
            setTotal(responseUsers.data.length);
        } else if (type === 'users') {
          endpoint = 'http://localhost:7000/api/user/';
          const token = JSON.parse(localStorage.getItem('token'));
          const responseUsers = await Axios.get(endpoint, {
            headers: {
              'token': token
            }
          });
          
          setTotal(responseUsers.data.length);
        } else if (type === 'bookedProperties') {
          endpoint = 'http://localhost:7000/api/auth/';
          const token = JSON.parse(localStorage.getItem('token'));
          const responseBooks = await Axios.get(endpoint, {
            headers: {
              "token": token
            }
          });
    
          setTotal(responseBooks.data.length);
        }else if (type === 'feedbacks') {
         
          endpoint = 'http://localhost:7000/api/auth/backget';
          const token = JSON.parse(localStorage.getItem('token'));
          const responseFeedbacks = await Axios.get(endpoint, {
            headers: {
              "token": token
            }
          });
          setTotal(responseFeedbacks.data.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      
    };
  
    fetchData();
  }, [type]);
  return (
    <>
      

      <Title>{`Total ${type.charAt(0).toUpperCase() + type.slice(1)}`}</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
      
    </>
  );
}
export default Design;