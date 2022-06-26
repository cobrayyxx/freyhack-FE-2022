import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CobaMap from './components/coba/CobaMap';
import CobaSearchLoc from './components/coba/CobaSearchLoc';
import CreateEvent from './components/event/CreateEvent';
import Event from './components/event/Event';
import Home from './components/home/Home';

function App() {
  useEffect(() => {
    document.title = "React"
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/event/:id" element={<Event/>} />
        <Route path="/create" element={<CreateEvent/>} />
        <Route path='*' element={<Navigate to="/home" />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
