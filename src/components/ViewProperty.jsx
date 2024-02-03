import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions ,Grid} from '@mui/material';
import Axios from 'axios';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';

import HouseIcon from '@mui/icons-material/House';
import Container from '@mui/material/Container';
import Header from './Header'
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Search from './Search'

import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const fixedFooterStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  padding: '1px',
  
};
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function MultiActionAreaCard({state,userId, type ,navigateToSingleView}) {
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
  
    setSuccessMessage(location.state?.successMessage);
  }, [location.state]);

  const handleAlertClose = () => {
    setSuccessMessage('');
  };
  
  const navigate=useNavigate()

  const [data, setData] = useState();
  const [profile, setProfile] = useState();
  const [admin,setAdmin]=useState()
  const [search, setSearch] = useState('');
  
  const [likedProperties, setLikedProperties] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);


  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        let userId = JSON.parse(localStorage.getItem('User'));
        setProfile(userId);
  
        let userToken = JSON.parse(localStorage.getItem('token'));
        const response = await Axios.get('http://localhost:7000/api/listing/get');
        setData(response.data);
        setAdmin(response.data.findLogin);
        setUpdateLocalStorage((prev) => !prev);
      } catch (error) {
       
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, [state]);
  
  const handleLikeDislike = async (propertyId) => {
    try {
     
      setLikedProperties((prevLikedProperties) => {
        if (prevLikedProperties.includes(propertyId)) {
         
          return prevLikedProperties.filter((id) => id !== propertyId);
        } else {
        
          return [...prevLikedProperties, propertyId];
        }
      });
    } catch (error) {
      
      console.error('Error:', error.message);
    }
  }

 
  
  const truncateDescription = (description) => {
   
    const maxLength = 90;
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
  };

  const Click = (item) => {
  
    navigate(`/singleview/${item}`);
  };
  
 
  const handleSearchDataUpdate = (updatedData) => {
    
    setData(updatedData);
  };

  return (
    <div>
<Header/> 
<Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
{successMessage && (
      <Alert
      severity="success"
      onClick={handleAlertClose}
      sx={{
        width: '350px', 
        height:'80px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
          
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
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
</Container><Container maxWidth="sm"  >
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Property 
      </Typography>
      </Container>
        <Search onDataUpdate={handleSearchDataUpdate} />
      
           
          
    <div style={{display:"flex",flexWrap:"wrap"}}>
    {search.toLowerCase() !== ' ' && data?.filter((item) =>
  item.type.toLowerCase().includes(search)
).length === 0 && (
  <div className="alert alert-warning" style={{width:'30%',margin: '0 auto'}}>
  
        <h5 > No results found for "{search}".</h5>
      </div>
     
     
    
 )} 
      {data?.filter((item) =>
          search.toLowerCase() === ' ' ? item : item.type.toLowerCase().includes(search)).map((item) => ( 
         
      <Card key={item._id} sx={{ maxWidth: 280,mb: 3,
        mt: 3,
        ml: 8,}} 
         
        className='card'   onClick={() => Click(item._id)}>  
        <CardActionArea>
        
          <CardMedia
            component="img"
            height="140"
            
            image={item.images?.[0] ? `http://localhost:7000/uploads/${item.images[0]}` : 'default-image-url.jpg'}
            alt="property image"
            
         />
          
              
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {truncateDescription(item.description)}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <LocalHotelIcon /> {item.bedrooms}
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <BathtubIcon /> {item.bathrooms}
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <HouseIcon /> {item.type}
            </Typography>
            </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      
        
       
      </Card>
    ))}
    </div>
   

<Box component="footer" sx={fixedFooterStyle}>
  <Container maxWidth="sm">
    <Typography variant="body1" align="center">
      All Reserved for 2023!
    </Typography>
    <Copyright />
    <Button
      component={Link}
      to="/"
    
      startIcon={<ArrowBackIcon />}
      sx={{  marginTop: 0, }}
    >
      Home
    </Button>
   
  </Container>
</Box>

      
      </div>


);
}