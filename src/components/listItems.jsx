import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import { Link } from 'react-router-dom';
import BookOnlineTwoToneIcon from '@mui/icons-material/BookOnlineTwoTone';
import { useNavigate } from 'react-router-dom';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export const mainListItems = (handleUsersClick, handleOrdersClick,handleFeedbackClick,handleClick ) => (
  
  <>
  <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Main Page" />
    </ListItemButton>
    <ListItemButton onClick={handleUsersClick}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <Link to="/view" style={linkStyle}>
        <ListItemText primary="Properties" />
      </Link>
    </ListItemButton>
    <ListItemButton onClick={handleOrdersClick}>
      <ListItemIcon>
        <BookOnlineTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
        <FeedbackIcon/>
      </ListItemIcon>
      <ListItemText primary="Feedbacks" onClick={handleFeedbackClick}/>
    </ListItemButton>
    
  </>
);
