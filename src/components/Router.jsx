import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About '

import SignUp from './SignUp';
import Main from './MainPage'
import Login from './Login'
import Dashboard from './Dashboard';
import DashMain from './DashMain'
import AddProperty from './AddProperty'
import Property from './ViewProperty'
import HomeProperty from './HomeProperty'
import SingleView from './SingleView'
import Update from './UpdateProperty'
import LikedProperty from './LikedProperty'
import GetLike from './GetLike'
import Profile from './Profile'
import Users from './Users'
import BookProperty from './GetBook'
import AllBooks from './OrderBook'
import Footer from './Footer'
import Feedback from './Feedback'
import FetFeedback from './GetFeedback'
import Search from './Search'
import Design from './Design';
import { useState } from 'react';


export default function Router() {
  const [state,setState]=useState(true)
  const [state1,setState1]=useState(true)
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login  setState1={setState1} state1={state1}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/dashmain" element={<DashMain />} />
        <Route path="/add" element={<AddProperty setState={setState} state={state}  />} />
        <Route path="/view" element={<Property  />} />
        <Route path="/homepro" element={<HomeProperty />} />
        <Route path="/singleview/:id" element={<SingleView state={state} />} />
        <Route path="/update/:id" element={<Update setState={setState} state={state}  />} />
        <Route path="/like" element={<LikedProperty setState={setState} state={state} />} />
        <Route path="/getlike" element={<GetLike  state={state} />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/getbook" element={<BookProperty />} />
        <Route path="/allbooks/*" element={<AllBooks  setState={setState} state={state}/>} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/getback" element={<Feedback/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/design" element={<Design/>} />
       
     
        
       

        
      </Routes>
    </BrowserRouter>
  );
}
