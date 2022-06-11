import _ from 'lodash-es';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { sendMessage, subscribe, unsubscribe } from '@/api';

import common from '@the-war-effort/common';
const { ALL_ROLES } = common.constants;

const useUnsharableStore = () => {
  const [gameState, setGameState] = useState({})
  const [playerId, setPlayerId] = useState(null);

  const onGameStateChanged = gameState => setGameState(gameState);
  const onPlayerRegistered = playerId => setPlayerId(playerId);

  useEffect(() => {
    subscribe('game-state-updated', onGameStateChanged);
    subscribe('player-registered', onPlayerRegistered);
    sendMessage('request-registration');
    console.log('trying to register');

    return () => {
        unsubscribe('game-state-updated', onGameStateChanged);
        unsubscribe('player-registered', onPlayerRegistered);
    };
  }, []);

  const playerRole = _.find(gameState.roles, r => r?.playerId === playerId);
  const playerRoleName = playerRole?.name;

  return {
        gameState,
        playerId,
        playerRole: playerRoleName,
    };
};

export const useStore = () => useBetween(useUnsharableStore);