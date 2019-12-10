import _ from 'lodash';
import * as helpers from './helpers';

const { formatMoney } = helpers;

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
  getFeatures: location => _.get(location, 'features'),
  getFeatureByName: (location, featureName) => _.get(Location.getFeatures(location), featureName),
  getResources: location => _.get(location, 'resources'),
});

export const Feature = ({
  getName: feature => _.get(feature, 'name'),
  getFaction: feature => _.get(feature, 'faction'),
})

export const Resource = ({
  getId: resource => _.get(resource, 'id'),
  getFaction: resource => _.get(resource, 'faction'),
  getName: resource => _.get(resource, 'name'),
  getSize: resource => _.get(resource, 'size'),
  getSkills: resource => _.get(resource, "skills"),
});

export const Transport = ({
  getCapacity: transport => _.get(transport, 'capacity'),
  getCargo: transport => _.get(transport, 'cargo'),
  getId: transport => _.get(transport, 'id'),
  getFaction: transport => _.get(transport, 'faction'),
  getName: transport => _.get(transport, 'name'),
})

export const TravelGroup = ({
  getDepartureTime: travelGroup => _.get(travelGroup, 'departureTime'),
  getDestinationName: travelGroup => _.get(travelGroup, 'destinationName'),
  getEscorts: travelGroup => _.get(travelGroup, 'escorts'),
  getETA: travelGroup => _.get(travelGroup, 'ETA'),
  getFaction: travelGroup => _.get(travelGroup, 'faction'),
  getOriginName: travelGroup => _.get(travelGroup, 'originName'),
  getTransports: travelGroup => _.get(travelGroup, 'transports'),
});

export const Theme = ({
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
})
