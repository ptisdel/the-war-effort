import { useEffect, useRef } from 'react';
import uuid from 'uuid';

export const createResource = (faction, type, modifiers = []) => ({
  ...type,
  ...modifiers,
  id: uuid(),
  faction,
});

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
