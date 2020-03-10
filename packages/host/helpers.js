import _ from 'lodash';
import common from '@the-war-effort/common';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import uuid from 'uuid';
import { allFactions } from '@the-war-effort/common/constants';

const { constants, models } = common;
const { Resource } = models;

const directionsClient = mbxDirections({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });

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

// TODO: not necessary?
export const calculateGoogleMapsRoute = directionsResults => {
  if (!directionsResults) return null;
  const route = _.get(directionsResults, 'routes[0].legs[0]');
  const routeDuration = _.get(route, 'duration.value');
  const routeSteps = _.get(route, 'steps');
  const start = _.get(route, 'start_location');
  const startingStep = {
    duration: 0,
    position: {
      lat: start.lat(),
      lng: start.lng(),
    },
  };

  const steps = _.reduce(routeSteps, (acc, step) => {
    const duration = _.get(step, 'duration.value');
    const endPoint = _.get(step, 'end_point');
    return [
      ...acc,
      {
        duration,
        position: {
          lat: endPoint.lat(),
          lng: endPoint.lng(),
        },
      },
    ];
  }, [startingStep]);

  return {
    duration: routeDuration,
    steps,
  };
};

const calculateMapboxRoute = MapiResponse => {
  if (!MapiResponse) return null;

  const responseCode = _.get(MapiResponse, 'body.code');
  if (responseCode !== 'Ok') return { responseCode };

  const route = _.get(MapiResponse, 'body.routes[0].legs[0]');
  const routeDuration = _.get(route, 'duration'); // in seconds
  const routeSteps = _.get(route, 'steps');

  const steps = _.reduce(routeSteps, (acc, step) => {
    const duration = _.get(step, 'duration');
    const lat = _.get(step, 'maneuver.location[0]');
    const lng = _.get(step, 'maneuver.location[1]');
    return [
      ...acc,
      {
        duration,
        position: {
          lat,
          lng,
        },
      },
    ];
  }, []);

  const origin = _.get(_.first(steps), 'position');
  const destination = _.get(_.last(steps), 'position');

  return {
    responseCode,
    destination,
    duration: routeDuration,
    origin,
    steps,
  };
};

export const createRoute = async ({ origin, destination, travelMode = 'DRIVING' }) => {
  const request = directionsClient.getDirections({
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
