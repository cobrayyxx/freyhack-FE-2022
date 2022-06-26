import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CobaMap from './components/coba/CobaMap';
import CobaSearchLoc from './components/coba/CobaSearchLoc';
import CreateEvent from './components/event/CreateEvent';
import Event from './components/event/Event';
import Home from './components/home/Home';
import Register from './components/login/register';
import Login from './components/login/login'
import Logout from './components/login/logout';
import { UserContext } from './context/UserContext';

function AppRoutes() {
  const { token } = useContext(UserContext)
  useEffect(() => {
    document.title = "Aktivitee"
  }, [])

  if (token || localStorage.getItem('token')){
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/event/:id" element={<Event/>} />
        <Route path="/create" element={<CreateEvent/>} />
        <Route path='*' element={<Navigate to="/home" />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  </BrowserRouter>
  );
  } else {
    console.log("not logged in")
    return (  
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
    );
  }
}

export default AppRoutes;
