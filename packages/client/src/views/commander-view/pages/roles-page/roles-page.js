import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import { useStore } from '@/store';
import * as Styles from './styles';

const { constants, models } = common;

const { fireRole } = api;
const { ALL_ROLES } = constants;
const { GameState } = models;

const RolesPage = () => {
  const { gameState } = useStore();

  const renderRoles = () => {
    const allOtherRoles = _.filter(ALL_ROLES, r => r !== ALL_ROLES.COMMANDER);

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
