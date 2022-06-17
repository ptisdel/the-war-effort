import _ from 'lodash-es';
import { v4 as uuid } from 'uuid';
import * as constants from './constants.js';
import * as helpers from './helpers.js';

const { formatMoney } = helpers;
const { ALL_ARTICLE_PARTS } = constants;

export const Article = {
  create: createArticles,
  getAuthor: article => article?.author,
  getBody: article => article?.body,
  getIsCensored: article => Article.getCensorDate(article) !== null,
  getCensorDate: article => article?.censorDate,
  getId: article => article?.id,
  getInterestingness: article => article?.interestingness,
  getPublishDate: article => article?.publishDate,
  getTitle: article => article?.title,
  getViews: article => article?.views,
};

/**
    * Creates an array of randomly generated Articles
    * @param {number} amount - number of Articles to generate
    * @returns {Array} - [...articles]
  */
function createArticles(amount) {
  return _.times(amount, () => ({
    author: _.sample(ALL_ARTICLE_PARTS.AUTHORS),
    body: _.sample(ALL_ARTICLE_PARTS.BODIES),
    id: uuid(),
    interestingness: 4, // on a 1-10 scale
    censorDate: null,
    publishDate: Date.now(),
    title: _.sample(ALL_ARTICLE_PARTS.TITLES),
    views: _.random(300, false),
  }));
}

export const Budget = {
  getFormatted: budget => formatMoney(budget || 0),
};

export const Role = {
  getBudget: role => role?.budget,
  getFormattedBudget: role => Budget.getFormatted(Role.getBudget(role)),
  getPlayerId: role => role?.playerId,
  getName: role => role?.name,
};

export const Resource = {
  create: createResources,
  getAmount: resource => resource?.amount,
  getCost: resource => resource?.cost,
  getName: (resource, amount = 1) => (amount > 1 ? resource?.name.plural : resource?.name.singular),
  getType: resource => resource?.type,
};
  /**
    * Creates an array of Resources
    * @param {number} amount - number of Resources to generate
    * @param {object} type - the definition of the Resource to generate
    * @returns {Array} - [...resources]
  */
function createResources(amount, type) {
  return _.times(amount, () => ({
    amount,
    id: uuid(),
    ...type,
  }));
}

export const Unit = {
  create: createUnit,
  getAmmo: unit => unit?.ammo,
  getGroup: unit => unit?.group,
  getCapacity: unit => unit?.capacity,
  getCargo: unit => unit?.cargo,
  getCrew: unit => unit?.crew,
  getCrewType: unit => unit?.crewType,
  getFuel: unit => unit?.fuel,
  getId: unit => unit?.id,
  getFaction: unit => unit?.faction,
  getLocation: unit => unit?.location,
  getMaxAmmo: unit => unit?.maxAmmo,
  getMaxFuel: unit => unit?.maxFuel,
  getName: unit => unit?.name,
  getNumber: unit => unit?.number,
  getSize: unit => unit?.size,
  getStats: unit => unit?.stats,
  getStatByName: (unit, statName) => _.get(Unit.getStats(unit), statName),
  getType: unit => unit?.type,
};
  /**
    * Creates an array of Units
    * @param {number} amount - number of Units to generate
    * @param {object} type - the definition of the Unit to generate
    * @param {string} type - the faction who owns the Unit
    * @param {object} type - an object containing any stats to override
    * @returns {Array} - [...units]
  */
function createUnit(amount, type, overrides) {
  return _.times(amount, () => ({
    id: uuid(),
    ...type,
    ...overrides,
  }));
}

export const Feature = {
  create: createFeature,
  getId: feature => feature?.id,
  getName: feature => feature?.name,
  getFaction: feature => feature?.faction,
  getType: feature => feature?.type,
  getUnits: feature => feature?.units,
  getMaxTraineeCount: feature => feature?.maxTraineeCount,
  getResupplyTasks: feature => feature?.resupplyTasks,
  getTraineeCount: feature => feature?.traineeCount,
  getTrainingOffered: feature => feature?.trainingOffered,
};

/**
    * Creates a Feature
    * @param {object} type - the definition of the Feature to generate
    * @param {string} faction - the faction the Feature should belong to
    * @param {object} options - an object containing any variables to override (eg., name)
    * @returns {object} - the created Feature
  */
function createFeature(type, faction, overrides = {}) {
  return {
    id: uuid(),
    faction,
    ...type,
    ...overrides,
  };
}

export const Location = {
  create: createLocation,
  getCallsign: location => location?.callsign || 'X',
  getId: location => location?.id,
  getName: location => location?.name,
  getFeatures: location => location?.features,
  getFeatureById: (location, featureId) => _.find(
    Location.getFeatures(location),
    f => Feature.getId(f) === featureId,
  ),
  getFactionFeaturesByType: (location, factionName, featureType) => _.filter(
    Location.getFeatures(location),
    f => Feature.getType(f) === featureType && Feature.getFaction(f) === factionName,
  ),
  getPosition: location => location?.position,
  getResources: location => location?.resources,
  getSize: location => location?.size,
  getType: location => location?.type,
  getUnallowedUnitTypes: location => location?.unallowedUnitTypes,
};

/**
    * Creates a Location
    * @param {object} type - the definition of the Location to generate
    * @param {object} options - an object containing any variables to override
    * @returns {object} - the created Location
  */
function createLocation(type, overrides = {}) {
  return {
    features: [],
    id: uuid(),
    paths: [],
    position: { lat: 0, lng: 0 },
    resources: [],
    ...type,
    ...overrides,
  };
}

export const Path = {
  create: createPath,
  getSpeedLimit: path => path?.speedLimit,
  getLocationA: path => path?.locationA,
  getLocationB: path => path?.locationB,
  getUnallowedUnitTypes: path => path?.unallowedUnitTypes,
  name: path => path?.name,
};
/**
    * Creates a Path
    * @param {object} type - the definition of the Path to generate
    * @param {object} options - an object containing any variables to override
    * @returns {object} - the created Path
  */
function createPath(type, overrides = {}) {
  return {
    id: uuid(),
    ...type,
    ...overrides,
  };
}

export const ResupplyTask = {
  getUnitId: resupplyTask => resupplyTask?.unitId,
};

export const Transport = {
  getCapacity: transport => transport?.capacity,
  getCargo: transport => transport?.cargo,
  getId: transport => transport?.id,
  getFaction: transport => transport?.faction,
  getName: transport => transport?.name,
};

export const TrainingPath = {
  getGraduateType: trainingPath => trainingPath?.graduateType,
  getLength: trainingPath => trainingPath?.length,
  getName: trainingPath => trainingPath?.name,
  getTraineeType: trainingPath => trainingPath?.traineeType,
};

export const TrainingGroup = {
  getEnd: trainingGroup => trainingGroup?.end,
  getFeatureId: trainingGroup => trainingGroup?.featureId,
  getGraduateType: trainingGroup => trainingGroup?.graduateType,
  getStart: trainingGroup => trainingGroup?.start,
  getTraineeCount: trainingGroup => trainingGroup?.traineeCount,
};

export const GameState = {
  getBudget: gameState => gameState?.budget,
  getCensoredArticles: gameState => _.filter(
    gameState?.articles,
    a => Article.getCensorDate(a) !== null,
  ),
  getLiveArticles: gameState => gameState?.articles?.live,
  getLocations: gameState => gameState?.locations,
  getLocationById: (gameState, locationId) => _.find(
    GameState.getLocations(gameState),
    l => Location.getId(l) === locationId,
  ),
  getMapPosition: gameState => gameState?.mapPosition,
  getParliament: gameState => gameState?.parliament,
  getParliamentTotalMemberCount: gameState => gameState?.parliament?.totalMemberCount,
  getParliamentSupportingMemberCount: gameState => gameState?.parliament?.supportingMemberCount,
  getPaths: gameState => gameState?.paths,
  getPlayers: gameState => gameState?.players,
  getPlayerByRoleName: (gameState, roleName) => Role.getPlayerId(
    _.find(
      GameState.getRoles(gameState),
      r => Role.getName(r) === roleName,
    ),
  ),
  getPrototypes: gameState => gameState?.prototypes,
  getPublicSupport: gameState => gameState?.publicSupport,
  getResupplyingUnitIds: gameState => gameState?.resupplyingUnitIds,
  getRoles: gameState => gameState?.roles,
  getRoomName: gameState => gameState?.roomName,
  getTrainingGroups: gameState => gameState?.trainingGroups,
  getUnits: gameState => gameState?.units,
  getUnitsByLocation: (gameState, location) => _.filter(
    GameState.getUnits(gameState),
    u => Unit.getLocation(u) === Location.getId(location),
  ),
  getUnitGroups: gameState => gameState?.unitGroups,
};

export const PrototypeResource = {
  create: createPrototypeResource,
  getCost: prototype => prototype?.cost,
  getId: prototype => prototype?.id,
  getName: (prototype, amount = 1) => (amount > 1
    ? prototype?.name?.plural
    : prototype?.name.singular
  ),
  getOriginalResource: prototype => prototype?.originalResource,
  getStats: prototype => prototype?.stats,
};

/**
  * Creates a PrototypeResource
  * @param {object} resource - the definition of the Resource to modify
  * @param {string} name - an object containing any variables to override
  * @returns {object} - the created Prototype
*/
function createPrototypeResource(resource) {
  // 1 in 5 chance of a cost reduction
  const shouldCostDecline = (_.random(0, 4, false) === 0);

  const stats = _.get(resource, 'stats') || {};
  const statsCount = _.size(stats) || 0;
  const statKeys = _.keys(stats);
  const upgradeRange = _.range(_.random(1, statsCount, false));
  const newStats = _.reduce(upgradeRange, acc => {
    const statName = _.sample(statKeys);
    const newStatValue = _.get(acc, statName) + 1;

    return {
      ...acc,
      [statName]: newStatValue,
    };
  }, stats);

  const oldCost = Resource.getCost(resource);
  const newCost = _.max(1, oldCost + upgradeRange.length - (shouldCostDecline * 2));

  const oldName = Resource.getName(resource, 1);
  const oldPluralName = Resource.getName(resource, 2);
  const newName = `Starfighter - modified ${oldName}`;
  const newPluralName = `Starfighter - modified ${oldPluralName}`;

  // useful to compare origin resource with nth prototype
  const oldOriginalResource = PrototypeResource.getOriginalResource(resource);

  return {
    id: uuid(),
    ...resource,
    cost: newCost,
    name: {
      singular: newName,
      plural: newPluralName,
    },
    originalResource: oldOriginalResource || resource,
    stats: newStats,
  };
}

export const Theme = {
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
};
