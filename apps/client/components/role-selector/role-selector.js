import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import * as Styles from './styles';

export const RoleSelector = ({
  onSelectRole,
  roles,
}) => {
console.log(roles);
  return (
    <Styles.Root>
      { roles.map((role, i) => 
        <Styles.Button 
          disabled = { !role.isAvailable }
          key = { i }
          onClick = { () => onSelectRole(role.name) }
        >
          { role.name }
        </Styles.Button>
      )}
    </Styles.Root>
  );
};

RoleSelector.propTypes = ({
  onSelectRole: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
});