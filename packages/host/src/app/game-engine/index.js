import state from '../../state';
import { engineTick } from './logic';
import * as hooks from '../../hooks';

const { store } = state;
const { useInterval } = hooks;

export const GameEngine = () => {
  const [globalState, globalActions] = store();
  const { gameState } = globalState;

  useInterval(() => engineTick({ globalActions, gameState }), 1000);

  return null;
};
