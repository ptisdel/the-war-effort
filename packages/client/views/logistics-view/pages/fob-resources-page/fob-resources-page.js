import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './fob-resources-page.styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants, models } = common;
const { defaultLocations } = constants;

const { Location } = models;

const FobResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originId = { Location.getId(defaultLocations.FOB) }
      destinationId = { Location.getId(defaultLocations.HOME) }
    />
  </Styles.Root>
);

export default FobResourcesPage;
