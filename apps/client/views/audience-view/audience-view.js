import _ from 'lodash';
import React from 'react';
import components from './components';
import api from '../../api';
import { constants } from '../../../shared';
import { Role } from '../../../shared/models';
import state from '../../state';
import * as Styles from './audience-view.styles';

const { store } = state;
const { allRoles } = constants;
const { RoleSelector } = components;

export const AudienceView = () => {
  const [globalState] = store();
  const { roles } = globalState.gameState;

  const roleData = _.map(allRoles, ar => ({
    name: ar,
    isAvailable: !_.some(roles, r => Role.getName(r) === ar),
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
