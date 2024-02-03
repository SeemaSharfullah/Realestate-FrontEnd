import React from 'react';
import Header from './Header';
import Footer from './Footer'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const aboutStyles = {
    textAlign: 'center', // Center-align the text
    backgroundColor: 'rgba(196, 186, 186, 0.893)', // Set the background color
    minHeight: '100vh', // Minimum height to cover the entire viewport
    display: 'flex', // Use flex to vertically center content
    flexDirection: 'column', // Stack children vertically
    justifyContent:"flex-center", // Vertically center content
    alignItems: 'center', // Horizontally center content
   
};

export default function About() {
  return (
    <>
    <Header/>
    <div style={aboutStyles}>
     
      <h1 style={{ color: "#2c387e" }}>Commn Floor Estate</h1>
      <h5>"Welcome to my real estate world, where I'm dedicated to making your homeownership dreams a reality."</h5>
      <h5>"My mission is to provide you with exceptional real estate services, guiding you through every step of the buying or selling process."</h5>
      <h5>"We understand that every property has a unique story, and our mission is to help you find the right chapter for your life."</h5>
      <h5>"With years of experience in the real estate industry, we've developed a deep knowledge of local markets, property values, and investment strategies."</h5>
      <h5>"I'm committed to helping you make well-informed decisions and turning your real estate aspirations into actuality."</h5>
      <h5>"My deep understanding of the area allows me to help you find the perfect property."</h5>

      <Container style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          component={Link}
          to="/"
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
}
