import React, { useEffect } from 'react';
import { CommanderView, RolesView } from './index';
import api from '../api';
import components from '../components';
import state from '../state';
import { Role } from '../../shared/models';
import { defaultRole } from '../../shared/constants';

const { Layout } = components;
const { store } = state;

export const App = () => {
  const [globalState, globalActions] = store();

  const { gameState, playerId } = globalState;
  const { roles } = gameState;

  const playerRole = _.find(roles, r => Role.getPlayer(r) === playerId);
  const playerRoleName = Role.getName(playerRole) || defaultRole;

  useEffect(() => {
    api.subscribeToGameState(gameState => globalActions.updateGameState(gameState));
    api.subscribeToRegistration(playerId => globalActions.setPlayerId(playerId));
    api.sendRegistrationRequest();
  },[]);

  useEffect(() => {
    console.log(globalState.gameState);
  }, [ globalState ]);

  const getViewFromRole = () => {
    if (playerRoleName === 'commander') return <CommanderView/>;
    return <RolesView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
}
