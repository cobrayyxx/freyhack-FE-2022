import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const CreateRequest = ({event, setEvent, onClose}) => {
  let { id } = useParams()
  const [inputContent, setInputContent] = useState('')
  const {getFromLocalStorage, token} = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputContent)

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    let data = {
      "event_id": id,
      "requester_id": "string",
      "request_message": inputContent,
      "accept": null
    }
    window.location.reload()
    try{
      await axios.post(`https://freyhack-be-2022.herokuapp.com/api/v1/request`, data, options)
    } catch(err) {
      console.log(err)
      if (err.response && err.response.status === 401){
        navigate('/login')
      } else {
        alert("Something went wrong")
      }
    }
    onClose()
  }

  useEffect(() => {
    getFromLocalStorage()
  }, [])
  

  return (
    <Box id="create-request-box" sx={{p:2,maxWidth:600}}>
        <Typography variant='h5'>
          Write a message
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{width:"100%"}}  >
          <TextField
            multiline
            required
            label="Request message"
            id="outlined-size-normal"
            placeholder="Write a message"
            value={inputContent}
            onChange={(e)=>setInputContent(e.target.value)}
            size="normal" 
            variant="standard"
            sx={{width:"100%"}}
            
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />} 
              sx={{mt:2}}>
                Send
            </Button>
          </Box>

        </Box>
    </Box>
  )
}

export default CreateRequest