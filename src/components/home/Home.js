import { Fab, Grid, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HomeCard from './HomeCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [event, setEvent] = useState([])
  let navigate = useNavigate()

  const handleCreate = () => navigate('/create')
  const fetchData = async () => {
    // let res = await axios.get(
    //   "https://communify-be-api.herokuapp.com/api/v1/community")
    
    // let  res_event = res.data
    let res_event = [
      {
        name:"ABC",
        date_time:1655468460000,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel vestibulum nunc.",
        latitude: 10,
        longitude: -6,
        max_participants: 3,
        location: "Loc placeholder",
        contact: "734784"
      },
      {
        name:"ABC",
        date_time:1656126913,
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
        sx={{maxWidth:1260, m: 'auto'}}
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