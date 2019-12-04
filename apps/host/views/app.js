import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TestView } from './index';
import api from '../api';
import useGlobal from '../state/store';

export const App = () => {
  
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    api.subscribeToPlayerRegistration(({ playerId, role }) => globalActions.addPlayer({ playerId, role }));
    api.subscribeToPlayerDeregistration(playerId => globalActions.removePlayer(playerId));
    api.subscribeToMessages(msg => globalActions.addMessage(msg));
  },[]);

  useEffect(() => {
    api.sendGameState(globalState.gameState);
  }, [ globalState ]);

  return <Switch>
    <Route exact path = '/' component = {TestView}/>
    <Redirect to = '/' />
  </Switch>;
}
