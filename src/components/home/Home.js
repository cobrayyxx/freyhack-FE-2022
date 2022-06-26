import { Fab, Grid, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HomeCard from './HomeCard';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Home() {
  const [event, setEvent] = useState([])
  const { currentUser, token, getFromLocalStorage } = useContext(UserContext);
  let navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => navigate('/create')
  const fetchData = async () => {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    try{
      let res = await axios.get("https://freyhack-be-2022.herokuapp.com/api/v1/event", options)
      let  res_event = res.data
      console.log(res_event)
      setEvent(res_event)
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status === 401){
        navigate('/login')
      } else {
        alert("Something went wrong")
      }
    }
  }

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  useEffect(() => {
    token && fetchData()
  }, [token])

  const fab_style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  return (
    <>
      <Fab onClick={handleCreate} style={fab_style} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Grid 
        container
        sx={{width:"100%",maxWidth:1260, m: 'auto'}}
        spacing={2}
        alignItems="center"
      >
          <Grid item xs={6}>
            <Typography
              variant="h4" 
              align="left" 
              sx={{ m:2, marginLeft:4, color : "#7DF9FF", fontWeight: 900, fontFamily: 'Lucida Console'}}>
                  Aktivitee
            </Typography>
          </Grid>
          <Grid item  xs={6}>
            <Typography
              align="right"
              sx={{color : "white", marginRight:5}} 
             >
              Welcome, {currentUser}
              <IconButton 
              aria-label="dropdown" 
              color="primary"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
              >
              <MenuItem onClick={event =>  window.location.href='/logout'}>Logout</MenuItem>
            </Menu>
            </Typography>
            
          </Grid>
          {event.map((val, idx) => (
            <Grid item key={idx} lg={3} md={4} sm={6} xs={12} sx={{padding: 0}}>
                <HomeCard event={val}/>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Home;