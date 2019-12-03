import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import * as Styles from './styles';

export const RoleSelector = ({
  onSelectRole,
  roles,
}) => {
  const handleRoleSelect = role => () => onSelectRole(role);

  const getRoleName = role => _.get(role, 'name');
  
  const getRoleAvailability = role => _.get(role, 'available');

  return (
    <Styles.Root>
      { roles.map((role, i) => 
        <Styles.Button 
          disabled = { !getRoleAvailability(role) }
          key = { i }
          onClick = { handleRoleSelect(role) }
        >
          { getRoleName(role) }
        </Styles.Button>
      )}
    </Styles.Root>
  );
};

RoleSelector.propTypes = ({
  onSelectRole: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
});