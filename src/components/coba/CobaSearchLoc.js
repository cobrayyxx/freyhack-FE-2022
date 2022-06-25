import React, { useRef, useState } from 'react'
import axios from 'axios';
import {Divider, IconButton, Paper, Stack, TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsIcon from '@mui/icons-material/Directions';

const CobaSearchLoc = () => {
  const [searchResult, setSearchResult] = useState([])
  const [inputLocation, setInputLocation] = useState('')
  const [inputLat, setInputLat] = useState(0)
  const [inputLon, setInputLon] = useState(0)

  const handleSearch = async (e) => {
    console.log(e.target.value)
    setInputLocation(e.target.value)
    try{
      let res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${e.target.value}`)
      setSearchResult(res.data)
      console.log(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const handleLocationChange = (val) => {
    setInputLocation(val.display_name)
    setInputLat(val.lat)
    setInputLon(val.lon)
    setSearchResult([])
  }

  const clearLocation = () => {
    setInputLocation('')
    setSearchResult([])
  }

  return (
    <>
      <br/>Current Selected Location : {inputLocation} <br/>
      &#123; {inputLat}, {inputLon} &#125;<br/>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
      <TextField
        value={inputLocation}
        label="Location"
        id="outlined-size-small"
        onChange={handleSearch}
        size="small"
        variant="standard"
        sx={{width:"100%"}}
      />
      <IconButton type="submit" sx={{ p: '10px', w:"20px", h:"10px" }} aria-label="clear">
        <CloseIcon onClick={clearLocation}/>
      </IconButton>
    </Paper>
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <Stack 
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        Bikin format biar clickable, kalo di klik location sm koordinatnya di set
        {searchResult.map((val,idx) => (
          <Typography key={idx} onClick={() => handleLocationChange(val)} variant='body'>
            {val.display_name}
          </Typography>
        ))}
      </Stack>
    </Paper>
    </>
  )
}

export default CobaSearchLoc