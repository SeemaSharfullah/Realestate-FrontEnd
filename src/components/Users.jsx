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
    width: '70px', // Set your desired width
    height: '150px', // Set your desired height
    objectFit: 'cover', // Cover the container while maintaining aspect ratio
    borderRadius: '50%', // Make it round
  });
export default function CustomizedTables() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token= JSON.parse(localStorage.getItem('token'))
        const response = await Axios.get('http://localhost:7000/api/user/',{
          headers: {
            'token': token
          }
        });
        const filteredUsers = response.data.filter(user => user.role != '1');
        setUsers(filteredUsers);
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: '2000px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>All Users</h2>
      <TableContainer component={Paper}  style={{ width: '100%' }}>
        <Table sx={{maxWidth: '100%'}}aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl no</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {/* Fetch the image for each user */}
                  {user.profileImage && (
                    <StyledImage
                      src={`http://localhost:7000/uploads/${user.profileImage}`}
                      style={{ width: '130px' }}
                      alt='user profile'
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">{user.username}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{user.email}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{user.phone}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
