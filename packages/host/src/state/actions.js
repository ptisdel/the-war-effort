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

export const updateRoom = (store, room) => {
  
  const gameState = store.state;
  
  const newGameState = {
    ...gameState,
    room,
  };

  store.setState(newGameState);
}

// TODO: move this to constants so server can enforce?
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

export const roleAction = (store, { type, data }) => {
  const action = _.get(roleActionMap, type);
  if (action) action(store, data);
};

export const triggerMechanic = (store, { action, parameters }) => {
  action(store, parameters);
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
