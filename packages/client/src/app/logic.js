import _ from 'lodash-es';
import { useEffect } from 'react';
import common from '@the-war-effort/common';
import * as api from '../api';
import state from '../state';


const { constants, helpers, models } = common;
const { log } = helpers;
const { Role } = models;

const { allRoles } = constants;
const {
  subscribeToGameState,
  subscribeToRegistration,
  sendRegistrationRequest,
} = api;


export const useApp = () => {
  const [globalState, globalActions] = state.store();
  const { gameState, playerId } = globalState;

  const playerRole = _.find(gameState.roles, r => Role.getPlayerId(r) === playerId);
  const playerRoleName = Role.getName(playerRole) || allRoles.AUDIENCE;

  useEffect(() => {
    subscribeToGameState(gs => globalActions.updateGameState(gs));
    subscribeToRegistration(pi => globalActions.setPlayerId(pi));
    sendRegistrationRequest();
  }, []);

  useEffect(() => {
    log('gameStateChange', 'Game State:', gameState);
  }, [gameState]);

  return {
    role: playerRoleName,
  };
};
