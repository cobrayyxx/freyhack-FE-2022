import React, {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tab, Tabs } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
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
  const {getFromLocalStorage} = useContext(UserContext)

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const fetchData = async () => {
    // let data = {
    //   id: 123,
    //   name: "Komunitas tinju",
    //   location: "belakang rumah saya",
    //   schedule: "abc",
    //   description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt mauris sit amet nisi tristique consequat. Proin ex massa, porttitor et euismod quis, ornare nec elit. Sed mauris tortor, vehicula eget erat non, posuere sagittis leo. Etiam ut leo semper, suscipit mauris vitae, tempor leo. Nam varius ipsum in erat luctus, elementum dignissim ipsum accumsan. Curabitur et mollis sapien. Mauris congue justo eget felis rhoncus vehicula. Aliquam gravida justo suscipit nulla tempor, sed pellentesque sem rutrum. Donec dictum lorem a quam sodales, et semper mauris vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam maximus sagittis nisi, ut auctor sapien. Mauris id libero euismod, mattis turpis non, laoreet quam. Nulla aliquam sagittis diam vel mattis. Morbi volutpat posuere elit, in fringilla lorem pretium at. In tempus pulvinar congue. Donec porta pellentesque tortor nec viverra.",
    //   picture:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    //   username_creator: "kreasi"
    // }
    // setEvent(data)
    // let res = await axios.get(
    //   `https://communify-be-api.herokuapp.com/api/v1/community/${id}`)
    // let  res_community = res.data
    // console.log(res_community)
    // setEvent(res_community)
  }

  useEffect(() => {
    getFromLocalStorage()
    fetchData()
  }, [])

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop:4}}>
      <Map position={[event.latitude, event.longitude]}/>
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
              0/{event.num_participants} 
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
        <Button variant="contained" onClick={handleDialogOpen}>
          Request to join
        </Button>
      </CardActions>
      <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <CreateRequest setEvent={setEvent} onClose={handleDialogClose}/>
          {/* if user is owner */}
          <RequestList setEvent={setEvent} onClose={handleDialogClose}/>
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Disagree</Button>
          <Button onClick={handleDialogClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </Card>
  );
}