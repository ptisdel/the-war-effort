import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { useStore } from '../../hooks';

const { GameState, Location, Path } = common.models;

export const useMapView = () => {
  const { gameState } = useStore();

  const locations = GameState.getLocations(gameState);
  const locationsFormatted = _.map(locations, l => {
    const { lat, lng } = Location.getPosition(l);
    return {
      abbreviation: _.first(Location.getCallsign(l)),
      label: Location.getName(l),
      lat,
      lng,
    };
  });

  const paths = GameState.getPaths(gameState);
  const pathsFormatted = _.map(paths, p => {
    console.log(Path.getLocationA(p));
    const locationA = GameState.getLocationById(gameState, Path.getLocationA(p));
    const locationB = GameState.getLocationById(gameState, Path.getLocationB(p));

    return {
      locationA: Location.getPosition(locationA),
      locationB: Location.getPosition(locationB),
    };
  });

  const { lat, lng, z } = GameState.getMapPosition(gameState);

  return [
    {
      cameraPosition: { lat, lng, z },
      locations: locationsFormatted,
      paths: pathsFormatted,
    },
  ];
};
