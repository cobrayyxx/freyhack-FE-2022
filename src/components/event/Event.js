import React, {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
import CreateRequest from './CreateRequest';
import RequestList from './RequestList';
import { UserContext } from '../../context/UserContext';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const dateFormat = (date) => {
  date = new Date(date)
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}, ${date.toLocaleTimeString()}`
}

export default function Event() {
  let { id } = useParams()
  const {state} = useLocation()
  let stateData = state? state.event: {}
  const [value, setValue] = useState(0);
  const [event, setEvent] = useState(stateData)
  const [openDialog, setOpenDialog] = useState(false)
  const {getFromLocalStorage, token, currentUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const fetchData = async () => {
    try{
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      let res = await axios.get(
        `https://freyhack-be-2022.herokuapp.com/api/v1/events/${id}`, options)
      let  res_community = res.data
      setEvent(res_community)
    } catch(err) {
      console.log(err)
      if (err.response && err.response.status === 401){
        navigate('/login')
      } else if (err.response && err.response.data) {
        alert(err.response.data.detail)
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

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop:4}}>
      <Map 
        position={event.latitude ? [event.latitude, event.longitude] : [0,0]}
        location={event.location}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {event.location}
        </Typography>
        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">
              {event.name} 
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
            {event.enrolled.length}/{event.num_participants} 
            </Typography>
          </Grid>
        </Grid>

        <Typography  color="text.secondary">
        <Box component="span" color="text.primary">{dateFormat(event.date_time)}</Box> 
        </Typography>
        <Typography  color="text.secondary">
         Made by: {event.creator}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         Contact: {event.contact}
        </Typography>
        <Typography variant="body2">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{p:2, display: "flex", justifyContent: "flex-end"}} >
        {event.enrolled.length >= event.num_participants?
          <Button disabled>
            Activity is full
          </Button>
          :
          <Button variant="contained" onClick={handleDialogOpen}>
          { event.creator !== currentUser ?
            <>Request to join</> : <>Incoming requests</>
          }
        </Button>
      } 


      </CardActions>
      <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          { event.creator === currentUser ?
            <RequestList event={event} setEvent={setEvent} onClose={handleDialogClose}/>
            : <CreateRequest event={event} setEvent={setEvent} onClose={handleDialogClose}/>
          }

      </Dialog>
    </Card>
  );
}