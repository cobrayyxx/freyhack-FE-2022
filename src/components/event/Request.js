import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Request = ({commentData}) => {
  const {token, getFromLocalStorage} = useContext(UserContext)
  let navigate = useNavigate()

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  const handleAccept = async () => {
    let data = {
      "accept": true
    }
    try{
      await axios.put(`https://freyhack-be-2022.herokuapp.com/api/v1/request/acc/${commentData.id}`, data, options)
    } catch(err) {
      console.log(err)
      if (err.response && err.response.status === 401){
        navigate('/login')
      } else if (err.response && err.response.data) {
        alert(err.response.data.detail)
      } else  {
        alert("Something went wrong")
      }
    }
  }

  const handleDecline = async () => {
    try{
      await axios.delete(`https://freyhack-be-2022.herokuapp.com/api/v1/request/reject/${commentData.id}`, options)
    } catch(err) {
      console.log(err)
      if (err.response && err.response.status === 401){
        navigate('/login')
      } else {
        alert("Something went wrong")
      }
    }
  }
  
  return (
    <>
      {commentData && (
        <Box key={commentData.id} component="span" xs={{p: 4}}>
          <Typography variant="h6">{commentData.requester_id}</Typography>
          <Typography  variant="body2">{commentData.request_message}</Typography>
            <Box textAlign='end'>
              <Button onClick={handleAccept}>
                Accept
              </Button>
              <Button color="error" onClick={handleDecline}>
                Decline
              </Button>
            </Box>
        </Box>
      )
      }
    </>
  )
}

export default Request