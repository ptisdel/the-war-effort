import _ from 'lodash';
import { useEffect, useRef } from 'react';
import uuid from 'uuid';

export const createFeature = ({ faction, type, modifiers = {} }) => ({
  ...type,
  ...modifiers,
  id: uuid(),
  faction,
});

export const createFeatures = ({
  count = 1,
  faction,
  modifiers = {},
  type,
}) => _.times(count, () => ({
  ...type,
  ...modifiers,
  id: uuid(),
  faction,
}));

export const createResource = ({ faction, modifiers = {}, type }) => ({
  ...type,
  ...modifiers,
  id: uuid(),
  faction,
});

export const createResources = ({
  count = 1,
  faction,
  modifiers = {},
  type,
}) => _.times(count, () => ({
  ...type,
  ...modifiers,
  id: uuid(),
  faction,
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
