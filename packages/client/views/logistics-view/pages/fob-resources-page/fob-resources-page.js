import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './fob-resources-page.styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants } = common;
const { defaultLocations } = constants;

const FobResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originName = { defaultLocations.FOB }
      destinationName = { defaultLocations.HOME }
    />
  </Styles.Root>
);

export default FobResourcesPage;
