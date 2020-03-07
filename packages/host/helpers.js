import _ from 'lodash';
import { useEffect, useRef } from 'react';
import common from '@the-war-effort/common';
import uuid from 'uuid';

const { constants, models } = common;
const { Resource } = models;

export const create = (type, options) => ({
  id: _.get(type, 'id') || uuid(),
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

export const createPrototype = resource => {
  // 1 in 5 chance of a cost reduction
  const shouldCostDecline = (_.random(0, 4, false) === 0);

  const stats = _.get(resource, 'stats') || {};
  const statsCount = _.size(stats) || 0;
  const statKeys = _.keys(stats);
  const upgradeRange = _.range(_.random(1, statsCount, false));
  const newStats = _.reduce(upgradeRange, acc => {
    const statName = _.sample(statKeys);
    const newStatValue = _.get(acc, statName) + 1;

    return {
      ...acc,
      [statName]: newStatValue,
    };
  }, stats);

  const oldCost = Resource.getCost(resource);
  const newCost = _.max(1, oldCost + upgradeRange.length - (shouldCostDecline * 2));

  const oldName = Resource.getName(resource, 1);
  const oldPluralName = Resource.getName(resource, 2);
  const newName = `Starfighter - modified ${oldName}`;
  const newPluralName = `Starfighter - modified ${oldPluralName}`;


  return {
    id: uuid(),
    ...resource,
    cost: newCost,
    name: {
      singular: newName,
      plural: newPluralName,
    },
    originalResource: resource,
    stats: newStats,
  };
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
