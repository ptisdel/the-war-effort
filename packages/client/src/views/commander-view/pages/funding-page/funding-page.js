import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './styles';

const { constants, models } = common;

// TODO getting a memory leak here when resigning as commander from ONLY funding page, not sure why

const { commanderActions } = api;
const { Budget, GameState, Role } = models;
const { allRoles } = constants;
const { store } = state;

const FundingPage = () => {
  const [globalState] = store();

  const { gameState } = globalState;
  const roles = GameState.getRoles(gameState);
  const budget = GameState.getBudget(gameState);

  const decreaseBudget = roleName => commanderActions.decreaseRoleBudget(roleName);
  const increaseBudget = roleName => commanderActions.increaseRoleBudget(roleName);

  const renderRoles = () => {
    const filteredRoles = _.filter(roles, r => Role.getName(r) !== allRoles.COMMANDER);

    if (filteredRoles.length === 0) return 'No roles available to fund';

    return _.map(filteredRoles, (r, i) => (
      <Styles.Role as = 'li' key = { i }>
        <Styles.RoleTitle>{ Role.getName(r) }</Styles.RoleTitle>
        <Styles.RoleBudget>
          <Styles.RoleBudgetButton onClick = { () => decreaseBudget(Role.getName(r)) }>
            -
          </Styles.RoleBudgetButton>
          <Styles.RoleBudgetTotal>{Role.getFormattedBudget(r)}</Styles.RoleBudgetTotal>
          <Styles.RoleBudgetButton onClick = { () => increaseBudget(Role.getName(r)) }>
            +
          </Styles.RoleBudgetButton>
        </Styles.RoleBudget>
      </Styles.Role>
    ));
  };

  return (
    <Styles.Root>
      <h2 as = { Styles.FundingTotal }>
        { `Total Budget: ${Budget.getFormattedTotal(budget)}` }
      </h2>
      <Styles.RoleList>
        { renderRoles() }
      </Styles.RoleList>
    </Styles.Root>
  );
};

export default FundingPage;
