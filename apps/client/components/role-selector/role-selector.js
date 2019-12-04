import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import * as Styles from './styles';

export const RoleSelector = ({
  onSelectRole,
  roles,
}) => {

  return (
    <Styles.Root>
      { roles.map((role, i) => 
        <Styles.Button 
          disabled = { !role.available }
          key = { i }
          onClick = { () => onSelectRole(role) }
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