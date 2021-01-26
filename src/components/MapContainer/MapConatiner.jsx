import React from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { MapContainer } from 'react-leaflet';
import MapMarker from '../MapMarker/MapMarker';
import userIcon from '../../utils/userIcon';
import mapIcon from '../../utils/mapIcon';
import { Marker } from 'leaflet';
import UserMarker from '../UserMarker/UserMarker';

export default function MapConatiner({
  establishments,
  initialLocation,
  pickedLocation,
}) {
  function SetViewOnClick() {
    const map = useMap();
    map.setView(
      [pickedLocation.latitude, pickedLocation.longitude],
      map.getZoom()
    );

    return null;
  }

  let TILE_LAYER = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
  `;

  return (
    <MapContainer
      center={[initialLocation.latitude, initialLocation.longitude]}
      zoom={14}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer url={TILE_LAYER} />
      {establishments.map((establishment) => (
        <MapMarker key={establishment.id} {...establishment} />
      ))}
      <UserMarker
        latitude={initialLocation.latitude}
        longitude={initialLocation.longitude}
      />
      <SetViewOnClick />
    </MapContainer>
  );
}
