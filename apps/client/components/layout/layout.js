import React from 'react';
import * as Styles from './layout.styles';

const Layout = props => {
  const { children } = props;

  return (
    <Styles.Root>
      { children }
    </Styles.Root>
  );
}

export default Layout;