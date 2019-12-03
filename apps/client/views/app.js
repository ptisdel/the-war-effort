import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RolesView, TestView } from './index';
import api from '../api';

api.subscribeToEverything();

export const App = () => {
  return (
    <Switch>
      <Route exact path = '/' component = {TestView}/>
      <Route path = '/roles' component = {RolesView}/>
      <Redirect to='/' />
    </Switch>
  );
}
