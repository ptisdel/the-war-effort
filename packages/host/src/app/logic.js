import _ from 'lodash-es';
import { useEffect } from 'react';
import state from '../state';
import * as api from '../api';

const {
  subscribeToPlayerAddition,
  subscribeToPlayerDeletion,
  subscribeToRoleAction,
  subscribeToRoleHire,
  subscribeToRemovePlayerFromRole,
  sendGameState,
} = api;

export const useApp = () => {
  const [globalState, globalActions] = state.store();

  const currentChannel = _.get(globalState, 'currentChannel');

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

  return {
    currentChannel,
  };
};
