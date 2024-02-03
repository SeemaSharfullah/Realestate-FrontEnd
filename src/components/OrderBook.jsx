import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


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
const StyledImage = styled('img')({
    width: '70px',
    height: '150px', 
    objectFit: 'cover', 
    borderRadius: '50%', 
  });
export default function CustomizedTables(state) {
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [books, setBooks] = useState([]);

  const [displayedBookings, setDisplayedBookings] = useState(4);
 
 
  const [user,setUser]=useState()
  const totalBooking=displayedBookings.length;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let token= JSON.parse(localStorage.getItem('token'))
        const response = await Axios.get('http://localhost:7000/api/auth/',{
          headers:{
            "token":token
          }
        }
        );
        
        setBooks(response.data)
        
        const updatedBooks = response.data.map((book) => {
          if (book.status === 'pending') {
            return { ...book, displayStatus: 'Booked' };
          } else {
            return { ...book, displayStatus: 'Cancelled' };
          }
        });
       
        setBooks(updatedBooks);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchBooks();

  }, [updateLocalStorage]);
  
 

const handleShowMore = () => {
 
  const newDisplayedBookings = displayedBookings + 4;
    setDisplayedBookings(newDisplayedBookings);
    
};
const handleShowLess = () => {
 
  const newDisplayedBookings = Math.max(displayedBookings - 4, 4);
    setDisplayedBookings(newDisplayedBookings);
   
};
const handleBookingAction = async (bookingId, action) => {
  try {
    let token= JSON.parse(localStorage.getItem('token'))
    await Axios.put('http://localhost:7000/api/auth/handleBookingAction', {
      bookingId,
      action,
    },
    {
      headers: {
        'token': token
      }});

    const updatedBooks = books.map((book) =>
        book._id === bookingId ? { ...book, status: action === 'accept' ? 'accepted' : 'rejected' } : book
      );
      setBooks(updatedBooks);
      setUpdateLocalStorage((prev) => !prev);
  } catch (error) {
    console.error('Error updating booking status:', error);
  
  }
};
useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem('User'));
  setUser(currentUser);
}, [books]);

const userId = user?._id;
const handleDeleteBooking = async (bookingId) => {
  try {
    let token= JSON.parse(localStorage.getItem('token'))
    await Axios.delete('http://localhost:7000/api/auth/deleteBooking', {
      data: {
        bookingId: bookingId
      },
      headers: {
        'token': token
      }
    });
    const updatedBooks = books.filter((book) => book._id !== bookingId);
    setBooks(updatedBooks);
    setUpdateLocalStorage((prev) => !prev);
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};


  return (
    <>
   
    <div style={{ maxWidth: '2000px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>All Booking</h2>
      <TableContainer component={Paper}  style={{ width: '100%' }}>
        <Table sx={{maxWidth: '100%'}}aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl no</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Property Name</StyledTableCell>
              <StyledTableCell>Property Address</StyledTableCell>
              <StyledTableCell>Visiting Date</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
         
          {books.slice(0, displayedBookings)?.map((booking, index) => (
  <StyledTableRow  key={booking._id || index}>
    <StyledTableCell component="th" scope="row">{booking.userId && index + 1}</StyledTableCell>
    <StyledTableCell component="th" scope="row">
     
      {booking.userId && booking.userId.profileImage && (
        <StyledImage
          src={`http://localhost:7000/uploads/${booking.userId.profileImage}`}
          style={{ width: '130px',height:'100px' }}
          alt='user profile'
        />
      )}
    </StyledTableCell>
    <StyledTableCell component="th" scope="row">{booking.userId && booking.userId.username}</StyledTableCell>
    <StyledTableCell component="th" scope="row">{booking.userId && booking.userId.phone}</StyledTableCell>
    <StyledTableCell component="th" scope="row">
     
      {booking.propertyId && booking.propertyId.name}
    </StyledTableCell>
    <StyledTableCell component="th" scope="row">{booking.propertyId && booking.propertyId.address}</StyledTableCell>
    <StyledTableCell component="th" scope="row">
      {booking.userId && booking?.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : ''}
    </StyledTableCell>
    <StyledTableCell component="th" scope="row" style={{ textAlign: 'center' }}>
 
  {booking.userId && booking.visitMessage && (
    <>
       {booking.visitMessage.match(/.{1,20}/g).map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </>
  )}
</StyledTableCell>
    <StyledTableCell component="th" scope="row" style={{ textAlign: 'center' }}>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: booking.displayStatus === 'Booked' ? 'green' : 'red',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
    }}
  >
    {booking.displayStatus}
  </div>
</StyledTableCell>
<StyledTableCell component="th" scope="row" style={{ textAlign: 'center' }}>

                    {booking.adminStatus === 'accepted' && (
                      <span style={{ color: 'green' }}>Accepted</span>
                    )}
                    {booking.adminStatus === 'rejected' && (
                      <span style={{ color: 'red' }}>Rejected</span>
                    )}
                    {booking.status === 'pending' && !booking.actionTaken && (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleBookingAction(booking._id, 'accept')}
                          style={{ marginRight: '5px', padding: '4px 8px', fontSize: '10px' }}
                        >
                          Accept
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleBookingAction(booking._id, 'reject')}
                          style={{ marginRight: '5px', padding: '4px 8px', fontSize: '10px' }}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {booking.displayStatus === 'Cancelled' && (
                      <Button
                        size="small"
                        variant="contained"
                        style={{ backgroundColor: 'black' }}
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </StyledTableCell>
                  
  </StyledTableRow>
))}
          </TableBody>
        </Table>
      </TableContainer>
      {displayedBookings < books.length && (
          <>
            <Button variant="filled" onClick={handleShowMore}>
              Show More
            </Button>
            
          </>
        )}
        {displayedBookings > 4 && (
                <Button variant="filled" onClick={handleShowLess} >
                  Show Less
                </Button>
            )}
    </div>
    </>
  );
}
