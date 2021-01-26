import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import './sign-up.scss';

export default function SignUp() {
  const history = useHistory();
  const { goBack } = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('users', { name, email, password });
      alert('Usuário cadastrado com sucesso!');
      history.push('/');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <div id="sign-up">
      <div className="sign-up-form">
        <form>
          <div className="logo">
            <img src={logo} />
          </div>
          {error ? (
            <ErrorMessage message="Erro na validação dos dados. Verifique e tente novamente." />
          ) : (
            ''
          )}
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              onChange={({ target }) => setName(target.value)}
              value={name}
              id="name"
            />
          </div>
          <div className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              id="email"
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              id="password"
            />
          </div>

          <button type="submit" className="btn-confirm" onClick={handleSubmit}>
            Cadastrar
          </button>
          <div className="back">
            <button title="Voltar" type="button" onClick={goBack}>
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
