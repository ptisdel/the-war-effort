import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import components from './components';
import shared from '../../components';
import * as api from '../../api';
import state from '../../state';
import * as Styles from './styles';

const { constants, models } = common;

const { ALL_ROLES } = constants;
const { Role } = models;
const { RoleHeader } = shared;
const { RoleSelector } = components;
const { store } = state;

const AudienceView = () => {
  const [globalState] = store();
  const { roles } = globalState.gameState;

  const allRolesExceptAudience = _.filter(ALL_ROLES, ar => ar !== ALL_ROLES.AUDIENCE);
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

export default AudienceView;
