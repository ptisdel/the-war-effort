import _ from 'lodash';
import React, { useEffect } from 'react';
import {
  CommanderView,
  LogisticsView,
  AudienceView,
} from './views/index';
import api from './api';
import components from './components';
import state from './state';
import { Role } from '../shared/models';
import { defaultRole, allRoles } from '../shared/constants';

const { Layout } = components;
const { store } = state;

export const App = () => {
  const [globalState, globalActions] = store();

  const { gameState, playerId } = globalState;
  const { roles } = gameState;

  const playerRole = _.find(roles, r => Role.getPlayer(r) === playerId);
  const playerRoleName = Role.getName(playerRole) || defaultRole;

  useEffect(() => {
    api.subscribeToGameState(gs => globalActions.updateGameState(gs));
    api.subscribeToRegistration(pi => globalActions.setPlayerId(pi));
    api.sendRegistrationRequest();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    console.log(globalState.gameState);
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
