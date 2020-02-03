import React, { useEffect } from 'react';
import { NewsView } from './index';
import * as api from '../api';
import state from '../state';

const {
  subscribeToPlayerAddition,
  subscribeToPlayerDeletion,
  subscribeToRoleAction,
  subscribeToRoleHire,
  subscribeToRemovePlayerFromRole,
  sendGameState,
} = api;

const { store } = state;

export const App = () => {
  const [globalState, globalActions] = store();

  useEffect(() => {
    subscribeToPlayerAddition(playerId => globalActions.addPlayer(playerId));
    subscribeToPlayerDeletion(playerId => globalActions.deletePlayer(playerId));
    subscribeToRoleHire(({ playerId, roleName }) => globalActions.hireRole({ playerId, roleName }));
    subscribeToRemovePlayerFromRole(({ roleName }) => globalActions.removePlayerFromRole(roleName));
    subscribeToRoleAction(({ type, payload }) => globalActions.roleAction(({ type, payload })));
  }, []);

  useEffect(() => {
    sendGameState(globalState.gameState);
  }, [globalState]);

  return <NewsView/>;
};
