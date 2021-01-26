import React, { useEffect, useState } from 'react';
import { distance } from 'turf';
import { orderBy } from 'lodash';
import MapConatiner from '../../components/MapContainer/MapConatiner';
import mapMakerImg from '../../assets/establishment-home.png';
import api from '../../services/api';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './dashboard.scss';

export default function Dashboard() {
  const [establishments, setEstablishments] = useState([]);
  const [distances, setDistances] = useState([]);
  const [pickedLocation, setPickedLocation] = useState({});

  let user = JSON.parse(sessionStorage.getItem('user'));

  const [myLocation, setMyLocation] = useState({
    latitude: -3.7541186,
    longitude: -38.5453079,
  });

  useEffect(() => {
    api.get('establishments').then(({ data }) => {
      data.every((establishment) => {
        let establishmentDistance = distance(Object.values(myLocation), [
          parseFloat(establishment.latitude),
          parseFloat(establishment.longitude),
        ]);
        establishment.distance = establishmentDistance.toFixed(2);
        return true;
      });

      const distances = orderBy(data, ['distance']).slice(0, 5);

      setDistances(distances);

      setEstablishments(data);
    });
  }, []);

  return (
    <div id="dashboard">
      <aside>
        <header>
          <img src={mapMakerImg} alt="Estabelecimento" />
          <h2>Bem-vindo {user.name}!</h2>
        </header>
        <div className="distances-pane">
          <div className="title">Estou longe?</div>
          {distances.map((distanceEstablishment) => (
            <div
              key={distanceEstablishment.id}
              className="row-pane"
              onClick={() =>
                setPickedLocation({
                  latitude: distanceEstablishment.latitude,
                  longitude: distanceEstablishment.longitude,
                })
              }
            >
              {distanceEstablishment.name} - {distanceEstablishment.distance}{' '}
              Kms
            </div>
          ))}
        </div>
        <footer>
          <strong>Ceará</strong>
          <span>Fortaleza</span>
        </footer>
      </aside>
      <MapConatiner
        establishments={establishments}
        initialLocation={myLocation}
        pickedLocation={pickedLocation.latitude ? pickedLocation : myLocation}
      />
      <Link to="/estabelecimentos/novo" className="create-establishment">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}
