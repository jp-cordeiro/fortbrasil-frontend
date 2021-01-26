import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import './sign-in.scss';

function SignIn() {
  const history = useHistory();

  const [email, setEmail] = useState('admin@teste.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  if (sessionStorage.getItem('token')) {
    history.push('/estabelecimentos');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await api.post('sessions', { email, password });
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      history.push('/estabelecimentos');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <div id="sign-in">
      <div className="sign-in-form">
        <form>
          <div className="logo">
            <img src={logo} />
          </div>
          {error ? (
            <ErrorMessage message="E-mail ou senha incorretos, tente novamente." />
          ) : (
            ''
          )}
          <div className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="email"
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
            Entrar
          </button>
          <div className="sign-up-link">
            <Link to="/novo-usuario">
              Ainda não possui usuário? Crie um aqui!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
