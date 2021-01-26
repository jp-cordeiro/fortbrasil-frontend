import React from 'react';
import { Marker } from 'react-leaflet';

import userIcon from '../../utils/userIcon';

import './user-marker.scss';

export default function UserMarker({ latitude, longitude }) {
  return (
    <Marker
      icon={userIcon}
      interactive={false}
      position={[latitude, longitude]}
    />
  );
}
