import _ from 'lodash';
import * as helpers from './helpers';

const { formatMoney } = helpers;

export const Budget = ({
  getFormattedTotal: budget => formatMoney(budget || 0),
});

export const Role = ({
  getBudget: role => _.get(role, 'budget'),
  getFormattedBudget: role => Budget.getFormattedTotal(Role.getBudget(role)),
  getPlayer: role => _.get(role, 'player'),
  getName: role => _.get(role, 'name'),
});

export const Resource = ({
  getType: resource => _.get(resource, 'type'),
  getFaction: resource => _.get(resource, 'faction'),
  getName: resource => _.get(resource, 'name'),
});

export const Unit = ({
  getId: unit => _.get(unit, 'id'),
  getType: unit => _.get(unit, 'type'),
  getFaction: unit => _.get(unit, 'faction'),
  getName: unit => _.get(unit, 'name'),
  getNumber: unit => _.get(unit, 'number'),
  getSize: unit => _.get(unit, 'size'),
  getStats: unit => _.get(unit, 'stats'),
  getStatByName: (unit, statName) => _.get(Unit.getStats(unit), statName),
});

export const Feature = ({
  getId: feature => _.get(feature, 'id'),
  getName: feature => _.get(feature, 'name'),
  getFaction: feature => _.get(feature, 'faction'),
  getType: feature => _.get(feature, 'type'),
  getMaxTraineeCount: feature => _.get(feature, 'maxTraineeCount'),
  getTraineeCount: feature => _.get(feature, 'traineeCount'),
  getTrainingOffered: feature => _.get(feature, 'trainingOffered'),
});

export const Location = ({
  getHeavyTransports: location => _.get(location, 'heavyTransports'),
  getName: location => _.get(location, 'name'),
  getFeatures: location => _.get(location, 'features'),
  getFeatureById: (location, featureId) => _.find(
    Location.getFeatures(location),
    f => Feature.getId(f) === featureId,
  ),
  getFactionFeaturesByName: (location, factionName, featureName) => _.filter(
    Location.getFeatures(location),
    f => Feature.getName(f) === featureName && Feature.getFaction(f) === factionName,
  ),
  getFactionFeaturesByType: (location, factionName, featureType) => _.filter(
    Location.getFeatures(location),
    f => Feature.getType(f) === featureType && Feature.getFaction(f) === factionName,
  ),
  getResources: location => _.get(location, 'resources'),
  getResourcesByFaction: (location, factionName) => _.filter(
    Location.getResources(location),
    r => Resource.getFaction(r) === factionName,
  ),
  getUnits: location => _.get(location, 'units'),
  getUnitsByFaction: (location, factionName) => _.filter(
    Location.getUnits(location),
    u => Unit.getFaction(u) === factionName,
  ),
});

export const Transport = ({
  getCapacity: transport => _.get(transport, 'capacity'),
  getCargo: transport => _.get(transport, 'cargo'),
  getId: transport => _.get(transport, 'id'),
  getFaction: transport => _.get(transport, 'faction'),
  getName: transport => _.get(transport, 'name'),
});

export const TrainingPath = ({
  getGraduateType: trainingPath => _.get(trainingPath, 'graduateType'),
  getLength: trainingPath => _.get(trainingPath, 'length'),
  getName: trainingPath => _.get(trainingPath, 'name'),
  getTraineeType: trainingPath => _.get(trainingPath, 'traineeType'),
});

export const TrainingGroup = ({
  getEnd: trainingGroup => _.get(trainingGroup, 'end'),
  getFeatureId: trainingGroup => _.get(trainingGroup, 'featureId'),
  getGraduateType: trainingGroup => _.get(trainingGroup, 'graduateType'),
  getStart: trainingGroup => _.get(trainingGroup, 'start'),
  getTraineeCount: trainingGroup => _.get(trainingGroup, 'traineeCount'),
});

export const TravelGroup = ({
  getDepartureTime: travelGroup => _.get(travelGroup, 'departureTime'),
  getDestinationName: travelGroup => _.get(travelGroup, 'destinationName'),
  getEscorts: travelGroup => _.get(travelGroup, 'escorts'),
  getETA: travelGroup => _.get(travelGroup, 'ETA'),
  getFaction: travelGroup => _.get(travelGroup, 'faction'),
  getOriginName: travelGroup => _.get(travelGroup, 'originName'),
  getTransports: travelGroup => _.get(travelGroup, 'transports'),
});

export const GameState = ({
  getBudget: gameState => _.get(gameState, 'budget'),
  getLocations: gameState => _.get(gameState, 'locations'),
  getLocationByName: (gameState, locationName) => _.find(
    GameState.getLocations(gameState),
    l => Location.getName(l) === locationName,
  ),
  getParliament: gameState => _.get(gameState, 'parliament'),
  getParliamentTotalMemberCount: gameState => _.get(gameState, ['parliament', 'totalMemberCount']),
  getParliamentSupportingMemberCount: gameState => _.get(gameState, ['parliament', 'supportingMemberCount']),
  getPublicSupport: gameState => _.get(gameState, 'publicSupport'),
  getRoles: gameState => _.get(gameState, 'roles'),
  getTravelGroups: gameState => _.get(gameState, 'travelGroups'),
  getTravelGroupAtFeatureId: (gameState, featureId) => _.find(
    GameState.getTravelGroups(gameState),
    tg => TravelGroup.getFeatureId(tg) === featureId,
  ),
  getTrainingGroups: gameState => _.get(gameState, 'trainingGroups'),
});

export const Theme = ({
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
});
