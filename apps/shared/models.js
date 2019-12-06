import _ from 'lodash';
import * as helpers from './helpers';

const { formatMoney } = helpers;

export const Role = ({
  getPlayer: role => _.get(role, 'player'),
  getBudget: role => {
    const budget = _.get(role, 'budget') || 0;
    return formatMoney(budget);
  },
});
