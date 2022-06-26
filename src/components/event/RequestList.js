import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Request from './Request'

const RequestList = () => {
  const [request, setRequests] = useState([])
  const fetchData = () => {
    let data = [
      {
        id: 1,
        event_id: 1,
        requester: {
          username: "i am the requester",
          email: "string",
        },
        request_message: "helllloooooooooooooooo"
      },
      {
        id: 2,
        event_id: 1,
        requester: {
          username: "i am the requester 2",
          email: "string",
        },
        request_message: "helllloooooooooooooooo"
      }
    ]
    setRequests(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <Box sx={{p:2}}>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Typography variant='h5'>
          Requests
        </Typography>
        {request && request.map((val, idx)=> (
          <Request key={idx} commentData={val}/>
        ))}
      </Stack>
    </Box>

  )
}

export default RequestList