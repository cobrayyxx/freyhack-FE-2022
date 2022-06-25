import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import placeholeder_image from '../../img/placeholder-image.png'

const HomeCard = ({event}) => {
  let navigate = useNavigate()

  const redirect = () => {
    navigate(
      `/event/${event.id}`,
      {state: {
        event: event
      }}

    )
  }

  return (
      <Card sx={{ width: "300px", margin: 'auto'}}>
        {/* <CardMedia
          component="img"
          width="100%"
          height={200}
          image={event.picture ? event.picture: placeholeder_image}
          alt={`Picture of ${event.name}`}
        /> */}
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {new Date(event.date_time).getDate()}-{new Date(event.date_time).getMonth()}-{new Date(event.date_time).getFullYear()}
          </Typography>
          <Typography variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {event.location}
          </Typography>
          <Typography variant="body2">
            {event.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={redirect}>Learn More</Button>
        </CardActions>
      </Card>
  )
}

export default HomeCard