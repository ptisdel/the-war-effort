import _ from 'lodash';
import uuid from 'uuid';
import common from '@the-war-effort/common';

const { models } = common;

const { GameState, Location, Transport } = models;

export const createTravelGroup = (store, payload) => {
  const { gameState } = store.state;

  const {
    destinationId,
    originId,
    transports,
  } = payload;

  const origin = GameState.getLocationById(gameState, originId);
  const originResources = Location.getResources(origin) || [];
  const originHeavyTransports = Location.getHeavyTransports(origin) || [];

  const allSentResources = _.reduce(
    transports,
    (acc, transport) => [...acc, ...Transport.getCargo(transport)],
    [],
  );

  const allSentHeavyTransports = _.reduce(
    transports,
    (acc, transport) => [...acc, Transport.getId(transport)],
    [],
  );

  const newOriginResources = _.differenceWith(originResources, allSentResources, _.isEqual);
  const newOriginHeavyTransports = _.reject(
    originHeavyTransports,
    t => _.includes(allSentHeavyTransports, Transport.getId(t)),
  );

  const newOrigin = {
    ...origin,
    heavyTransports: newOriginHeavyTransports,
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
