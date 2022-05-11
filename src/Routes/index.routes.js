import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InitialPage from '../pages/InitialPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ InitialPage } />
    </Switch>
  );
}
