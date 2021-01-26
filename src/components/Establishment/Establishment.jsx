import React from 'react';
import { MapContainer } from 'react-leaflet';
import MapMarker from '../MapMarker/MapMarker';
import Sidebar from '../Sidebar/Siderbar';

export default function Establishment({ establishment }) {
  return (
    <div id="page-establishment">
      <Sidebar />
      <main>
        <div className="establishment-details">
          <h1>{establishment.name}</h1>
          <p>{establishment.description}</p>

          <div className="map-container">
            <MapContainer
              center={[establishment.latitude, establishment.longitude]}
              zoom={16}
              style={{ width: '100%', height: 280 }}
              dragging={false}
              touchZoom={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <MapMarker
                id={0}
                name={establishment.name}
                latitude={establishment.latitude}
                longitude={establishment.longitude}
              ></MapMarker>
            </MapContainer>
            <footer>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
              >
                Ver rotas no Google Maps
              </a>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
