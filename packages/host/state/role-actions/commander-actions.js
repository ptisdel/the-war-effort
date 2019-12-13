import _ from 'lodash';
import common from '@the-war-effort/common';

const { constants, models } = common;

const { Role } = models;

const { budgetIncrementAmount } = constants;

export const decreaseRoleBudget = (store, payload) => {
  const { gameState } = store.state;
  const { budget, roles } = gameState;

  const roleName = payload;
  const targetRole = _.find(roles, r => Role.getName(r) === roleName);
  if (!targetRole) return;

  const targetRoleBudget = Role.getBudget(targetRole);

  if (targetRoleBudget < budgetIncrementAmount) return;

  const newBudget = budget + budgetIncrementAmount;
  const newTargetRoleBudget = targetRoleBudget - budgetIncrementAmount;

  const newRoles = [
    ..._.without(roles, targetRole),
    {
      ...targetRole,
      budget: newTargetRoleBudget,
    },
  ];

  const newGameState = {
    ...gameState,
    budget: newBudget,
    roles: newRoles,
  };
  store.setState({ gameState: newGameState });
};


export const increaseRoleBudget = (store, payload) => {
  const { gameState } = store.state;
  const { budget, roles } = gameState;

  const roleName = payload;
  const targetRole = _.find(roles, r => Role.getName(r) === roleName);
  if (!targetRole) return;

  const targetRoleBudget = Role.getBudget(targetRole);

  if (budget < budgetIncrementAmount) return;

  const newBudget = budget - budgetIncrementAmount;
  const newTargetRoleBudget = targetRoleBudget + budgetIncrementAmount;

  const newRoles = [
    ..._.without(roles, targetRole),
    {
      ...targetRole,
      budget: newTargetRoleBudget,
    },
  ];

  const newGameState = {
    ...gameState,
    budget: newBudget,
    roles: newRoles,
  };
  store.setState({ gameState: newGameState });
};
