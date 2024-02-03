import  React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




const ToggleMessage = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        borderRadius: '8px',
        width: '300px', 
        textAlign: 'center',
        color: '#333',
      }}
    >
     
   
     <p style={{ margin: 0 }}>{message}</p>
      <span
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#999',
        }}
        onClick={onClose}
      >
        &#10006;
      </span>
    </div>
  );
};


const Wrapper = ({ children }) => (
  <div
    style={{
      backgroundImage: `url('https://www.fortunebuilders.com/wp-content/uploads/2020/06/wholesale-deals-1.jpg')`, // Set the path to your background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUp() {
 
  
const nav =useNavigate();
const [item,setItem]=useState('')
const [showToggleMessage, setShowToggleMessage] = useState(false);
  const [toggleMessage, setToggleMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
const Click=(e)=>{
setItem({...item,[e.target.name]:e.target.value})
}
const [role,setRole]=useState('')
const handleRole=(e)=>{
  setRole(e.target.value)
}  
const handleFileChange = (e) => {
  setItem({ ...item, [e.target.name]: e.target.files[0] });
};
const handleSubmit = async (event) => {
  event.preventDefault();
 
  try {
    const formData = new FormData();
    formData.append('profileImage', item.profileImage);
    formData.append('username', item.username);
    formData.append('email', item.email);
    formData.append('phone', item.phone);
    formData.append('password', item.password);
  
    const response = await Axios.post('http://localhost:7000/api/auth/signup', formData);
   
  
    if (response.status === 200) {
      const responseData = response.data;
     
  
      if (response.status == 200) {
        const responseData = response.data;
       
        
      } else {
        console.log('value does not insert');
      }
      await nav('/login');
     
    } else {
      console.log('Value does not insert. Unexpected status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  
    if (error.response) {
     
     
    } else if (error.request) {
     
     
    } else {
      
      console.log('Error during request setup:', error.message);
    }
  
   
    setOpenSnackbar(true);
    setToggleMessage('User with this email already exists.');
  }

}
const closeToggleMessage = () => {
  setShowToggleMessage(false);
};

  return (
    <Wrapper>
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs"  >
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
             backgroundColor:'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                
                <TextField
                  type="file"
                  name="profileImage"
                  onChange={(e)=>handleFileChange(e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Name"
                  autoFocus
                  onChange={(e)=>Click(e)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>Click(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="number"
                  onChange={(e)=>Click(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>Click(e)}
                />
              </Grid>
            
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {showToggleMessage && <ToggleMessage message={toggleMessage} onClose={closeToggleMessage} style={{ border: '2px solid red' }} />}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        
      </Container>
      <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
        {toggleMessage}
      </Alert>
    </Snackbar>
    </ThemeProvider>
    </Wrapper>
  );
}
