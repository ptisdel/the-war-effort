import _ from 'lodash';
import React, { useState } from 'react';
import * as Styles from './styles';
import { RoleSelector } from '../../components';
import api from '../../api';
import useGlobal from '../../state/store';

export const RolesView = () => {
  const [globalState, globalActions] = useGlobal();
  const { players, roles } = globalState.gameState;

  const roleData = _.map(roles, r => ({
    name: r,
    available: !_.includes(players, r),
  }));

  const handleSelectRole = role => {
    api.chooseRole(role.name);
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
