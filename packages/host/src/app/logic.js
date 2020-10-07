import _ from 'lodash-es';
import { useEffect } from 'react';
import state from '../state';
import * as api from '../api';

export const useApp = () => {
  const [globalState, globalActions] = state.store();
  const { gameState } = globalState;

  const currentChannel = _.get(state, 'currentChannel');

  const onPlayerAdded = playerId => globalActions.addPlayer(playerId);
  const onPlayerDeleted = playerId => globalActions.deletePlayer(playerId);
  const onPlayerHired = ({ playerId, roleName }) => globalActions.hireRole({ playerId, roleName });
  const onPlayerRemoved = ({ roleName }) => globalActions.removePlayerFromRole(roleName);
  const onRoleAction = ({ type, payload }) => globalActions.roleAction(({ type, payload }));

  // handle websocket actions
  useEffect(() => {
    api.subscribeToPlayerAddition(onPlayerAdded);
    api.subscribeToPlayerDeletion(onPlayerDeleted);
    api.subscribeToRoleHire(onPlayerHired);
    api.subscribeToRemovePlayerFromRole(onPlayerRemoved);
    api.subscribeToRoleAction(onRoleAction);
  }, []);

  // broadcast any state updates
  useEffect(() => {
    api.sendGameState(gameState);
  }, [gameState]);

  return {
    currentChannel,
  };
};
