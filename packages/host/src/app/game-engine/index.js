import { useGameEngine } from './logic';

export const GameEngine = () => {
  useGameEngine();
  // this component should only run game engine logic; no rendering needed
  return null;
};
