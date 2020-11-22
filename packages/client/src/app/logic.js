import _ from 'lodash-es';
import { useEffect } from 'react';
import common from '@the-war-effort/common';
import * as api from '../api';
import { useStore } from '../hooks';

const { constants, helpers, models } = common;
const { log } = helpers;
const { Role } = models;

const { ALL_ROLES } = constants;

export const useApp = () => {
  const { gameActions, gameState, playerId } = useStore();

  const playerRole = _.find(gameState.roles, r => Role.getPlayerId(r) === playerId);
  const playerRoleName = Role.getName(playerRole) || ALL_ROLES.AUDIENCE;

  useEffect(() => {
    api.subscribeToGameState(gs => gameActions.updateGameState(gs));
    api.subscribeToRegistration(pi => gameActions.setPlayerId(pi));
    api.sendRegistrationRequest();
  }, []);

  useEffect(() => {
    log('gameStateChange', 'Game State:', gameState);
  }, [gameState]);

  return {
    role: playerRoleName,
  };
};
