import { Box, Button, Divider, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateRequest = () => {
  let { id } = useParams()
  const [inputContent, setInputContent] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputContent)
    // let data = 
    // {
    //   "content": inputContent,
    //   "community_id": id,
    //   "creator": inputCreator,
    // }
    // try{
    //   let newData = await axios.post(`https://communify-be-api.herokuapp.com/api/v1/comment`, data)
    //   newData = newData.data
    //   commentsData.push(newData)
    //   setCommunityData((prevCommunityData) => ({...prevCommunityData, comments:commentsData}))
    // } catch(err) {
    //   console.log(err)
    //   setOpen(true)
    // }
  }

  return (
    <Box id="create-request-box" sx={{p:2,maxWidth:600}}>
        <Box component="form" onSubmit={handleSubmit} sx={{width:"90%"}}  >
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
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />} 
            sx={{mt:2}}>
              Send
          </Button>
        </Box>
    </Box>
  )
}

export default CreateRequest