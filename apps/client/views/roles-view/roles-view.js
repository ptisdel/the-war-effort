import _ from 'lodash';
import React from 'react';
import components from '../../components';
import api from '../../api';
import { constants } from '../../../shared';
import { Role } from '../../../shared/models';
import state from '../../state';
import * as Styles from './roles-view.styles';

const { store } = state;
const { allRoleNames } = constants;
const { RoleSelector } = components;

export const RolesView = () => {
  const [globalState] = store();
  const { roles } = globalState.gameState;

  const roleData = _.map(allRoleNames, rn => ({
    name: rn,
    isAvailable: !_.some(roles, r => Role.getName(r) === rn),
  }));

  const handleSelectRole = roleName => {
    api.chooseRole(roleName);
  };

  return (
    <Styles.Root>
      <header>
        <h1>Select your role.</h1>
      </header>
      <RoleSelector 
        onSelectRole = { handleSelectRole }
        roles = { roleData }
      />
    </Styles.Root>
  );
};
