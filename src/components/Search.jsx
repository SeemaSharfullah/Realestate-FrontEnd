import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
 
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import  axios from 'axios';

const Search = ({ onDataUpdate }) => {
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [furnished, setFurnished] = useState('');
  const [parking, setParking] = useState('');
  const [offer, setOffer] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/listing/getsearch?type=${type}&furnished=${furnished}&parking=${parking}&offer=${offer}&address=${address}`
        );
  
        
        setData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [type, furnished, offer, address]);
  
  const handleSearch = async () => {
    setLoading(true);
  
    try {
     
     
      const response = await axios.get(
        `http://localhost:7000/api/listing/getsearch?type=${type}&furnished=${furnished}&offer=${offer}&address=${address}`
      );
  
     
      setData(response.data);
      
      onDataUpdate(response.data); 
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
<Container >
    <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }} style={{ backgroundColor: '#1a2460' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <TextField
          label="Search by location"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ backgroundColor: 'white' }}
        />
        <FormControl variant="outlined" fullWidth  sx={{ backgroundColor: 'white' }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="sell">Sell</MenuItem>
            <MenuItem value="rent">Rent</MenuItem>
            {/* Add more types as needed */}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth  sx={{ backgroundColor: 'white' }}>
          <InputLabel>Furnished</InputLabel>
          <Select value={furnished} onChange={(e) => setFurnished(e.target.value)} label="Furnished">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth  sx={{ backgroundColor: 'white' }}>
          <InputLabel>Parking</InputLabel>
          <Select value={parking} onChange={(e) => setParking(e.target.value)} label="Parking">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth  sx={{ backgroundColor: 'white' }}>
          <InputLabel>Offer</InputLabel>
          <Select value={offer} onChange={(e) => setOffer(e.target.value)} label="Offer">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ textTransform: 'none', height: '40px',backgroundColor:'black' }}
        >
          <SearchIcon />
        </Button>
      </div>
    </Paper>

    

      
    </Container>



  );
};


export default Search;