import _ from 'lodash';
import { useEffect, useRef } from 'react';
import uuid from 'uuid';

export const createFeature = ({ faction, type, modifiers = {} }) => ({
  id: uuid(),
  ...type,
  ...modifiers,
  faction,
});

export const createFeatures = ({
  count = 1,
  faction,
  modifiers = {},
  type,
}) => _.times(count, () => ({
  id: uuid(),
  ...type,
  ...modifiers,
  faction,
}));

export const createResource = ({
  count = 1,
  faction,
  type,
}) => ({
  count,
  id: uuid(),
  ...type,
  faction,
});

export const createUnit = ({ faction, modifiers = {}, type }) => ({
  id: uuid(),
  ...type,
  ...modifiers,
  faction,
});

export const createUnits = ({
  count = 1,
  faction,
  modifiers = {},
  type,
}) => _.times(count, () => ({
  id: uuid(),
  ...type,
  ...modifiers,
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
