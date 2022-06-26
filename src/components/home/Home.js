import { Fab, Grid, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HomeCard from './HomeCard';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Home() {
  const [event, setEvent] = useState([])
  const { currentUser, token } = useContext(UserContext);
  let navigate = useNavigate()

  const handleCreate = () => navigate('/create')
  const fetchData = async () => {
    // let res = await axios.get(
    //   "https://communify-be-api.herokuapp.com/api/v1/community")
    
    // let  res_event = res.data
    let res_event = [
      {
        id:1,
        name:"Coffe & Chill",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 31.3629619,
        longitude: -85.9870669,
        max_participants: 3,
        location: "Coffee, Bacon County, United States",
        contact: "734784"
      },
      {
        id:2,
        name:"Badminton",
        date_time:"2022-07-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 51.5302676,
        longitude: -2.275275,
        max_participants: 3,
        location: "Badminton, Badminton Road, Acton Turville, South Gloucestershire, South West England, England, GL9 1HE, United Kingdom",
        contact: "734784"
      },
      {
        id:3,
        name:"Tennis",
        date_time:"2022-08-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        id:1,
        name:"ABC",
        date_time:"2022-06-25T12:21:02.567Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      }
    ]
    console.log(res_event)
    setEvent(res_event)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      >
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