import _ from 'lodash';
import { models } from '../../common';
import roleActions from './role-actions';

const {
  GameState,
  Location,
  Role,
  Transport,
  TravelGroup,
} = models;

export const roleAction = (store, { type, payload }) => {
  const { commanderActions, logisticsActions } = roleActions;
  if (type === 'commander/increaseRoleBudget') commanderActions.increaseRoleBudget(store, payload);
  if (type === 'commander/decreaseRoleBudget') commanderActions.decreaseRoleBudget(store, payload);
  if (type === 'logistics/createTravelGroup') logisticsActions.createTravelGroup(store, payload);
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

export const travelGroupArrival = (store, { gameState, travelGroup }) => {
  const destinationName = TravelGroup.getDestinationName(travelGroup);
  const destination = GameState.getLocationByName(gameState, destinationName);
  const transports = TravelGroup.getTransports(travelGroup);

  const allSentResources = _.reduce(
    transports,
    (acc, transport) => [...acc, ...Transport.getCargo(transport)],
    [],
  );

  const destinationResources = Location.getResources(destination);
  const newDestinationResources = [
    ...destinationResources,
    ...allSentResources,
  ];


  const allSentHeavyTransports = _.map(transports, t => ({
    ...t,
    cargo: [],
  }));

  const destinationHeavyTransports = Location.getHeavyTransports(destination);
  const newDestinationHeavyTransports = [
    ...destinationHeavyTransports,
    ...allSentHeavyTransports,
  ];

  const newDestination = {
    ...destination,
    heavyTransports: newDestinationHeavyTransports,
    resources: newDestinationResources,
  };

  const newTravelGroups = _.differenceWith(
    GameState.getTravelGroups(gameState),
    [travelGroup],
    _.isEqual,
  );

  const locations = GameState.getLocations(gameState);
  const newGameState = {
    ...gameState,
    travelGroups: newTravelGroups,
    locations: [
      ..._.differenceWith(locations, [destination], _.isEqual),
      newDestination,
    ],
  };

  store.setState({ gameState: newGameState });
};
