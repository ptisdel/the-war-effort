import _ from 'lodash';
import React from 'react';
import api from '../../api';
import components from '../../components';
import { models } from '../../../shared';
import state from '../../state';
import * as Styles from './commander-view.styles';

const { commanderActions } = api;
const { Budget, Role } = models;
const { store } = state;
const { Swiper } = components;

export const CommanderView = () => {
  const [globalState] = store();

  const { gameState } = globalState;
  const { roles, budget } = gameState;

  const decreaseBudget = roleName => commanderActions.decreaseRoleBudget(roleName);
  const increaseBudget = roleName => commanderActions.increaseRoleBudget(roleName);

  const renderRoles = () => {
    return _.map(roles, (r, i) => <Styles.Role as = 'li' key = { i }>
      <Styles.RoleTitle>{ Role.getName(r) }</Styles.RoleTitle>
      <Styles.RoleBudget>
        <Styles.RoleBudgetButton onClick = { () => decreaseBudget(Role.getName(r)) }>-</Styles.RoleBudgetButton>
        <Styles.RoleBudgetTotal>{Role.getFormattedBudget(r)}</Styles.RoleBudgetTotal> 
        <Styles.RoleBudgetButton onClick = { () => increaseBudget(Role.getName(r)) }>+</Styles.RoleBudgetButton>
      </Styles.RoleBudget>
    </Styles.Role>);
  }

  return (
    <Styles.Root>
      <Swiper>
        <div>
          <ul as = { Styles.FundingTotal }>
            { Budget.getFormattedTotal(budget) }
          </ul>
          <Styles.RoleList>
            { renderRoles() }
          </Styles.RoleList>
        </div>
        <div>
          <p>Second page</p>
        </div>
        <div>
          <p>Third page</p>
        </div>
      </Swiper>
    </Styles.Root>
  );
};
