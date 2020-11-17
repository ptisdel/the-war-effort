import { store } from './state';

export const useStore = () => {
  const [globalState, globalActions] = store();
  const gameActions = globalActions;
  const { gameState, playerId } = globalState;

  return { gameActions, gameState, playerId };
};
