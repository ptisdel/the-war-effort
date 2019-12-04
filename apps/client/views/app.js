import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RolesView, TestView } from './index';
import api from '../api';
import useGlobal from '../state/store';

export const App = () => {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    api.subscribeToGameState(gameState => globalActions.updateGameState(gameState));
    api.subscribeToMessages(msg => globalActions.addMessage(msg));
    api.subscribeToRegistration(playerId => globalActions.setPlayerId(playerId));
    api.sendRegistrationRequest();
  },[]);

  return (
    <Switch>
      <Route exact path = '/' component = {TestView}/>
      <Route path = '/roles' component = {RolesView}/>
      <Redirect to='/' />
    </Switch>
  );
}
