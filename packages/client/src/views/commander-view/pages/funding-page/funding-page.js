import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import { useStore } from '../../../../hooks';
import * as Styles from './styles';

const { constants, models } = common;

// TODO getting a memory leak here when resigning as commander from ONLY funding page, not sure why

const { decreaseRoleBudget, increaseRoleBudget } = api;
const { Budget, GameState, Role } = models;
const { ALL_ROLES } = constants;

const FundingPage = () => {
  const { gameState } = useStore();

  const roles = GameState.getRoles(gameState);
  const budget = GameState.getBudget(gameState);

  const renderRoles = () => {
    const filteredRoles = _.filter(roles, r => Role.getName(r) !== ALL_ROLES.COMMANDER);

    if (filteredRoles.length === 0) return 'No roles available to fund';

    return _.map(filteredRoles, (r, i) => (
      <Styles.Role as = 'li' key = { i }>
        <Styles.RoleTitle>{ Role.getName(r) }</Styles.RoleTitle>
        <Styles.RoleBudget>
          <Styles.RoleBudgetButton onClick = { () => decreaseRoleBudget(Role.getName(r)) }>
            -
          </Styles.RoleBudgetButton>
          <Styles.RoleBudgetTotal>{Role.getFormattedBudget(r)}</Styles.RoleBudgetTotal>
          <Styles.RoleBudgetButton onClick = { () => increaseRoleBudget(Role.getName(r)) }>
            +
          </Styles.RoleBudgetButton>
        </Styles.RoleBudget>
      </Styles.Role>
    ));
  };

  return (
    <Styles.Root>
      <h2 as = { Styles.FundingTotal }>
        { `Total Budget: ${Budget.getFormatted(budget)}` }
      </h2>
      <Styles.RoleList>
        { renderRoles() }
      </Styles.RoleList>
    </Styles.Root>
  );
};

export default FundingPage;
