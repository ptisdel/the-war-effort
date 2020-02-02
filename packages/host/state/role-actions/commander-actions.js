import _ from 'lodash';
import common from '@the-war-effort/common';

const { constants, helpers, models } = common;
const { log } = helpers;
const { GameState, Role } = models;
const { budgetIncrementAmount, roleBudgetIncrementAmount } = constants;

export const decreaseRoleBudget = (store, payload) => {
  const { gameState } = store.state;
  const { budget, roles } = gameState;

  const roleName = payload;
  const targetRole = _.find(roles, r => Role.getName(r) === roleName);
  if (!targetRole) return;

  const targetRoleBudget = Role.getBudget(targetRole);

  if (targetRoleBudget < roleBudgetIncrementAmount) return;

  const newBudget = budget + roleBudgetIncrementAmount;
  const newTargetRoleBudget = targetRoleBudget - roleBudgetIncrementAmount;

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

  const budget = GameState.getBudget(gameState);
  const roles = GameState.getRoles(gameState);

  const roleName = payload;
  const targetRole = _.find(roles, r => Role.getName(r) === roleName);
  if (!targetRole) return;

  const targetRoleBudget = Role.getBudget(targetRole);

  if (budget < roleBudgetIncrementAmount) return;

  const newBudget = budget - roleBudgetIncrementAmount;
  const newTargetRoleBudget = targetRoleBudget + roleBudgetIncrementAmount;

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


export const requestBudgetIncrease = store => {
  const { gameState } = store.state;

  const currentBudget = GameState.getBudget(gameState);
  const newBudget = currentBudget + budgetIncrementAmount;

  const currentParliamentSupport = GameState.getParliamentSupportingMemberCount(gameState);
  const newParliamentSupport = _.max([0, currentParliamentSupport - _.random(5, 15, false)]);

  const newParliament = {
    ...GameState.getParliament(gameState),
    supportingMemberCount: newParliamentSupport,
  };

  const newGameState = {
    ...gameState,
    budget: newBudget,
    parliament: newParliament,
  };
  store.setState({ gameState: newGameState });
};

export const fireRole = (store, payload) => {
  const roleName = payload;
  log('commander', 'firing', roleName);

  const { gameState } = store.state;
  const roles = GameState.getRoles(gameState);

  const newGameState = {
    ...gameState,
    roles: _.reject(roles, r => Role.getName(r) === roleName),
  };

  store.setState({ gameState: newGameState });
};
