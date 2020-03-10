import PropTypes from 'prop-types';
import React from 'react';
import * as Styles from './styles';

const RoleSelector = ({
  onSelectRole,
  roles,
}) => {
  const renderRoleButtons = () => roles.map((role, i) => (
      <Styles.Button
        disabled = { !role.isAvailable }
        key = { i }
        onClick = { () => onSelectRole(role.name) }>
        { role.name }
      </Styles.Button>
  ));

  return (
    <Styles.Root>
      { renderRoleButtons() }
    </Styles.Root>
  );
};

RoleSelector.propTypes = ({
  onSelectRole: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
});

export default RoleSelector;
