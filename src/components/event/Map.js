import React from 'react'
import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Box } from '@mui/material';


const Map = ({position, location}) => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [14, 43]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  return(
    <Box sx={{height: 300}}>
    <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {location}
        </Popup>
      </Marker>
    </MapContainer>
    </Box>

  )
}


export default Map
