import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NewsView, TestView } from './index';
import api from '../api';
import state from '../state';

const { store } = state;

export const App = () => {
  
  const [globalState, globalActions] = store();

  useEffect(() => {
    api.subscribeToPlayerAddition(playerId => globalActions.addPlayer(playerId));
    api.subscribeToPlayerDeletion(playerId => globalActions.deletePlayer(playerId));
    api.subscribeToRoleHire(({ playerId, role }) => globalActions.hireRole({ playerId, role }));
    api.subscribeToRoleFire(role => globalActions.fireRole(role));
    api.subscribeToMessages(msg => globalActions.addMessage(msg));
  },[]);

  useEffect(() => {
    api.sendGameState(globalState.gameState);
  }, [ globalState ]);

  return <Switch>
    <Route exact path = '/' component = {TestView}/>
    <Route exact path = '/news' component = {NewsView}/>
    <Redirect to = '/' />
  </Switch>;
}
