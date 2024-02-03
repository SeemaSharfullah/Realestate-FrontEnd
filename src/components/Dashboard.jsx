// Dashboard.jsx

import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Outlet, useNavigate } from 'react-router-dom';
import { mainListItems } from './listItems';
import Users from './Users'; // Import the Users component
import Orders from './OrderBook'
import Feedback from './GetFeedback'

import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Design from './Design';
import { Button } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();


const paperStyle = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  height: 240,
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center',
  color: '#fff', 
  backgroundColor: '#1976D2', 
};

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };




const isMenuOpen = Boolean(anchorEl);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const token = localStorage.getItem('token');
  const loggedIn = token ? true : false;
 
  const [renderUsers, setRenderUsers] = useState(false);
  const [renderOrders,setRenderOrders]=useState(false)
 const [renderFeedback,setRenderFeedback]=useState(false)
 const [renderDash,setRenderDash]=useState(true)
  



 const imageStyle = {
  width: '100%', // Adjust the width based on your design
  height: '50%',
  marginTop: 16, // Adjust the margin based on your design
  position:'fixed',
  paddingRight:'25%'
};
const dashboardStyle = {
  position: 'relative',
};
  const handleUsersClick = () => {
    setRenderUsers(true);
    setRenderOrders(false); 
    setRenderFeedback(false)// Reset the state for Orders
    setRenderDash(false)
  };

  const handleOrdersClick = () => {
    setRenderOrders(true);
    setRenderUsers(false); // Reset the state for Users
    setRenderFeedback(false)
    setRenderDash(false)
  };

  const handleFeedbackClick = () => {
    setRenderFeedback(true)
    setRenderUsers(false); 
    setRenderOrders(false); 
    setRenderDash(false)
  };

  const handleClick = () => {
    setRenderFeedback(false)
    setRenderUsers(false); 
    setRenderOrders(false); 
    setRenderDash(true)
  };
  const Click = () => {
    setRenderUsers(false);
    setRenderOrders(false);
    setRenderFeedback(false)
    setRenderDash(true)
    navigate('/add'); // Navigate within the same route
  };
  const menuItems = mainListItems(handleUsersClick,handleOrdersClick,handleFeedbackClick,handleClick);
  const handleHome=()=>{
    navigate('/')
  }
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Clear the token from local storage
    navigate('/')
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    

    
    

    handleProfileMenuClose(); // Close the dropdown menu
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const Profile=()=>{
    const user = JSON.parse(localStorage.getItem('User'));
    const userId = user?._id;
    navigate(`/profile/${userId}`)
  }

  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
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
   
   <MenuItem key="home" onClick={Profile}>
        Profile
      </MenuItem>
  
      <MenuItem key="home" onClick={handleHome}>
        Home
      </MenuItem>
    
  
  <MenuItem key="logout" onClick={handleLogout}>
    Logout
  </MenuItem>
  </Menu>
  );

  return (
    <>
     <div style={dashboardStyle}>
    <ThemeProvider theme={defaultTheme}>
   
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       
       
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#000' }}>
          <Toolbar
            sx={{
              pr: '24px',
              alignItems: 'center', // Align items vertically
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
             
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
              Dashboard
            </Typography>
            <Button size="small" onClick={Click}  sx={{marginRight: '50px',backgroundColor: 'white',color:'black'}}>
              Add Property
            </Button>
            {loggedIn ? (
            
            
            <Avatar
    
   
    onClick={handleProfileMenuOpen}
    style={{ cursor: 'pointer' }}
  />
        
        ):(
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
      
          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          
          <List component="nav">
  {menuItems}
</List>

        
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderDash && (
                  <>
            <div>
          <Grid container spacing={3}>
  {/* Total Properties */}
  
  <Grid item xs={12} md={3} lg={3}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, backgroundColor: '#e0f7fa', color: '#01579b',justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center', }}>
      <Design type="properties" />
    </Paper>
  </Grid>

  {/* Total Users */}
  <Grid item xs={12} md={3} lg={3}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, backgroundColor: '#fce4ec', color: '#880e4f' ,justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  textAlign: 'center',}}>
      <Design type="users" />
    </Paper>
  </Grid>

  {/* Total Booked Properties */}
  <Grid item xs={12} md={3} lg={3}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, backgroundColor: '#e8eaf6', color: '#303f9f',justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  textAlign: 'center', }}>
      <Design type="bookedProperties" />
    </Paper>
  </Grid>

  {/* Total Feedbacks */}
  <Grid item xs={12} md={3} lg={3}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, backgroundColor: '#f3e5f5', color: '#6a1b9a',justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  textAlign: 'center', }}>
      <Design type="feedbacks" />
    </Paper>
  </Grid>
</Grid>

<img src="https://www.7thheavenproperties.com/wp-content/uploads/2016/01/luxury-home-for-sale-bacolet-tobago-1-1152x600.jpg" alt="Property" style={imageStyle} />
</div>
</>
                )}
            <Grid container spacing={3}>
              <Grid item xs={12}>
             
             
                  {renderUsers && <Users />}
                  {renderOrders && <Orders />}
                  {renderFeedback && <Feedback />}
                  {!renderUsers && !renderOrders && <Outlet />}
                  
                  <Outlet />
               
              </Grid>
            </Grid>
            
           
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
    </>
  );
}
