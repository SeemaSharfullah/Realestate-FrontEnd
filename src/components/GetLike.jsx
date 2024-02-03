import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import Button from MUI

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const LikeList = (state) => {
    const [likedProperties, setLikedProperties] = useState([]);
    const [user, setuser] = useState()
    const navigate=useNavigate()
    const [forceUpdate, setForceUpdate] = useState(false);
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        setuser(currentUser)
    }, [])
    let userId = user?._id

    useEffect(() => {
        const fetchLikedProperties = async () => {
            try {
                let token= JSON.parse(localStorage.getItem('token'))
                const response = await axios.get(`http://localhost:7000/api/auth/getFavoriteProperties`, {headers:{"token":token}})// Replace with your actual API endpoint
                    .then((res) => {
                        setLikedProperties(res.data)
                    })
            } catch (error) {
                console.error('Error fetching liked properties:', error);
            }
        };

        fetchLikedProperties();
    }, [forceUpdate]);
    console.log(likedProperties)
    let filteredLikes = likedProperties?.filter((i) => i.user_id == userId)
    console.log(filteredLikes);


    
    const removeProperty = async (propertyId) => {
        try {
            let token= JSON.parse(localStorage.getItem('token'))
          const response = await axios.delete('http://localhost:7000/api/auth/removeFromFavorites', {headers:{"token":token},
            
           
              data: {
                property_id: propertyId,
                user_id: userId,
              },
             
            });
      
          if (response.data.success) {
            
            console.log('Property removed from favorites');
            
            setLikedProperties(prevProperties =>
                prevProperties.filter(property => property.property_id !== propertyId)
              );
              setForceUpdate((prev) => !prev);
              const favoritedProperties = JSON.parse(localStorage.getItem(`favoritedProperties_${userId}`)) || [];
      localStorage.setItem(
        `favoritedProperties_${userId}`,
        JSON.stringify(favoritedProperties.filter((id) => id !== propertyId))
      );
       
            } else {
              console.error('Error removing property from favorites:', response.data.message);
            }
        } catch (error) {
          console.error('Error removing property from favorites:', error.message);
        }
       
    }
      
   
    
    return (
        <div>
            <Header/>
            <h3 style={{ textAlign: 'center' }}>Liked Properties</h3>
            {filteredLikes && filteredLikes.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'red' }}>Liked list is empty.</p>
      ) : (
            <TableContainer component={Paper} style={{width: '80%', margin: '0 auto'}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sl no</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLikes?.map((i, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row"><img src={`http://localhost:7000/uploads/${i.property_id?.images[0]}`} style={{ width: '150px' }} alt='property image' /></StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{i?.property_id?.name}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{i?.property_id?.type}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{i?.property_id?.regularPrice}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{i?.property_id?.address}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeProperty(i?.property_id?._id)}
                  >
                    Remove
                  
                  </Button>
                
                </StyledTableCell>
                
                     </StyledTableRow>
                      
                            )
                        })}
                        
                    </TableBody>
                </Table>
            </TableContainer>
             )}
           <Container style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          component={Link}
          to="/view"
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{ backgroundColor: 'white' }}
        >
          Go Back
        </Button>
        
      </Container>
        </div>
    );
};

export default LikeList;
