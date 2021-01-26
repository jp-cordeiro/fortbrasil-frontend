import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import api from '../../services/api';

import './sign-in.scss';

function SignIn() {
  const history = useHistory();

  const [email, setEmail] = useState('admin@teste.com');
  const [password, setPassword] = useState('123456');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await api.post('sessions', { email, password });
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      history.push('/estabelecimentos');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="sign-in">
      <div className="sign-in-image"></div>
      <div className="sign-in-form">
        <form>
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
            Entrar
          </button>
          <div className="sign-up-link">
            <Link to="/sign-up">Ainda não possui usuário? Crie um aqui!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
