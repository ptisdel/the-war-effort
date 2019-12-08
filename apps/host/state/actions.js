import _ from 'lodash';
import { models } from '../../common';
import roleActions from './role-actions';

const { Role } = models;

export const roleAction = (store, { type, payload }) => {
  const { commanderActions, logisticsActions } = roleActions;
  if (type === 'commander/increaseRoleBudget') commanderActions.increaseRoleBudget(store, payload);
  if (type === 'commander/decreaseRoleBudget') commanderActions.decreaseRoleBudget(store, payload);
  if (type === 'logistics/createTravelGroup') logisticsActions.createTravelGroup(store, payload);
};

export const setHostId = (store, hostId) => {
  store.setState({ hostId });
};

export const addPlayer = (store, playerId) => {
  const { gameState } = store.state;
  const { players } = gameState;

  const playerAlreadyExists = playerId && _.includes(players, playerId);
  if (!playerId || playerAlreadyExists) return;

  const newPlayers = [
    ...gameState.players,
    playerId,
  ];

  const newGameState = {
    ...gameState,
    players: newPlayers,
  };

  store.setState({ gameState: newGameState });
};

export const deletePlayer = (store, playerId) => {
  const { gameState } = store.state;
  const { roles } = gameState;

  const newPlayers = _.without(gameState.players, playerId);
  const newRoles = _.filter(roles, r => Role.getPlayer(r) === playerId);

  const newGameState = {
    ...gameState,
    players: newPlayers,
    roles: newRoles,
  };

  store.setState({ gameState: newGameState });
};

export const hireRole = (store, { playerId, roleName }) => {
  const { gameState } = store.state;
  const { players, roles } = gameState;

  if (!roleName) return;

  // if role is already occupied, player cannot be hired for that role
  const roleAlreadyOccupied = _.some(roles, r => Role.getName(r) === roleName);
  if (roleAlreadyOccupied) return;

  const newRoles = [
    // if player occupies other role, remove him from previous role
    ..._.filter(roles, r => Role.getPlayer(r) !== playerId),
    {
      name: roleName,
      player: playerId,
      budget: 0,
    },
  ];


  const playerExists = _.some(players, p => p === playerId);
  const newPlayers = [
    ...(playerExists ? players : [...players, playerId]),
  ];

  const newGameState = {
    ...gameState,
    roles: newRoles,
    players: newPlayers,
  };

  store.setState({ gameState: newGameState });
};

export const removePlayerFromRole = (store, roleName) => {
  const { gameState } = store.state;
  const { roles } = gameState;

  const newGameState = {
    ...gameState,
    roles: _.filter(roles, r => Role.getName(r) === roleName),
  };

  store.setState({ gameState: newGameState });
};
