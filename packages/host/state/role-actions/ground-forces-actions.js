import _ from 'lodash';
import common from '@the-war-effort/common';
import * as helpers from '../../helpers';

const { models } = common;
const { GameState, Location, UnitGroup } = models;

export const moveUnitGroups = (
  store,
  {
    unitGroupIds,
    destinationId,
  },
) => {
  if (!destinationId || unitGroupIds.length === 0) return;

  const { gameState } = store.state;

  const unitGroups = GameState.getUnitGroups(gameState);
  const destinationLocation = GameState.getLocationById(gameState, destinationId);
  const destinationPosition = Location.getPosition(destinationLocation);
  console.log(destinationLocation);

  _.forEach(unitGroupIds, ugi => {
    const unitGroup = _.find(unitGroups, ug => UnitGroup.getId(ug) === ugi);
    const originPosition = UnitGroup.getPosition(unitGroup);

    helpers.createRoute({ origin: originPosition, destination: destinationPosition })
      .then(route => {
        console.log('route', route);
        if (_.get(route, 'responseCode') !== 'Ok') return;

        const newUnitGroup = {
          ...unitGroup,
          currentOrder: 'moving',
          route,
        };

        const newGameState = {
          ...gameState,
          unitGroups: [
            ..._.reject(unitGroups, ug => UnitGroup.getId(ug) === ugi),
            newUnitGroup,
          ],
        };

        store.setState({ gameState: newGameState });
      });
  });
};
