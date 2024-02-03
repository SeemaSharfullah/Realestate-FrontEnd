// MultiActionAreaCard.jsx

import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid ,Box} from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import HouseIcon from '@mui/icons-material/House';

export default function MultiActionAreaCard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
   
    Axios.get('http://localhost:7000/api/listing/get')
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handleShowMore = () => {
    
    navigate('/view');
  };
  const Click = (property) => {
    
    navigate(`/singleview/${property}`);
  };


  const truncateDescription = (description) => {
   
    const maxLength = 90;
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
  };
  return (
    <Box>
    <Typography variant="h6" gutterBottom  sx={{ color: '#2196F3',paddingLeft: '57px'  }}>
         Best Choices
      </Typography>
      <Typography variant="h4" gutterBottom   sx={{ color: '#212121',paddingLeft: '57px'  }}>
      Popular Residencies
      </Typography>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {properties.slice(0, 4).map((property, index) => (
        <Card key={index} sx={{ maxWidth: 280, mb: 3, mt: 3, ml: 8 }} className='card' onClick={() => Click(property._id)}>
         
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={property.images.length > 0 ? `http://localhost:7000/uploads/${property.images[0]}` : 'default-image-url.jpg'}
              alt="property image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {property.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {truncateDescription(property.description)}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <LocalHotelIcon /> {property.bedrooms}
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <BathtubIcon /> {property.bathrooms}
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
            <HouseIcon /> {property.type}
            </Typography>
            </Grid>
            </Grid>
            </CardContent>
          </CardActionArea>
          
        </Card>
      ))}

     
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '1300px' }}>
      <Button onClick={handleShowMore} variant="filled" color="pimary" sx={{  backgroundColor: '#2196F3' }}>
        Show More
      </Button>
      </div>
    </div>
    </Box>
  );
}
