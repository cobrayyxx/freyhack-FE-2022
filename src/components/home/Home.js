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
    } catch {
      alert("An error has occured")
    }

    // let res_event = [
    //   {
    //     id:1,
    //     name:"Coffe & Chill",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 31.3629619,
    //     longitude: -85.9870669,
    //     num_participants: 3,
    //     location: "Coffee, Bacon County, United States",
    //     contact: "734784",
    //     creator:"Naufal"
    //   },
    //   {
    //     id:2,
    //     name:"Badminton",
    //     date_time:"2022-07-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 51.5302676,
    //     longitude: -2.275275,
    //     num_participants: 3,
    //     creator:"Naufal",
    //     location: "Badminton, Badminton Road, Acton Turville, South Gloucestershire, South West England, England, GL9 1HE, United Kingdom",
    //     contact: "734784"
    //   },
    //   {
    //     id:3,
    //     name:"Tennis",
    //     date_time:"2022-08-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784",
    //     creator:"Naufal"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   },
    //   {
    //     id:1,
    //     name:"ABC",
    //     date_time:"2022-06-25T12:21:02.567Z",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
    //     latitude: 10,
    //     longitude: -6,
    //     num_participants: 3,
    //     location: "Loc placeholder",
    //     contact: "734784"
    //   }
    // ]

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
  console.log(token)
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