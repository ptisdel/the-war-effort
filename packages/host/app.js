import _ from 'lodash';
import React, { useEffect } from 'react';
import { MapView, NewsView } from './views';
import * as api from './api';
import * as constants from './constants';
import state from './state';
import { GameEngine } from './components';

const { CHANNELS } = constants;

const {
  subscribeToPlayerAddition,
  subscribeToPlayerDeletion,
  subscribeToRoleAction,
  subscribeToRoleHire,
  subscribeToRemovePlayerFromRole,
  sendGameState,
} = api;

const { store } = state;

export const App = () => {
  const [globalState, globalActions] = store();

  const currentChannel = _.get(globalState, 'currentChannel');

  useEffect(() => {
    subscribeToPlayerAddition(playerId => globalActions.addPlayer(playerId));
    subscribeToPlayerDeletion(playerId => globalActions.deletePlayer(playerId));
    subscribeToRoleHire(({ playerId, roleName }) => globalActions.hireRole({ playerId, roleName }));
    subscribeToRemovePlayerFromRole(({ roleName }) => globalActions.removePlayerFromRole(roleName));
    subscribeToRoleAction(({ type, payload }) => globalActions.roleAction(({ type, payload })));
  }, []);

  useEffect(() => {
    sendGameState(globalState.gameState);
  }, [globalState]);

  const renderView = () => {
    if (currentChannel === CHANNELS.news) { return <NewsView/>; }
    if (currentChannel === CHANNELS.map) { return <MapView/>; }
    return <MapView/>;
  };

  return (
    <div>
      <GameEngine/>
      { renderView() }
    </div>
  );
};
