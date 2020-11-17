import _ from 'lodash-es';
import common from '@the-war-effort/common';
import roleActions from './role-actions';

const { log } = common.helpers;
const {
  GameState,
  Location,
  Role,
  Transport,
  TravelGroup,
} = common.models;

const roleActionMap = {
  'airSupport/resupplyAircraft': roleActions.airSupportActions.resupplyAircraft,
  'commander/decreaseRoleBudget': roleActions.commanderActions.decreaseRoleBudget,
  'commander/increaseRoleBudget': roleActions.commanderActions.increaseRoleBudget,
  'commander/fireRole': roleActions.commanderActions.fireRole,
  'commander/requestBudgetIncrease': roleActions.commanderActions.requestBudgetIncrease,
  'groundForces/moveUnitGroups': roleActions.groundForcesActions.moveUnitGroups,
  'logistics/createTravelGroup': roleActions.logisticsActions.createTravelGroup,
  'procurement/startResearchingPrototype': roleActions.procurementActions.startResearchingPrototype,
  'publicAffairs/censorArticle': roleActions.publicAffairsActions.censorArticle,
  'training/createTrainingGroup': roleActions.trainingActions.createTrainingGroup,
};

export const roleAction = (store, { type, payload }) => {
  const action = _.get(roleActionMap, type);
  if (action) action(store, payload);
};

export const triggerMechanic = (store, { action, parameters }) => {
  action(store, parameters);
};

export const addPlayer = (store, playerId) => {
  const gameState = store.state;
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

  store.setState(newGameState);
};

export const deletePlayer = (store, playerId) => {
  const gameState = store.state;
  const { roles } = gameState;

  const newPlayers = _.without(gameState.players, playerId);
  const newRoles = _.filter(roles, r => Role.getPlayerId(r) === playerId);

  const newGameState = {
    ...gameState,
    players: newPlayers,
    roles: newRoles,
  };

  store.setState(newGameState);
};

export const hireRole = (store, { playerId, roleName }) => {
  const gameState = store.state;
  const { players, roles } = gameState;

  if (!roleName) return;

  // if role is already occupied, player cannot be hired for that role
  const roleAlreadyOccupied = _.some(roles, r => Role.getName(r) === roleName);
  if (roleAlreadyOccupied) return;

  const newRoles = [
    // if player occupies other role, remove him from previous role
    ..._.filter(roles, r => Role.getPlayerId(r) !== playerId),
    {
      name: roleName,
      playerId,
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

  store.setState(newGameState);
};

export const removePlayerFromRole = (store, roleName) => {
  const gameState = store.state;
  const { roles } = gameState;
  log('gameStateChange', 'Player removed from role', roleName);

  const newGameState = {
    ...gameState,
    roles: _.reject(roles, r => Role.getName(r) === roleName),
  };

  store.setState(newGameState);
};

export const travelGroupArrival = (store, { gameState, travelGroup }) => {
  const destinationId = TravelGroup.getDestinationId(travelGroup);
  const destination = GameState.getLocationById(gameState, destinationId);
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

  const allSentTransports = _.map(transports, t => ({
    ...t,
    cargo: [],
  }));

  const destinationUnits = Location.getUnits(destination);
  const newDestinationUnits = [
    ...destinationUnits,
    ...allSentTransports,
  ];

  const newDestination = {
    ...destination,
    units: newDestinationUnits,
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

  store.setState(newGameState);
};
