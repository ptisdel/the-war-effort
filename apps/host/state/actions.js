import _ from 'lodash';
import { models } from '../../shared';

const { Role } = models;

export const setHostId = (store, hostId) => {
  store.setState({ hostId });
};

export const addPlayer = (store, playerId) => {
  const { gameState } = store.state;
  const players = gameState.players;
  
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

  console.log(newGameState);

  store.setState({ gameState: newGameState })
};

export const deletePlayer = (store, playerId) => {
  const { gameState } = store.state;
  const roles = gameState.roles;

  const currentPlayerRole = _.findKey(roles, r => Role.getPlayer(r) === playerId);

  const newPlayers = _.pull(gameState.players, playerId);
  
  const newRoles = _.omit(roles, currentPlayerRole);

  const newGameState = {
    ...gameState,
    players: newPlayers,
    roles: newRoles,
  };
  
  store.setState({ gameState: newGameState })
}

export const hireRole = (store, { playerId, role }) => { 
  const { gameState } = store.state;
  const { players, roles } = gameState;

  // if player is not registered, or no role sent, player cannot be hired
  if (!_.includes(players, playerId) || !role) return;

  // if role is already occupied, player cannot be hired for that role
  const roleAlreadyOccupied = _.has(roles, role);
  if (roleAlreadyOccupied) return;

  const newRoles = {
    ..._.omitBy(roles, r => Role.getPlayer(r) === playerId),
    [role]: {
      player: playerId,
      budget: 0,
    },
  };

  const newGameState = {
    ...gameState,
    roles: newRoles,
  }

  console.log(newGameState);

  store.setState({ gameState: newGameState });
};

export const fireRole = (store, role) => {
  const { gameState } = store.state;
  const { roles } = gameState;

  const newGameState = {
    ...gameState,
    roles: _.omit(roles, role),
  };

  store.setState({ gameState: newGameState });
}

export const addMessage = (store, msg) => {
  const messages = [
    ...store.state.messages,
    msg,
  ];

  store.setState({ messages });
};
