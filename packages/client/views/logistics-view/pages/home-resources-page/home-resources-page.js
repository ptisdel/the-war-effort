import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './home-resources-page.styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants } = common;
const { defaultLocations } = constants;

const HomeResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originName = { defaultLocations.HOME }
      destinationName = { defaultLocations.FOB }
    />
  </Styles.Root>
);

export default HomeResourcesPage;
