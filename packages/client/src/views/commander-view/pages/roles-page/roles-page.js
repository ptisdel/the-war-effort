import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './styles';

const { constants, models } = common;

const { commanderActions } = api;
const { allRoles } = constants;
const { GameState } = models;
const { store } = state;

const RolesPage = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const fireRole = roleName => commanderActions.fireRole(roleName);

  const renderRoles = () => {
    const allOtherRoles = _.filter(allRoles, r => r !== allRoles.COMMANDER);

    if (allOtherRoles.length === 0) return 'No roles available to manage';

    return _.map(allOtherRoles, roleName => {
      const playerId = GameState.getPlayerByRoleName(gameState, roleName);

      return <Styles.Role key = { roleName }>
        <Styles.RoleInfo>
          <Styles.RoleTitle>{ roleName }</Styles.RoleTitle>
          <Styles.RolePlayer unoccupied = { !playerId }>
            { playerId || 'Unoccupied' }
          </Styles.RolePlayer>
        </Styles.RoleInfo>
        <Styles.RoleButton
          onClick = { () => fireRole(roleName) }
          unoccupied = { !playerId }
        >
          Fire
        </Styles.RoleButton>
      </Styles.Role>;
    });
  };

  return (
    <Styles.Root>
      <h2 as = { Styles.Title }>
        { 'Manage Roles' }
      </h2>
      { renderRoles() }
    </Styles.Root>
  );
};

export default RolesPage;
