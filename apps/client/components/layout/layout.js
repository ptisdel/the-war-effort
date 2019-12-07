import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './layout.styles';

const Layout = (props) => {
  const { children } = props;

  return (
    <Styles.Root>
      { children }
    </Styles.Root>
  );
};

Layout.propTypes = ({
  children: PropTypes.node,
});

export default Layout;
