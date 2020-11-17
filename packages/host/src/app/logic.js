import _ from 'lodash-es';
import { useEffect } from 'react';
import * as api from '../api';
import { useStore } from '../hooks';

export const useApp = () => {
  const { gameActions, gameState } = useStore();

  const currentChannel = _.get(gameState, 'currentChannel');

  const onPlayerAdded = playerId => gameActions.addPlayer(playerId);
  const onPlayerDeleted = playerId => gameActions.deletePlayer(playerId);
  const onPlayerHired = ({ playerId, roleName }) => gameActions.hireRole({ playerId, roleName });
  const onPlayerRemoved = ({ roleName }) => gameActions.removePlayerFromRole(roleName);
  const onRoleAction = ({ type, payload }) => gameActions.roleAction(({ type, payload }));

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
