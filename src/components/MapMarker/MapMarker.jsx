import React from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import mapIcon from '../../utils/mapIcon';

import './map-marker.scss';

export default function MapMarker({ id, name, latitude, longitude }) {
  return (
    <Marker icon={mapIcon} position={[latitude, longitude]}>
      {id ? (
        <Popup
          closeButton={false}
          minWidth={240}
          maxWidth={240}
          className="map-popup"
        >
          {name}
          <Link to={`/estabelecimentos/${id}`}>
            <FiEdit size={20} color="#fff"></FiEdit>
          </Link>
        </Popup>
      ) : (
        <></>
      )}
    </Marker>
  );
}
