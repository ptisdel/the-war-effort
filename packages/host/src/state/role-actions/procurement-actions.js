import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { Prototype } from '@the-war-effort/common/models';

const { helpers, models } = common;
const { log } = helpers;
const { GameState } = models;

export const startResearchingPrototype = (store, prototypeId) => {
  const { gameState } = store.state;

  const newGameState = {
    ...gameState,
  };
  log('procurement', `Researching prototype ${prototypeId}.`);

  store.setState({ gameState: newGameState });
};
