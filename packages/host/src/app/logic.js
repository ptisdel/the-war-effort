import _ from 'lodash-es';
import { useEffect } from 'react';
import { sendMessage, subscribe, unsubscribe } from '@/api';
import { useStore } from '../hooks';

export const useApp = () => {
  const { gameActions, gameState } = useStore();

  const currentChannel = _.get(gameState, 'currentChannel');

  const onPlayerAdded = playerId => gameActions.addPlayer(playerId);
  const onRoleRequested = ({ playerId, roleName }) => gameActions.hireRole({ playerId, roleName });
  const onPlayerResigned = playerId => gameActions.removePlayerFromRole(playerId);
  const onPlayerDeleted = playerId => gameActions.deletePlayer(playerId);
  const onRoleAction = ({ type, payload }) => gameActions.roleAction(({ type, payload }));

  // handle websocket actions
  useEffect(() => {

    subscribe('add-player', onPlayerAdded);
    subscribe('role-requested', onRoleRequested);
    subscribe('player-resigned', onPlayerResigned);
    subscribe('delete-player', onPlayerDeleted);
    subscribe('role-action', onRoleAction);

    return () => {
      unsubscribe('add-player', onPlayerAdded);
      unsubscribe('role-requested', onRoleRequested);
      unsubscribe('player-resigned', onPlayerResigned);
      unsubscribe('delete-player', onPlayerDeleted);
      unsubscribe('role-action', onRoleAction);
    };
  }, []);

  // broadcast any state updates
  useEffect(() => {
    console.log('gamestate updated');
    sendMessage('game-state-updated', gameState);
  }, [gameState]);

  return {
    currentChannel,
  };
};
