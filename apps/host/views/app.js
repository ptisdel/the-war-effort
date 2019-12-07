import React, { useEffect } from 'react';
import { NewsView } from './index';
import api from '../api';
import state from '../state';

const { store } = state;

export const App = () => {
  
  const [globalState, globalActions] = store();

  useEffect(() => {
    api.subscribeToPlayerAddition(playerId => globalActions.addPlayer(playerId));
    api.subscribeToPlayerDeletion(playerId => globalActions.deletePlayer(playerId));
    api.subscribeToRoleHire(({ playerId, roleName }) => globalActions.hireRole({ playerId, roleName }));
    api.subscribeToRoleFire(roleName => globalActions.fireRole(roleName));
    api.subscribeToRoleAction(({ type, payload }) => globalActions.roleAction(({ type, payload })));
  },[]);

  useEffect(() => {
    api.sendGameState(globalState.gameState);
  }, [ globalState ]);

  return <NewsView/>;
}
