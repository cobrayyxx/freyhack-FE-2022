import React from 'react'
import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const CobaMap = () => {
  const position = [-6.1754, 106.8272]
  return(
    <MapContainer center={position} zoom={40} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Event Location
        </Popup>
      </Marker>
    </MapContainer>
  )
}


export default CobaMap
