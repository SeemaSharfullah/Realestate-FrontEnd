import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import BookingButton from './Booked';
import Header from './Header'
import Footer from './Footer'
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
  '&.adminStatus': {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'blue',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BookedList = () => {
  const [bookedProperties, setBookedProperties] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('User'));
    setUser(currentUser);
  }, []);
  
  const userId = user?._id;
  
  useEffect(() => {
    const fetchBookedProperties = async () => {
      try {
        let token= JSON.parse(localStorage.getItem('token'))
        const response = await axios.get(`http://localhost:7000/api/auth/getBook`,{headers:{"token":token}})
      
         setBookedProperties(response.data);
      } catch (error) {
        console.error('Error fetching booked properties:', error);
      }
    };
  
    fetchBookedProperties();
  }, [forceUpdate]);
  

  
  
  let filteredBooks = bookedProperties?.filter((booking) => booking.userId === userId);
  

  
  
 

  
 
  
 

     const CancelBooking = async (id, status) => {
   
          
    
        try {
          let token= JSON.parse(localStorage.getItem('token'))
          const response = await axios.patch(`http://localhost:7000/api/auth/removeBook/${id}`, {
            propertyId: id,
  status: status
}, {
  headers: {
    'token': token
  }
});
    
          if (response.data.success) {
            console.log('Booking canceled successfully');
            setBookedProperties(bookedProperties.filter((property) => property.propertyId.id !== id));
         
            setForceUpdate((prev) => !prev);
                  
          const updatedProperties = bookedProperties.filter((property) => property.propertyId !== id);
          localStorage.setItem(`booked_${userId}`, JSON.stringify(updatedProperties));

          localStorage.setItem(
            `booked_${userId}`,
            JSON.stringify(updatedProperties)
          );
          
            console.log('Properties after update:', JSON.parse(localStorage.getItem(`booked_${userId}`)));
            
            const BookedProperties =
              JSON.parse(localStorage.getItem(`booked_${userId}`)) || [];
             


            } else {
              console.error('Error canceling booking:', response.data.message);
            }
          } catch (error) {
            console.error('Error canceling booking:', error.message);
          }
        };
        
              
    
  return (
    <>
    <div>
      <Header/>
      <h2 style={{ textAlign: 'center' }}>Booked Properties</h2>
      {filteredBooks && filteredBooks.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'red' }}>Booked list is empty.</p>
      ) : (
      <TableContainer component={Paper} sx={{ width: '80%', margin: '0 auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl no</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>VisitingDate</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Responce By Admin</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks?.map((booking, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={`http://localhost:7000/uploads/${booking.propertyId?.images[0]}`}
                      style={{ width: '150px' }}
                      alt="property image"
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {booking?.propertyId?.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {booking?.propertyId?.type}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {booking?.propertyId?.regularPrice}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {booking?.propertyId?.address}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
  {booking?.bookingDate? new Date(booking?.bookingDate).toLocaleDateString() : ''}
</StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => CancelBooking(booking._id,'cancelled')}
                    >
                      Cancel Booking
                    </Button>
                 
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='adminStatus'>
                 
                    {booking?.adminStatus}
                    
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        
        
      </TableContainer >
       )}
       
     
    </div>
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
      
      
    </>
    
  );
};

export default BookedList;