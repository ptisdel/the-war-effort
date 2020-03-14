import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const RoleHeader = ({
  onResign,
  title,
}) => (
  <Styles.Root as = 'header'>
    <Styles.Title as = 'h1'>{ title }</Styles.Title>
    { onResign && <Styles.Button as = 'button' onClick = { onResign }>Resign</Styles.Button> }
  </Styles.Root>
);

RoleHeader.propTypes = ({
  onResign: PropTypes.func,
  title: PropTypes.string.isRequired,
});

export default RoleHeader;
