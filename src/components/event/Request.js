import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const Request = ({commentData}) => {
  const {user, token, getFromLocalStorage} = useContext(UserContext)

  useEffect(() => {
    getFromLocalStorage()
  }, [])
  
  return (
    <>
      {commentData && (
        <Box key={commentData.id} component="span" xs={{p: 4}}>
          <Typography variant="h6">{commentData.requester.username}</Typography>
          <Typography  variant="body2">{commentData.request_message}</Typography>
            <Box textAlign='end'>
              <Button>
                Accept
              </Button>
              <Button color="error">
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