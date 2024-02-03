import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function CreateListing({state,setState}) {
  const filesInputRef = React.useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  const [update, setUpdate] = useState('');
  const [formData, setFormData] = useState({
   
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [images, setImages] = useState([]);
  const handleImage = (e, index) => {
    const selectedImage = e.target.files[0];
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = selectedImage;
      return updatedImages;
    });
  
    setFormData({...formData,images:images});
  };
console.log(images)
  const handleRemoveImage = (index) => {
    const updatedImageUrls = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImageUrls });
  };

  useEffect(() => {
    Axios.get(`http://localhost:7000/api/listing/sget/${userId}`)
      .then((res) => {
        const updateValue = res.data;
        setUpdate(updateValue);

        
      }
      )
      .catch((error) => {
        console.error('View Error', error);
      });
  }, [userId]);
  

  const handleChange = (e) => {
    

    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setUpdate({
        ...update,
        type: e.target.id,
      });
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setUpdate({
        ...update,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setUpdate({
        ...update,
        [e.target.id]: e.target.value,
      });
    }
  };
  const token = JSON.parse(localStorage.getItem('token'));
  console.log('Token:', token);
  const handleSubmit = async () => {
  
    const data=new FormData();
    
    try {
      const formData = new FormData()
      images.map((item)=>{
        formData.append("images",item);
    });
      for (let key in update) {
        formData.append(key, update[key])
      }
      const response = await Axios.put(`http://localhost:7000/api/listing/update/${userId}`, formData,
      {
        headers:{'token':token,
       
      },
     },
   
      )
      
      .then(async(res)=>{
        console.log(res.data)
        await navigate(`/singleview/${userId}`,{ state: { successMessage: 'Property updated successfully!' } })
        setState(!state)

      })
      .catch((err)=>{
        console.log(err)
      })

     
    } catch (error) {
      console.error('Error during form submission', error);
      setError('An unexpected error occurred');
    }
  };



  return (
    <>
      

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
            width: '80%',
            backgroundColor: "#eceff1"

          }}
        >
          <Grid
            container
            spacing={3}
            style={{ padding: '20px' }}
          >

            <Grid item xs={12}   >

              <Typography variant="h4" align="center" gutterBottom style={{ color: "#1a237e" }}>
                Create a Listing
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}  >
              <div style={{ paddingLeft: '200px', width: '80%' }}>
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
                    sx={{ mb: 2, }}
                    onChange={(e) => handleChange(e)}
                    value={update.name}
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
                    onChange={(e) => handleChange(e)}
                    value={update.description}

                    sx={{ mb: 2 }}// Add margin-bottom for spacing
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    placeholder="Address"
                    variant="outlined"
                    required
                    id="address"
                    style={{ color: "#1a237e" }}
                    onChange={(e) => handleChange(e)}
                    value={update.address}
                    sx={{ mb: 2 }}// Add margin-bottom for spacing
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#1a237e" }}
                        id="sale"
                        onChange={(e) => handleChange(e)}
                        checked={update.type === 'sale'}
                      />
                    }
                    label="Sell"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="rent"
                        onChange={(e) => handleChange(e)}
                        checked={update.type === 'rent'}
                        style={{ color: "#1a237e" }}
                      />
                    }
                    label="Rent"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='parking'
                        onChange={(e) => handleChange(e)}
                        checked={update.parking}
                        style={{ color: "#1a237e" }}
                      />
                    }
                    label='Parking spot'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='furnished'
                        onChange={(e) => handleChange(e)}
                        checked={update.furnished}
                        style={{ color: "#1a237e" }}
                      />
                    }
                    label='Furnished'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='offer'
                        onChange={(e) => handleChange(e)}
                        checked={update.offer}
                        style={{ color: "#1a237e" }}
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
                          onChange={(e) => handleChange(e)}
                          value={update.bedrooms}
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
                          onChange={(e) => handleChange(e)}
                          value={update.bathrooms}
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
                          onChange={(e) => handleChange(e)}
                          value={update.regularPrice}
                        />
                        {update.type === 'rent' && (
                          <Typography variant='caption'>($ / month)</Typography>
                        )}
                      </div>
                    </Grid>
                    {update.offer && (
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
                            onChange={(e) => handleChange(e)}
                            value={update.discountPrice}
                          />
                          {update.type === 'rent' && (
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
                    onChange={(e) => handleImage(e, 0)}
                    className='p-3 border border-gray-300 rounded w-full'
                    type='file'
                    id='images'
                    name='images1'
                    accept='image/*'

                  />
                  {update?.images?(
                    <img alt='image' style={{width:'200px'}} src={`http://localhost:7000/uploads/${update?.images[0]}`}/>
                  ):(
                    <></>
                  )}
                </div>
                <div>
                  <Typography variant='h6' gutterBottom>
                    The second image will be the hall
                  </Typography>
                  <input
                    ref={filesInputRef}
                    onChange={(e) => handleImage(e, 1)}
                    className='p-3 border border-gray-300 rounded w-full'
                    type='file'
                    id='images'
                    name='images2'
                    accept='image/*'

                  />
                  {update?.images?(
                    <img alt='image' style={{width:'200px'}} src={`http://localhost:7000/uploads/${update?.images[1]}`}/>
                  ):(
                    <></>
                  )}
                </div>
                <div>
                  <Typography variant='h6' gutterBottom>
                    The third image will be the bedroom
                  </Typography>
                  <input
                    ref={filesInputRef}
                    onChange={(e) => handleImage(e, 2)}
                    className='p-3 border border-gray-300 rounded w-full'
                    type='file'
                    id='images'
                    name='images3'
                    accept='image/*'

                  />
                  {update?.images?(
                    <img alt='image' style={{width:'200px'}} src={`http://localhost:7000/uploads/${update?.images[2]}`}/>
                  ):(
                    <></>
                  )}
                </div>
                <div>
                  <Typography variant='h6' gutterBottom>
                    The forth image will be the kitchen
                  </Typography>
                  <input
                    ref={filesInputRef}
                    onChange={(e) => handleImage(e, 3)}
                    className='p-3 border border-gray-300 rounded w-full'
                    type='file'
                    id='images'
                    name='images4'
                    accept='image/*'

                  />
                  {update?.images?(
                    <img alt='image' style={{width:'200px'}} src={`http://localhost:7000/uploads/${update?.images[3]}`}/>
                  ):(
                    <></>
                  )}
        
                </div>

                <p className='text-red-700 text-sm'>
                  {imageUploadError && imageUploadError}
                </p>

                <Button
                  type='submit'
                  disabled={uploading}
                  variant='contained'
                  style={{ backgroundColor: '#1a237e', color: '#ffffff', width: "60%" }}
                  onClick={handleSubmit}
                >
                  {uploading ? 'Creating...' : 'Update listing'}
                </Button>
                {error && (
                  <p className='text-red-700 text-sm'>{error}</p>
                )}
              </div>
            </Grid>



          </Grid>
        </div></div>
    </>
  );
}
