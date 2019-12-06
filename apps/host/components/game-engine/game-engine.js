import { useEffect } from 'react';
import state from '../../state';

const { store } = state;

export const GameEngine = () => {
  const [globalState, globalActions] = store();

  const tick = () => {

  };

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return [];
}