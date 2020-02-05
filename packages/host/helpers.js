import _ from 'lodash';
import { useEffect, useRef } from 'react';
import common from '@the-war-effort/common';
import uuid from 'uuid';

const { constants } = common;

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

export const createArticles = count => {
  const { allArticleParts } = constants;

  return _.times(count, () => ({
    author: _.sample(allArticleParts.AUTHORS),
    body: _.sample(allArticleParts.BODIES),
    id: uuid(),
    interestingness: 4, // on a 1-10 scale
    censorDate: null,
    publishDate: Date.now(),
    title: _.sample(allArticleParts.TITLES),
    views: _.random(300, false),
  }));
};

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
