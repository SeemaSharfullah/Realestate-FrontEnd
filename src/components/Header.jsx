import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';



import Avatar from '@mui/material/Avatar';

import axios from 'axios';  
import FeedbackForm from './Feedback';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';


export default function PrimarySearchAppBar({state1}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [loggedOutMessage, setLoggedOutMessage] = useState('');

  const location = useLocation();
  useEffect(() => {
    // Check for success message in the location state
    setSuccessMessage(location.state1?.successMessage);
  }, [location.state1]);

  const handleAlertClose = () => {
    setSuccessMessage('');
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFeedbackDialogOpen, setFeedbackDialogOpen] = useState(false); 

  const isMenuOpen = Boolean(anchorEl);
  const token = localStorage.getItem('token');
  const loggedIn = token ? true : false;


  
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

 
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

 
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignIn = () => {
    navigate('/login');
  };

 
  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    setLoggedOutMessage('Logged out successfully');
    navigate('/')
    

   

    handleProfileMenuClose(); 
  };

const Like=()=>{

  navigate('/getlike')
}
const Book=()=>{
  navigate('/getbook')
}
  const About =()=>{
    navigate("/about")
  }

  const Profile=()=>{
    const user = JSON.parse(localStorage.getItem('User'));
    const userId = user?._id;
    navigate(`/profile/${userId}`)
  }
  const handleDash=()=>{
    navigate('/dashmain')
  }
  const handleHome=()=>{
    navigate('/')
  }
  const Feedback=()=>{
    navigate('/feedback')
  }
  
const [users,setUsers]=useState()
  const user = JSON.parse(localStorage.getItem('User'));
  const userId=user?.username;
  const userRole = user?.role;

 
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token = JSON.parse(localStorage.getItem('token'));
        
        const response = await axios.get('http://localhost:7000/api/user/', {
  headers: {
    'token': token
  }
});
       
       


       
      setUsers(response.data);
       
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUsers();
  }, [userId]);
  const loggedInUser = users && users.find(user => user.username === userId);

 
  const handleFeedbackDialogOpen = () => {
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackDialogClose = () => {
    setFeedbackDialogOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right', 
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
   {loggedIn ? [
  userRole != "1" && (
    <>
      <MenuItem key="profile" onClick={Profile}>
        Profile
      </MenuItem>
      <MenuItem key="favorite" onClick={Like}>
        Favorite
      </MenuItem>
      <MenuItem key="booked" onClick={Book}>
        Booked
      </MenuItem>
    
    </>
  ),
 
  userRole == "1" && (
    <>
      <MenuItem key="dashboard" onClick={handleDash}>
        Dashboard
      </MenuItem>
     
    </>
  ),
  
  <MenuItem key="logout" onClick={handleLogout} >
    Logout
  </MenuItem>
] : [
  <MenuItem key="login" onClick={handleSignIn}>
    Login
  </MenuItem>,
  <MenuItem key="signup" onClick={handleSignUp}>
    Sign Up
  </MenuItem>
]}
    </Menu>
  );
 
  return (
    <>
   
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: '#1565c0' } }}
          >
            Commonfloor
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: '#2c387e' } }}
          >
            Estate
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
            <IconButton color="inherit" onClick={handleFeedbackDialogOpen}>
        <FeedbackIcon />
      </IconButton>
      <Box sx={{ marginLeft: 4 }} />
           <IconButton size="small" aria-label="show 17 new notifications" onClick={About}color="inherit">
              About
            </IconButton>
            <Box sx={{ marginLeft: 4 }} />
            {loggedIn ? (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar
      src={
        
        loggedInUser?.profileImage
        ? `http://localhost:7000/uploads/${loggedInUser?.profileImage}`
        : ''
      }
      onClick={handleProfileMenuOpen}
      style={{ cursor: 'pointer' }}
    />
    <h5 style={{ color: '#fff', marginRight: '8px' }}>
      Hi, {userId}
    </h5>
  </div>
) : (
  <IconButton
    size="large"
    edge="end"
    aria-label="account of current user"
    aria-controls={menuId}
    aria-haspopup="true"
    onClick={handleProfileMenuOpen}
    color="inherit"
  >
    <AccountCircle />
  </IconButton>
)}

          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}

      {successMessage && (
      <Alert
      severity="success"
      onClick={handleAlertClose}
      sx={{
      
        
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',  
        margin: 'auto',
          
      }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
         
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
         
          {successMessage}
        </Alert>
      )}


    <Dialog open={isFeedbackDialogOpen} onClose={handleFeedbackDialogClose}>
  <DialogTitle>Give Feedback</DialogTitle>
  <DialogContent>
    <FeedbackForm onClose={handleFeedbackDialogClose}  />
  </DialogContent>
</Dialog>

    </Box>
   
   
    </>
  );
}
