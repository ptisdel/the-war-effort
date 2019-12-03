import _ from 'lodash';
import React, { useState } from 'react';
import * as Styles from './styles';
import { RoleSelector } from '../../components';
import api from '../../api';

const initialRoles = [
  {
    name: 'Commander',
    available: true,
  },
  {
    name: 'Logistics Officer',
    available: true,
  },
  {
    name: 'Air Support Officer',
    available: false,
  },
  {
    name: 'Public Affairs Officer',
    available: true,
  },
];

export const RolesView = () => {
  const [roles, setRoles] = useState(initialRoles);

  const handleSelectRole = role => {
    const roleIndex = _.indexOf(roles, role);
    const newRole = {
      ...role,
      available: false,
    };

    setRoles(currentRoles => Object.assign([], currentRoles, { [roleIndex]: newRole }));
    api.chooseRole(_.get(role, 'name'));
  };

  return (
    <Styles.Root>
      <header>
        <h1>Select your role.</h1>
      </header>
      <RoleSelector 
        onSelectRole = { handleSelectRole }
        roles = { roles }
      />
    </Styles.Root>
  );
};
