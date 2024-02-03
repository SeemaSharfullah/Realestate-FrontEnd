import * as React from 'react';
import {useEffect,useState} from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import {Link} from 'react-router-dom'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


import ProfileDelete from './ProfileDelete'
import Modal from '@mui/material/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Wrapper = ({ children }) => (
  <div
    style={{
      backgroundImage: `url('http://getwallpapers.com/wallpaper/full/a/b/b/764938-full-size-stylish-wallpaper-1920x1200-hd-1080p.jpg')`, // Set the path to your background image
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

const defaultTheme = createTheme();
export default function Update() {
  
    const navigate=useNavigate();
 
    const params=useParams();
    const userId=params.id;
 
    const [DeleteOpen,setDeleteOpen]=useState(false)
    const [selectUser,setSelectUser]=useState('')
    const [conDelet, setconDelete] = useState(true)
    const [data,setData]=useState();
  

   const  handleDelete= (item) =>{

      setDeleteOpen(true)
      setSelectUser(item)
  
    
  
     
      }
  
      const deleteClose = () => {
        setDeleteOpen(false);
      }
   
    const [Update, setUpdate] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const user= JSON.parse(localStorage.getItem('User'))
    const userRole=user?.role;
console.log(user.role);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            let token= JSON.parse(localStorage.getItem('token'))
            const response = await Axios.get(`http://localhost:7000/api/user/${userId}`,{
              headers:{'token':token,
       
      },
            });
            setUpdate(response.data);
      
            
      const imageResponse = await Axios.get(`http://localhost:7000/uploads/${response.data.profileImage}`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([imageResponse.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      
           
            setSelectedImage(imageUrl);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchUserData();
      }, [userId]);
      
       






console.log(Update);
        const Click=(e)=>{
            setUpdate({...Update,[e.target.name]:e.target.value})
           
          } 
  
          const handleProfile=(e)=>{
            setUpdate({...Update,profileImage:e.target.files[0]}) 
           
          }
          

const Submit=async()=>{

const formData = new FormData()
for (const key in Update) {
    formData.append(key, Update[key]);
  }
  let token= JSON.parse(localStorage.getItem('token'))
 //CONNECTION
 Axios.post(`http://localhost:7000/api/user/update/${userId}`,
  formData,
 {
  headers: {
    'token': token
  }
}
 )
 
 .then((res)=>{
 
  
 })
 .catch((err)=>{
 console.error(err)
 })
await navigate('/'); 
         }  
console.log(selectedImage);
       
  return (
    <Wrapper>
<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
          
          <Typography component="h1" variant="h5" style={{textAlign:'center', marginTop:'20px'}}>
            <b>PROFILE</b>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <div>
      {selectedImage && (
        <div>
         
           <div
            style={{
                width: '100px', 
                height: '100px', 
                overflow: 'hidden',
                borderRadius: '50%', 
                border: '2px solid #ccc', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto', 
                marginTop: '20px', 
            }}
          >
            <input
  type="file"
  onChange={(e) => handleProfile(e)}
  name="profileImage"
  style={{
    width: '100%', 
    height: '100%', 
    opacity: 0, 
    position: 'absolute', 
  }}
/>
            <img
               src={selectedImage}
              alt="Selected"
           
                style={{
                    width: '100%',
                    height: '100%', 
                    objectFit: 'cover', 
                    borderRadius: '50%', 
              }}
            />
          </div>
        </div>
      )}
    </div>
           
    

            <TextField onChange={(e)=>Click(e)}
              margin="normal"
              required
              fullWidth
              value={Update.username}
              label="name"
              name="username"
              autoComplete=""
              autoFocus
            />
           
            <TextField onChange={(e)=>Click(e)}
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={Update.email}
             
              autoComplete=""
            />
            <TextField onChange={(e)=>Click(e)}
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              value={Update.phone}
             
              autoComplete=""
            />
           
             <TextField onChange={(e)=>Click(e)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              value={Update.password}
              autoComplete=""
            />
           
                  
            
            <Button
           onClick={Submit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
            
            <Link variant="contained" color="secondary"  onClick={() => handleDelete(userId)}>
      Delete Account
    </Link>
              </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <div>
        
        <Modal

          open={DeleteOpen}
          onClose={deleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <ProfileDelete selectUser={selectUser} setconDelete={setconDelete} DeleteClose={deleteClose} value={data} setValue={setData}/> 
        </Modal>
      
        
        <Button
            component={Link}
          
            to={userRole === 1 ? "/dash" : "/"}
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 ,backgroundColor:'white'}}
          >
            Go Back
          </Button>
      </div>
      </Container>
    </ThemeProvider>
    </Wrapper>
  );
}