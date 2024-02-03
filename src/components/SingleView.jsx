// SingleView.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { Bed, Bathtub, Kitchen } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import WeekendIcon from '@mui/icons-material/Weekend';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Delete from './Delete';
import FavoriteButton from './LikedProperty';
import BookingButton from './Booked'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';  
import Header from './Header'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HouseIcon from '@mui/icons-material/House';
import Chip from '@mui/material/Chip';
import Footer from './Footer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleView = ({ select,state }) => {


  
  
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
   
    setSuccessMessage(location.state?.successMessage);
  }, [location.state]);

  const handleAlertClose = () => {
    setSuccessMessage('');
  };
  const navigate=useNavigate()
  const params= useParams();
const userId=params.id;

  const [profile, setProfile] = useState({});

  const [selectUser,setSelectUser]=useState('')
  const [open, setOpen] = React.useState(false);
 
 const [data,setData]=useState(); //front end 
  
  const [conDelet, setconDelete] = useState(true)
  const [DeleteOpen,setDeleteOpen]=useState(false)
  const [property, setProperty] = useState({
  
   
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false); 
  const [remainingCardData, setRemainingCardData] = useState([]);
 
  const handleDelete= (item) =>{

    setDeleteOpen(true)
    setSelectUser(item)



   
    }

    const deleteClose = () => {
      setDeleteOpen(false);
    }

    useEffect(()=>{
      let userid = JSON.parse(localStorage.getItem('User')) || [];
      setProfile(userid);
     
    },[])
    const truncateDescription = (description) => {
    
      const maxLength = 90;
      return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };
    useEffect(() => {
      
      
    
      Axios.get(`http://localhost:7000/api/listing/sget/${userId}`)
        .then((res) => {
          const updateValue = res.data;
          console.log('API Response:', updateValue);
          setProperty(updateValue);
         
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [state,userId]);

    const SingleClick = (item) => {
      navigate(`/singleview/${item}`);
    };
     useEffect(() => {
    
    Axios.get('http://localhost:7000/api/listing/get')
      .then((response) => {
        setRemainingCardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching remaining property data:', error);
      });
      
  }, [userId]);

 


  

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);
               

  if (!property) {
    return <div>Loading...</div>;
  }
 

  const remainingProperties = remainingCardData
  .filter((item) => item._id !== property._id && item.type === property.type).map((item) => (
    <Grid item key={item.id} xs={3} sm={6} md={3}>
    <Card
      key={item._id}
      sx={{
        maxWidth: 280,
        mb: 3,
        mt: 3,
      }}
                    className='card'
                    onClick={() => SingleClick(item._id)}>  
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
     
    </Grid>
  ));

 
  const navigateToView = () => {
    navigate('/view');
  };

 
  
   
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div className={className} style={{ ...arrowStyles, right: '10px' }} onClick={onClick}>
            <ArrowForward />
          </div>
        );
      };
    
     
      const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div className={className} style={{ ...arrowStyles, left: '10px' }} onClick={onClick}>
            <ArrowBack />
          </div>
        );
      };
    
      const arrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1,
      };
  const settings = {
   
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
    
  };
  const imageStyle = {
    width: '100%', 
    height: '500px', 
    objectFit: 'cover',
    borderRadius:'8px'
  };
  const Click = (property) => {
   
    navigate(`/update/${property}`);
  };

  
  console.log(profile);

console.log(property.discountPrice);
 
  return (
    <>
    <div  >
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
</Container>
   
     
      <Slider {...settings}>
      {property.images && property.images.map((image, index) => (
  <div key={index}>
   


       
    <img src={`http://localhost:7000/uploads/${image}`} alt={`image-${index}`} style={imageStyle} />
  </div>
))}
      </Slider>
      <div style={{ textAlign: 'justify',paddingLeft:'200px',paddingRight:'200px' }}>
     
      <h2>{property.name}  {/* Price */}- <CurrencyRupeeIcon/>
      {property.type === 'rent' ? `${property.regularPrice} /month` : property.regularPrice} </h2>

<AddLocationIcon/> {property.address}
<div style={{ display: 'flex'  }}>
<Chip
    label={property.type === 'sale' ? 'Sell' : 'Rent'}
    color={property.type === 'sale' ? 'primary' : 'secondary'}
    style={{ marginRight: '8px', minWidth: '100px' }}
  />&nbsp;
       
       
        {property.offer && (
          <Button variant="contained"  style={{ color:'white',backgroundColor: '#8B0000', marginBottom: '10px' ,marginRight: '8px', minWidth: '100px',borderRadius:'200px',height:'30px'}}>
        <CurrencyRupeeIcon/>    {property.discountPrice} OFF
          </Button>
        )}
      </div>
      

      <p>{property.description}</p>
      <div>
          <p>
            <Bed /> Bedrooms: {property.bedrooms} &nbsp;
            <Bathtub /> Bathrooms: {property.bathrooms} &nbsp;
            <WeekendIcon  variant="contained"/>  {property.furnished ? 'Furnished' : 'Unfurnished'}  
            <DriveEtaIcon /> {property.parking ? 'Available' : 'Not Available'}
          </p>
        </div>
        
    </div>

    

{profile.role=='1' &&(<div style={{ textAlign: 'left-justify',paddingLeft:'200px' }}>
     {console.log("Profile:", profile)}
    <Button variant="contained" color="primary"  style={{backgroundColor:'black'}} onClick={() => Click(property._id)}>
      Update
    </Button>&nbsp;
    <Button variant="contained" color="secondary" style={{backgroundColor:'black'}} onClick={() => handleDelete(property)}>
      Delete
    </Button>
  </div>)      }

{profile.role=='0' && (<React.Fragment>
        <FavoriteButton propertyId={property._id} style={{ backgroundColor: 'black', width: '100px', height: '40px', minWidth: 'unset !important' }} />
       
        <BookingButton propertyId={property._id}    />
       
        
      </React.Fragment>)}
      
<div>
        
        <Modal

          open={DeleteOpen}
          onClose={deleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Delete selectUser={selectUser} setconDelete={setconDelete} DeleteClose={deleteClose} value={data} setValue={setData}/> 
        </Modal>
      </div>
     
      

      <Container  style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: 'darkblue' }}>
  Other Properties Of Same Type
</Typography>
        <Grid container >
          {remainingProperties}
        </Grid>
       
      </Container>
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
<Footer/>
      </>
   
  
  );
};

export default SingleView;
