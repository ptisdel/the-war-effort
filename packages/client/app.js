import _ from 'lodash';
import React, { useEffect } from 'react';
import common from '@the-war-effort/common';
import {
  AirSupportView,
  AudienceView,
  CommanderView,
  LogisticsView,
  TrainingView,
} from './views/index';
import * as api from './api';
import components from './components';
import state from './state';

const { constants, helpers, models } = common;

const { Layout } = components;
const { log } = helpers;
const { Role } = models;
const { allRoles } = constants;

const {
  subscribeToGameState,
  subscribeToRegistration,
  sendRegistrationRequest,
} = api;

const { store } = state;

export const App = () => {
  const [globalState, globalActions] = store();

  const { gameState, playerId } = globalState;
  const { roles } = gameState;

  const playerRole = _.find(roles, r => Role.getPlayer(r) === playerId);
  const playerRoleName = Role.getName(playerRole) || allRoles.AUDIENCE;

  useEffect(() => {
    subscribeToGameState(gs => globalActions.updateGameState(gs));
    subscribeToRegistration(pi => globalActions.setPlayerId(pi));
    sendRegistrationRequest();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    log('gameStateChange', 'Game State:', globalState.gameState);
  }, [globalState]);

  const getViewFromRole = () => {
    if (playerRoleName === allRoles.AIR_SUPPORT) return <AirSupportView/>;
    if (playerRoleName === allRoles.COMMANDER) return <CommanderView/>;
    if (playerRoleName === allRoles.LOGISTICS) return <LogisticsView/>;
    if (playerRoleName === allRoles.TRAINING) return <TrainingView/>;
    return <AudienceView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
};
