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

  const dateFormat = (date) => {
    date = new Date(date)
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}, ${date.toLocaleTimeString()}`
  }

  return (
      <Card sx={{ width: "280px", margin: 'auto'}}>
        <CardContent>
          <Typography noWrap sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dateFormat(event.date_time)}
          </Typography>
          <Typography noWrap variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} noWrap color="text.secondary" >
            {event.location}
          </Typography>
          <Typography variant="body2" sx={{height:80, overflow:"hidden", whiteSpace:'normal' }}>
            {event.description}
          </Typography>
        </CardContent>
        <CardActions sx={{p:2, display: "flex", justifyContent: "flex-end"}}>
          <Button size="small" onClick={redirect}>Learn More</Button>
        </CardActions>
      </Card>
  )
}

export default HomeCard