import * as featureFlags from './feature-flags.js';

const { LOGGING } = featureFlags;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const formatMoney = amount => formatter.format(amount);

export const log = (tag, ...message) => {
  if (LOGGING[tag]) console.log(...message);
};
