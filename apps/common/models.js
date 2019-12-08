import _ from 'lodash';
import * as helpers from './helpers';

const { formatMoney } = helpers;

export const Budget = ({
  getFormattedTotal: budget => {
    return formatMoney(budget || 0);
  },
});

export const Role = ({
  getBudget: role => _.get(role, 'budget'),
  getFormattedBudget: role => Budget.getFormattedTotal(Role.getBudget(role)),
  getPlayer: role => _.get(role, 'player'),
  getName: role => _.get(role, 'name'),
});

export const Location = ({
  getName: location => _.get(location, 'name'),
  getResources: location => _.get(location, 'resources'),
});

export const Resource = ({
  getType: resource => _.get(resource, 'type'),
});

export const Theme = ({
  getColor: (theme, shade) => _.get(theme, ['colors', shade]),
})
