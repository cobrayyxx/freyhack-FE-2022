import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Request from './Request'

const RequestList = ({event, setEvent}) => {
  console.log(event)

  return (
    <Box sx={{p:2}}>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Typography variant='h5'>
          Requests
        </Typography>
        {event && event.requests.map((val, idx)=> (
          val.accept === null &&
          <Request key={idx} commentData={val}/>
        ))}
      </Stack>
    </Box>

  )
}

export default RequestList