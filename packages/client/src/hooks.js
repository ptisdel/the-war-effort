import state from './state';

export const useGameState = () => {
  const [globalState] = state.store();
  const { gameState } = globalState;
  return { gameState };
};
