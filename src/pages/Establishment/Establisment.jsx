import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useHistory, useParams, withRouter } from 'react-router-dom';

import AutocompletePlace from '../../components/Autocomplete/Autocomplete';

import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';
import Sidebar from '../../components/Sidebar/Siderbar';

import './establishment.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CreateEstablisment() {
  const history = useHistory();
  const params = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [establishmentLocation, setEstablishmentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [initialLocation, setInitialLocation] = useState({
    latitude: -3.7541186,
    longitude: -38.5453079,
  });
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState(
    'Erro na validação dos dados. Verifique e tente novamente.'
  );

  function changeMessageError(error) {
    console.log(error.message);
    if (!error.validation) {
      setErrorMessage(error.message);
    }
    setError(error);
  }

  async function handleDeleteEstablishment() {
    if (window.confirm('Deseja realmente excluir esse estabelecimento?')) {
      await api.delete(`establishments/${params.id}`);
      alert('Estabelecimento excluído com sucesso.');
      history.push('/estabelecimentos');
    }
  }

  useEffect(() => {
    if (params.id) {
      api.get(`establishments/${params.id}`).then(
        async (response) => {
          const { data: establishment } = response;
          const location = {
            latitude: establishment.latitude,
            longitude: establishment.longitude,
          };
          setName(establishment.name);
          setDescription(establishment.description);
          setEstablishmentLocation(location);
          setInitialLocation(location);
        },
        ({ response }) => {
          changeMessageError(response);
        }
      );
    }
  }, []);

  const handleSelect = (place) => {
    const location = {
      latitude: place.center[1],
      longitude: place.center[0],
    };
    setEstablishmentLocation(location);
    setInitialLocation(location);
  };

  function SetViewOnClick() {
    const map = useMap();
    map.setView(
      [initialLocation.latitude, initialLocation.longitude],
      map.getZoom()
    );

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { latitude, longitude } = establishmentLocation;
    const establishment = {
      name,
      description,
      latitude,
      longitude,
    };

    if (!params.id) {
      try {
        await api.post('establishments', establishment);
        alert('Cadastro realizado com sucesso!');
        history.push('/estabelecimentos');
      } catch ({ response }) {
        changeMessageError(response.data);
      }
    } else {
      try {
        await api.patch(`establishments/${params.id}`, establishment);
        alert('Estabelecimento atualizado com sucesso!');
        history.push('/estabelecimentos');
      } catch ({ response }) {
        changeMessageError(response.data);
      }
    }
  }

  return (
    <div id="create-establisment">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-establishment-form">
          {error ? <ErrorMessage message={errorMessage} /> : ''}
          <fieldset>
            <MapContainer
              center={[initialLocation.latitude, initialLocation.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={16}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker
                interactive={false}
                icon={mapIcon}
                position={[
                  establishmentLocation.latitude,
                  establishmentLocation.longitude,
                ]}
              />
              <SetViewOnClick />
            </MapContainer>
            {establishmentLocation.latitude &&
            establishmentLocation.longitude ? (
              <footer>
                <a
                  className="routes-on-maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${establishmentLocation.latitude},${establishmentLocation.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            ) : (
              ''
            )}
            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <AutocompletePlace
                placeholder="Digite um endereço"
                onSelect={handleSelect}
              />
            </div>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="description">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="description"
                maxLength={300}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
          {params.id ? (
            <button
              onClick={handleDeleteEstablishment}
              className="delete-button"
              type="submit"
            >
              Excluir
            </button>
          ) : (
            ''
          )}
        </form>
      </main>
    </div>
  );
}

export default withRouter(CreateEstablisment);
