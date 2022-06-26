import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {Box, Button, Divider, IconButton, Paper, Stack, TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [searchResult, setSearchResult] = useState([])
  const [inputLocation, setInputLocation] = useState('')
  const [inputLat, setInputLat] = useState(0)
  const [inputLon, setInputLon] = useState(0)
  const [inputName, setInputName] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [inputContact, setInputContact] = useState('')
  const [inputParticipant, setInputParticipant] = useState('')
  const [inputTime, setInputTime] = useState(new Date().toISOString().replace('Z', ''))
  const {getFromLocalStorage, token} = useContext(UserContext)
  let navigate = useNavigate()

  const handleSearch = async (e) => {
    console.log(inputLocation)
    try{
      let res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${inputLocation}`)
      setSearchResult(res.data)
      console.log(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const handleSelectLocation = (val) => {
    setInputLocation(val.display_name)
    setInputLat(val.lat)
    setInputLon(val.lon)
    setSearchResult([])
  }

  const clearLocation = () => {
    setInputLocation('')
    setInputLat(0)
    setInputLon(0)
    setSearchResult([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    let data = {
      name: inputName,
      description: inputDescription,
      latitude: inputLat,
      longitude: inputLon,
      location: inputLocation,
      contact: inputContact,
      maxParticipants: inputParticipant,
      datetime: new Date(inputTime).getTime(),
      creator: ""
    }
    console.log(data)
    try{
      let res = await axios.post(`https://freyhack-be-2022.herokuapp.com/api/v1/event`, options, data)
      setSearchResult(res.data)
      console.log(res.data)
    } catch(err) {
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
  

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{backgroundColor:'white', m:'32px auto', p: 4, maxWidth:800}}
      >
      <Typography variant="h5">
        Create an activity
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Activity Name"
          id="outlined-size-medium"
          value={inputName}
          onChange={(e)=>setInputName(e.target.value)}
          size="medium"
          variant="standard"
          sx={{width:"100%"}}
        />
        <div>
          <Box
            sx={{ display: 'flex', alignItems: 'center', width: "100%", }}
          >
            <TextField
              required
              autoComplete="off"
              onKeyDown={(e) => {if(e.keyCode === 13){handleSearch()}}}
              value={inputLocation}
              label="Location Address"
              id="outlined-size-medium"
              onChange={(e) => setInputLocation(e.target.value)}
              size="medium"
              variant="standard"
              sx={{width:"100%"}}
            />
            <IconButton onClick={clearLocation} sx={{ p: '10px', w:"20px", h:"10px" }} aria-label="clear">
              <CloseIcon/>
            </IconButton>
            <IconButton onClick={handleSearch} sx={{ p: '10px', w:"20px", h:"10px" }} aria-label="clear">
              <SearchIcon/>
            </IconButton>
          </Box>
          {
            searchResult.length !== 0 && (
            <Paper
              elevation={3}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%",  m: 'auto', zIndex:1000 }}
            >
              <Stack 
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
              >
                {searchResult.map((val,idx) => (
                  <Typography key={idx} onClick={() => handleSelectLocation(val)} variant='body'>
                    {val.display_name}
                  </Typography>
                ))}
              </Stack>
            </Paper>
            )
          }
        </div>
        <TextField
          required
          multiline
          label="Description"
          id="outlined-size-medium"
          value={inputDescription}
          onChange={(e)=>setInputDescription(e.target.value)}
          size="medium"
          variant="standard"
          sx={{width:"100%"}}
        />
        <TextField
          required
          label="Contact Infromation"
          id="outlined-size-medium"
          value={inputContact}
          onChange={(e)=>setInputContact(e.target.value)}
          size="medium"
          variant="standard"
          sx={{width:"100%"}}
        />
        <TextField
          required
          type="number"
          label="Maximum Participants"
          id="outlined-size-medium"
          value={inputParticipant}
          onChange={(e)=>setInputParticipant(e.target.value)}
          size="medium"
          variant="standard"
          sx={{width:"100%"}}
        />
        <TextField
          required
          type="datetime-local"
          label="Time and Date"
          id="outlined-size-medium"
          value={inputTime}
          onChange={(e)=>setInputTime(e.target.value)}
          size="medium"
          variant="standard"
          sx={{width:"100%"}}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type='submit' variant='contained'>
          Create
        </Button>
      </Stack>
    </Paper>
  )
}

export default CreateEvent