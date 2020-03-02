import _ from 'lodash';
import uuid from 'uuid';
import common from '@the-war-effort/common';

const { models } = common;

const {
  GameState,
  Location,
  Transport,
  Unit,
} = models;

export const createTravelGroup = (store, payload) => {
  const { gameState } = store.state;

  const {
    destinationId,
    originId,
    transports,
  } = payload;

  const origin = GameState.getLocationById(gameState, originId);
  const originResources = Location.getResources(origin) || [];
  const originUnits = Location.getUnits(origin) || [];

  const allSentResources = _.reduce(
    transports,
    (acc, transport) => [...acc, ...Transport.getCargo(transport)],
    [],
  );

  const allSentTransports = _.reduce(
    transports,
    (acc, transport) => [...acc, Transport.getId(transport)],
    [],
  );

  const newOriginResources = _.differenceWith(originResources, allSentResources, _.isEqual);
  const newOriginUnits = _.reject(
    originUnits,
    u => _.includes(allSentTransports, Unit.getId(u)),
  );

  const newOrigin = {
    ...origin,
    units: newOriginUnits,
    resources: newOriginResources,
  };

  const distance = 10;
  const travelTime = distance * 0.5;
  const departureTime = new Date();
  const ETA = new Date((new Date()).getTime() + travelTime * 1000);

  const newTravelGroup = ({
    id: uuid(),
    departureTime,
    destinationId,
    ETA,
    originId,
    transports,
  });

  const { locations } = gameState;
  const newGameState = {
    ...gameState,
    locations: [
      ..._.differenceWith(locations, [origin], _.isEqual),
      newOrigin,
    ],
    travelGroups: [
      ...gameState.travelGroups,
      newTravelGroup,
    ],
  };

  store.setState({ gameState: newGameState });
};
