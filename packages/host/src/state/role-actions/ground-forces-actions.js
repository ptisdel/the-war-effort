import _ from 'lodash-es';
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

  const gameState = store.state;

  const unitGroups = GameState.getUnitGroups(gameState);
  const destinationLocation = GameState.getLocationById(gameState, destinationId);
  const destination = Location.getPosition(destinationLocation);

  _.forEach(unitGroupIds, ugi => {
    const unitGroup = _.find(unitGroups, ug => UnitGroup.getId(ug) === ugi);
    const origin = UnitGroup.getPosition(unitGroup);

    helpers.createRoute({ origin, destination })
      .then(route => {
        if (!route) return;
        console.log(route);
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

        store.setState(newGameState);
      });
  });
};
