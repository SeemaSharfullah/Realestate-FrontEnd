import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
 
} from '@mui/material';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const mapContainerStyle = {
  width: '100%',
  height: '300px',
};



export default function CreateListing(state) {
  const filesInputRef = React.useRef(null);
 const navigate=useNavigate()
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    images: "",
    name: '',
    description: '',
    address: '',
    type: '',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    address: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    regularPrice: '',
    discountPrice: '',
  });

  const center = {
    lat: 13.3417,
    lng: 74.7421,
  };
  
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [item, setItem] = useState({
    // Initialize other form fields
  });
  console.log(item);

  const [location, setLocation] = useState(center);

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

const [images,setImages]=useState([])

const [success, setSuccess] = useState(false);

  
const handleImage = (e, index) => {
  const selectedImage = e.target.files[0];
  setImages((prevImages) => {
    const updatedImages = [...prevImages];
    updatedImages[index] = selectedImage;
    return updatedImages;
  });

  setFormData((prevFormData) => ({
    ...prevFormData,
    images: [...prevFormData.images, selectedImage],
  }));
};
  

const handleRemoveImage = (index) => {
 
  const updatedImageUrls = formData.images.filter((_, i) => i !== index);
  setFormData({ ...formData, images: updatedImageUrls });
};


const handleChangeForm = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });

  
  setErrors({
    ...errors,
    [e.target.id]: '',
  });
};
  


  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

 
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Basic validation example - check if required fields are empty
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
      isValid = false;
    }

    // You can add more specific validation for other fields
    if (isNaN(formData.bedrooms) || formData.bedrooms < 1) {
      newErrors.bedrooms = 'Please enter a valid number of bedrooms';
      isValid = false;
    }

    if (isNaN(formData.bathrooms) || formData.bathrooms < 1) {
      newErrors.bathrooms = 'Please enter a valid number of bathrooms';
      isValid = false;
    }

    if (isNaN(formData.regularPrice) || formData.regularPrice < 50) {
      newErrors.regularPrice = 'Regular price must be at least $50';
      isValid = false;
    }

    if (formData.offer && (isNaN(formData.discountPrice) || formData.discountPrice < 0)) {
      newErrors.discountPrice = 'Discounted price must be a non-negative number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const token = localStorage.getItem('token');

  
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    if (validateForm())
    try {
      const data = new FormData();

      // Append other form fields to FormData
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('address', formData.address);
      data.append('type', formData.type);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('regularPrice', formData.regularPrice);
      data.append('discountPrice', formData.discountPrice);
      data.append('offer', formData.offer);
      data.append('parking', formData.parking);
      data.append('furnished', formData.furnished);
     


      
      formData.images.forEach((image) => {
        data.append('images', image);
      });
      

      
     let token= JSON.parse(localStorage.getItem('token'))
    
      const response = await axios.post('http://localhost:7000/api/listing/create',  data,
     {
        headers:{'token':token,
       
      },
     },
    
    
     
      );
      
      
        const responseData = response.data;
        
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/view', { state: { successMessage: 'Property created successfully!' } }); // Redirect after success
        },);
      
        // Handle unsuccessful response
        
      
     
    } catch (error) {
      console.error('Error:', error);
      console.log('Listing creation unsuccessful');
    } else {
      // Form validation failed, do not submit
      console.log('Form validation failed');
    }
  }



  return (
    <>
    {/* <Header/> */}
    
      
    <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          // Replace with your background image
          backgroundSize: 'cover',
          
          // paddingRight:"5%"
        }}
      >
        <div
          style={{
            border: '2px solid #1a237e',
            borderRadius: '8px',
            overflow: 'hidden',
            width:'80%',
           backgroundColor:"#eceff1"
           
          }}
        >
    <Grid
        container
        spacing={3}
        style={{ padding: '20px' }}
      >
       
      <Grid item xs={12}   >

        <Typography variant="h4" align="center" gutterBottom style={{color:"#1a237e"}}>
          Create a Listing
        </Typography>
      </Grid>
     
     <Grid item xs={12} sm={6}  >  
     <div  style={{ paddingLeft: '200px', width: '80%' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom  >
            Basic Information
          </Typography>
          <TextField
  fullWidth
  label="Name"
  placeholder="Name"
  variant="outlined"
  required
  id="name"
  sx={{mb:2,}}
  onChange={handleChangeForm}
  value={formData.name}
  error={Boolean(errors.name)}
            helperText={errors.name}
   // Add margin-bottom for spacing
/>
<TextField
  fullWidth
  label="Description"
  placeholder="Description"
  variant="outlined"
  required
  multiline
  id="description"
  onChange={handleChangeForm}
  value={formData.description}
  error={Boolean(errors.description)}
            helperText={errors.description}
  
 sx={{mb:2}}// Add margin-bottom for spacing
/>
<TextField
  fullWidth
  label="Address"
  placeholder="Address"
  variant="outlined"
  required
  id="address"
  style={{color:"#1a237e"}}
  onChange={handleChangeForm}
  value={formData.address}
  error={Boolean(errors.address)}
            helperText={errors.address}

  sx={{mb:2}}// Add margin-bottom for spacing
/>
          <FormControlLabel
            control={
              <Checkbox
              style={{color:"#1a237e"}}
                id="sale"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
            }
            label="Sell"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="rent"
                onChange={handleChange}
                checked={formData.type === 'rent'}
                style={{color:"#1a237e"}}
              />
            }
            label="Rent"
          />
          <FormControlLabel
            control={
              <Checkbox
                id='parking'
                onChange={handleChange}
                checked={formData.parking}
                style={{color:"#1a237e"}}
              />
            }
            label='Parking spot'
          />
          <FormControlLabel
            control={
              <Checkbox
                id='furnished'
                onChange={handleChange}
                checked={formData.furnished}
                style={{color:"#1a237e"}}
              />
            }
            label='Furnished'
          />
          <FormControlLabel
            control={
              <Checkbox
                id='offer'
                onChange={handleChange}
                checked={formData.offer}
                style={{color:"#1a237e"}}
              />
            }
            label='Offer'
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div>
                <Typography variant='subtitle1' gutterBottom>
                  Beds
                </Typography>
                <TextField
                  type='number'
                  id='bedrooms'
                  inputProps={{ min: 1, max: 10 }}
                  required
                  fullWidth
                  onChange={handleChange}
                  value={formData.bedrooms}
                  sx={{ '&:hover': { borderColor: '#ffffff' } }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <Typography variant='subtitle1' gutterBottom>
                  Baths
                </Typography>
                <TextField
                  type='number'
                  id='bathrooms'
                  inputProps={{ min: 1, max: 10 }}
                  required
                  fullWidth
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div>
                <Typography variant='subtitle1' gutterBottom>
                  Regular price
                </Typography>
                <TextField
                  type='number'
                  id='regularPrice'
                  inputProps={{ min: 50, max: 10000000 }}
                  required
                  fullWidth
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                {formData.type === 'rent' && (
                  <Typography variant='caption'>($ / month)</Typography>
                )}
              </div>
            </Grid>
            {formData.offer && (
              <Grid item xs={12} sm={6}>
                <div>
                  <Typography variant='subtitle1' gutterBottom>
                    Discounted price
                  </Typography>
                  <TextField
                    type='number'
                    id='discountPrice'
                    inputProps={{ min: 0, max: 10000000 }}
                    required
                    fullWidth
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  {formData.type === 'rent' && (
                    <Typography variant='caption'>($ / month)</Typography>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
          
        </form>
        </div>
        
      </Grid>
      
       <Grid item xs={12} sm={6}>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <Typography variant='h6' gutterBottom>
            The first image will be the cover
            </Typography>
          </p>
          <div className='flex gap-4'>
          
          <input
  ref={filesInputRef}
  onChange={(e)=>handleImage(e,0)}
  className='p-3 border border-gray-300 rounded w-full'
  type='file'
  id='images'
  name='images1'
  accept='image/*'

/>
</div>
<div>
<Typography variant='h6' gutterBottom>
        The second image will be the hall
        </Typography>
<input 
  ref={filesInputRef}
  onChange={(e)=>handleImage(e,1)}
  className='p-3 border border-gray-300 rounded w-full'
  type='file'
  id='images'
  name='images2'
  accept='image/*'

/>
</div>
<div>
        <Typography variant='h6' gutterBottom>
        The third image will be the bedroom
        </Typography>
<input
  ref={filesInputRef}
  onChange={(e)=>handleImage(e,2)}
  className='p-3 border border-gray-300 rounded w-full'
  type='file'
  id='images'
  name='images3'
  accept='image/*'

/>
</div>
<div>
        <Typography variant='h6' gutterBottom>
        The forth image will be the kitchen
        </Typography>
<input
  ref={filesInputRef}
  onChange={(e)=>handleImage(e,3)}
  className='p-3 border border-gray-300 rounded w-full'
  type='file'
  id='images'
  name='images4'
  accept='image/*'

/>

          </div>
          
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
        
          <Button
            type='submit'
            disabled={uploading}
            variant='contained'
            style={{ backgroundColor: '#1a237e', color: '#ffffff' ,width:"60%"}}
            onClick={handleSubmit}
          >
            {uploading ? 'Creating...' : 'Create listing'}
          </Button>
          {error && (
            <p className='text-red-700 text-sm'>{error}</p>
          )}
        </div>
      </Grid> 

      

    </Grid>
    </div>
   </div>
   
    </>
    
  );

}
