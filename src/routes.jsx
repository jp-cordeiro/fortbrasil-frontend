import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import CreateEstablisment from './pages/Establishment/Establisment';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/SignIn/SignIn';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/estabelecimentos/novo" component={CreateEstablisment} />
        <Route path="/estabelecimentos/:id" component={CreateEstablisment} />
        <Route path="/estabelecimentos" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
