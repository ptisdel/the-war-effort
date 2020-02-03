import _ from 'lodash';
import { useEffect, useRef } from 'react';
import uuid from 'uuid';

export const create = (type, options) => ({
  id: uuid(),
  ...type,
  ...options,
});

export const createMultiple = (type, count, options) => _.times(count, () => ({
  id: uuid(),
  ...type,
  ...options,
}));

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
