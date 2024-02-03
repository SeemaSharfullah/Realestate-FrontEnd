import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';;





     
    

function SignInSide(state1) {
 

  const nav = useNavigate();
  const [item, setItem] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  
  const [toggleMessage, setToggleMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  


  
 
const [back,setBack]=useState('')
  const Click = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    setError(''); 
   
  };
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };

  const token=JSON.parse(localStorage.getItem('token'))
  

 
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await Axios.post("http://localhost:7000/api/auth/signin", item 
      
       
      )
      if (res.data.success === true) {
       
        // Store the token in local storage
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("User", JSON.stringify(res.data.findLogin));
  console.log(res.data);
        if (res.data.findLogin.role==1) {
          nav("/dashmain");
        
        } else {
         
        
          nav("/"); 
        }
      
      } else {
        setError('Incorrect password. Please try again.');
        if (res.data.message === 'Email not found') {
          setOpenSnackbar(true);
          setToggleMessage('You are not signed up. Please sign up.');
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
  };
  
  const handleClickShowPassword = () => {
    setItem({ ...item, showPassword: !item.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
 
  
  return (
    <ThemeProvider theme={createTheme()}>
  
      <Grid container component="main" sx={{ height: '100vh' }}>
      
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpapercave.com/wp/wp4110685.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => Click(e)}
                onClick={() => setError('')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type={item.showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                
                id="password"
                autoComplete="current-password"
                onChange={(e) => Click(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {item.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                     ),
                    }}
              />
               <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
              
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={Submit}
              >
                Sign In
              </Button>
              
          
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {'Don\'t have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
       
      </Grid>
      
     
   
     
      
    </ThemeProvider>
  );
}

export default SignInSide;
