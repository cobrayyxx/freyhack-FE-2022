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
import { UserContext, UserProvider } from './context/UserContext';
import AppRoutes from './AppRoutes';

function App() {

  useEffect(() => {
    document.title = "Aktivitee"
  }, [])

  return (
    <UserProvider>
      <AppRoutes></AppRoutes>
    </UserProvider>

  )
}

export default App;
