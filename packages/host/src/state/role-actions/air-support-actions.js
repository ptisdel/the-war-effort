import _ from 'lodash-es';
import common from '@the-war-effort/common';

const { helpers, models } = common;
const { log } = helpers;
const { GameState } = models;

export const resupplyAircraft = (store, unitId) => {
  const { gameState } = store.state;

  const resupplyingUnitIds = GameState.getResupplyingUnitIds(gameState);
  const resupplyTaskAlreadyExists = _.includes(resupplyingUnitIds, unitId);

  if (resupplyTaskAlreadyExists) return;

  const newGameState = {
    ...gameState,
    resupplyingUnitIds: [
      ...resupplyingUnitIds,
      unitId,
    ],
  };
  log('airSupport', `Starting resupply mission for unit ${unitId}.`);

  store.setState({ gameState: newGameState });
};
