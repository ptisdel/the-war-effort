import _ from 'lodash';
import common from '@the-war-effort/common';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import uuid from 'uuid';
import { allFactions } from '@the-war-effort/common/constants';
import { GAME_ENGINE_TIME_MULTIPLIER } from './constants';

const { constants, models } = common;
const { Resource } = models;

const directionsClient = mbxDirections({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN });

export const create = (type, options) => ({
  id: _.get(type, 'id') || uuid(),
  ...type,
  ...options,
});

export const createMultiple = (type, count, options) => _.times(count, () => ({
  id: uuid(),
  ...type,
  ...options,
}));

export const createArticles = count => {
  const { allArticleParts } = constants;

  return _.times(count, () => ({
    author: _.sample(allArticleParts.AUTHORS),
    body: _.sample(allArticleParts.BODIES),
    id: uuid(),
    interestingness: 4, // on a 1-10 scale
    censorDate: null,
    publishDate: Date.now(),
    title: _.sample(allArticleParts.TITLES),
    views: _.random(300, false),
  }));
};

export const createPrototype = resource => {
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

  return {
    id: uuid(),
    ...resource,
    cost: newCost,
    name: {
      singular: newName,
      plural: newPluralName,
    },
    originalResource: resource,
    stats: newStats,
  };
};

export const createUnitGroup = (
  units,
  options = { faction: allFactions.PLAYERS, position: { lat: 0, lng: 0 } },
) => ({
  id: uuid(),
  currentOrder: null,
  name: uuid(),
  position: {
    lat: 0,
    lng: 0,
  },
  route: null,
  units,
  ...options,
});

const calculateMapboxRoute = MapiResponse => {
  if (!MapiResponse || _.get(MapiResponse, 'body.code') !== 'Ok') return null;

  const geometry = _.get(MapiResponse, 'body.routes[0].geometry.coordinates');
  const route = _.get(MapiResponse, 'body.routes[0].legs[0]');
  const originWaypoint = _.get(MapiResponse, 'body.waypoints[0]');
  const origin = {
    lat: _.get(originWaypoint, 'location[0]'),
    lng: _.get(originWaypoint, 'location[1]'),
  };
  const destinationWaypoint = _.get(MapiResponse, 'body.waypoints[0]');
  const destination = {
    lat: _.get(destinationWaypoint, 'location[0]'),
    lng: _.get(destinationWaypoint, 'location[1]'),
  };

  const duration = _.get(route, 'duration'); // in seconds
  const speed = _.ceil((geometry.length / duration) * GAME_ENGINE_TIME_MULTIPLIER);

  return {
    currentGeometryIndex: 0,
    destination,
    duration,
    geometry,
    origin,
    speed,
  };
};

export const createRoute = async ({ origin, destination, travelMode = 'DRIVING' }) => {
  const request = directionsClient.getDirections({
    geometries: 'geojson',
    overview: 'full',
    profile: 'driving-traffic',
    steps: true,
    waypoints: [
      {
        coordinates: [origin.lat, origin.lng],
        approach: 'unrestricted',
      },
      {
        coordinates: [destination.lat, destination.lng],
        bearing: [100, 60],
      },
    ],
  });

  const route = await request.send();
  const parsedRoute = calculateMapboxRoute(route);
  return parsedRoute;
};
