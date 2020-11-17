import common from '@the-war-effort/common';
import { useInterval, useStore } from '../../hooks';
import { runModules } from '../../modules';

const { log } = common.helpers;

export const useGameEngine = () => {
  const { gameActions, gameState } = useStore();

  useInterval(() => {
    log('gameEngine', 'tick');
    // run each component of the engine in turn
    runModules({ gameActions, gameState });
  }, 1000);
};
