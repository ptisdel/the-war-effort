import _ from 'lodash';
import React from 'react';
import components from '../../components';
import api from '../../api';
import { constants } from '../../../shared';
import state from '../../state';
import * as Styles from './styles';
import { Role } from '../../../shared/models';

const { allRoles } = constants;

const { RoleSelector } = components;
const { store } = state;

export const RolesView = () => {
  const [globalState] = store();
  const { roles } = globalState.gameState;
  console.log(roles);

  const roleData = _.map(allRoles, roleName => ({
    name: roleName,
    isAvailable: !_.has(roles, roleName),
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
