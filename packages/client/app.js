import _ from 'lodash';
import React, { useEffect } from 'react';
import common from '@the-war-effort/common';
import {
  CommanderView,
  LogisticsView,
  AudienceView,
} from './views/index';
import * as api from './api';
import components from './shared';
import state from './state';

const { constants, models } = common;

const { Layout } = components;
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
    console.log('Game State:', globalState.gameState);
  }, [globalState]);

  const getViewFromRole = () => {
    if (playerRoleName === allRoles.COMMANDER) return <CommanderView/>;
    if (playerRoleName === allRoles.LOGISTICS) return <LogisticsView/>;
    return <AudienceView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
};
