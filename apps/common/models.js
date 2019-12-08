import _ from 'lodash';
import * as constants from './constants';
import * as helpers from './helpers';

const { formatMoney } = helpers;
const { defaultLocations } = constants;

export const GameState = ({
  getHeavyTransports: gameState => _.get(gameState, 'heavyTransports'),
  getLocations: gameState => _.get(gameState, 'locations'),
  getLocationByName: (gameState, locationName) =>
    _.find(GameState.getLocations(gameState), l => Location.getName(l) === locationName),
  getLocationResources: (gameState, locationName) => 
    Location.getResources(GameState.getLocationByName(gameState, locationName)),
  getLocationHeavyTransports: (gameState, locationName) => 
    Location.getHeavyTransports(GameState.getLocationByName(gameState, locationName)),
  getTravelGroups: gameState => _.get(gameState, 'travelGroups'),
});

export const Budget = ({
  getFormattedTotal: budget => {
    return formatMoney(budget || 0);
  },
});

export const Role = ({
  getBudget: role => _.get(role, 'budget'),
  getFormattedBudget: role => Budget.getFormattedTotal(Role.getBudget(role)),
  getPlayer: role => _.get(role, 'player'),
  getName: role => _.get(role, 'name'),
});

export const Location = ({
  getHeavyTransports: location => _.get(location, 'heavyTransports'),
  getName: location => _.get(location, 'name'),
  getResources: location => _.get(location, 'resources'),
});

export const Resource = ({
  getId: resource => _.get(resource, 'id'),
  getType: resource => _.get(resource, 'type'),
  getSize: resource => _.get(resource, 'size'),
});

export const Transport = ({
  getId: location => _.get(location, 'id'),
  getName: location => _.get(location, 'name'),
  getCargo: location => _.get(location, 'cargo'),
  getCapacity: location => _.get(location, 'capacity'),
})

export const TravelGroup = ({
  getDepartureTime: travel => _.get(travel, 'departureTime'),
  getDestinationName: travel => _.get(travel, 'destinationName'),
  getEscorts: travel => _.get(travel, 'escorts'),
  getETA: travel => _.get(travel, 'ETA'),
  getOriginName: travel => _.get(travel, 'originName'),
  getTransports: travel => _.get(travel, 'transports'),
});

export const Theme = ({
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
})
