import state from '../../state';
import { engineTick } from './engine-tick';
import * as helpers from '../../helpers';

const { store } = state;
const { useInterval } = helpers;

export const GameEngine = () => {
  // eslint-disable-next-line
  const [globalState, globalActions] = store();
  const { gameState } = globalState;

  useInterval(() => engineTick({ globalActions, gameState }), 1000);

  return null;
};
