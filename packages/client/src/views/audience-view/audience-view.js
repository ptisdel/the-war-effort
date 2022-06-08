import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import { chooseRole } from './api';
import components from './components';
import shared from '../../components';
import { useStore } from '../../hooks';
import * as Styles from './styles';

const { constants, models } = common;

const { ALL_ROLES } = constants;
const { Role } = models;
const { RoleHeader } = shared;
const { RoleSelector } = components;

const AudienceView = () => {
  const { gameState } = useStore();
  const { roles } = gameState;

  const allRolesExceptAudience = _.filter(ALL_ROLES, ar => ar !== ALL_ROLES.AUDIENCE);
  const roleData = _.map(allRolesExceptAudience, ar => ({
    name: ar,
    isAvailable: !_.some(roles, r => Role.getName(r) === ar),
  }));

  return (
      <Styles.Root>
        <RoleHeader title = 'Select your role.'></RoleHeader>
        <RoleSelector
          onSelectRole = { chooseRole }
          roles = { roleData }
        />
      </Styles.Root>
  );
};

export default AudienceView;
