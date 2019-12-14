import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './layout.styles';

const Layout = ({
  children,
}) => (
  <Styles.Root>
    <Styles.Main as = 'main'>
      { children }
    </Styles.Main>
  </Styles.Root>
);

Layout.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default Layout;
