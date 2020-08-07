import _ from 'lodash-es';
import * as constants from './constants';

const { LOGGING } = constants;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const formatMoney = amount => formatter.format(amount);

export const log = (tag, ...message) => {
  if (_.get(LOGGING, tag)) console.log(...message);
};
