import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import components from './components';
import shared from '../../shared';
import * as api from '../../api';
import state from '../../state';
import * as Styles from './audience-view.styles';

const { constants, models } = common;

const { allRoles } = constants;
const { Role } = models;
const { RoleHeader } = shared;
const { RoleSelector } = components;
const { store } = state;

export const AudienceView = () => {
  const [globalState] = store();
  const { roles } = globalState.gameState;

  const allRolesExceptAudience = _.filter(allRoles, ar => ar !== allRoles.AUDIENCE);
  const roleData = _.map(allRolesExceptAudience, ar => ({
    name: ar,
    isAvailable: !_.some(roles, r => Role.getName(r) === ar),
  }));

  const handleSelectRole = roleName => {
    api.chooseRole(roleName);
  };

  return (
      <Styles.Root>
        <RoleHeader title = 'Select your role.'></RoleHeader>
        <RoleSelector
          onSelectRole = { handleSelectRole }
          roles = { roleData }
        />
      </Styles.Root>
  );
};
