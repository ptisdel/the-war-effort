import _ from 'lodash-es';
import { useEffect } from 'react';
import { sendMessage, subscribe, unsubscribe } from '@/api';
import { useStore } from '../hooks';

export const useApp = () => {
  const { gameActions, gameState } = useStore();

  const currentChannel = _.get(gameState, 'currentChannel');

  const onRoleAction = ({ type, data }) => gameActions.roleAction(({ type, data }));
  const onRoomUpdated = room => gameActions.updateRoom(room);

  // handle websocket actions
  useEffect(() => {
    subscribe('role-action', onRoleAction);
    subscribe('room-updated', onRoomUpdated);

    return () => {
      unsubscribe('role-action', onRoleAction);
      unsubscribe('room-updated', onRoomUpdated);
    };
  }, []);

  // broadcast any state updates
  useEffect(() => {
    console.log('gamestate updated', gameState);
    sendMessage('game-state-updated', gameState);
  }, [gameState]);

  return {
    currentChannel,
  };
};
