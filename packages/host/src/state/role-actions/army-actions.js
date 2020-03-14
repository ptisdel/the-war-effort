import _ from 'lodash';
import common from '@the-war-effort/common';

const { helpers, models } = common;
const { log } = helpers;
const { GameState } = models;

export const sendUnitGroup = (store, { UnitGroupId, destination }) => {
  const { gameState } = store.state;

  log('army', `Sending Battle Group ${UnitGroupId} to ${destination}.`);
};