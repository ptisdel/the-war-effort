import _ from 'lodash-es';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import { GAME_ENGINE_TIME_MULTIPLIER } from './constants';

const directionsClient = mbxDirections({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });

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

export const createRoute = async ({ origin, destination }) => {
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
