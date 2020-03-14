import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants, models } = common;
const { defaultLocations } = constants;

const { Location } = models;

const HomeResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originId = { Location.getId(defaultLocations.HOME) }
      destinationId = { Location.getId(defaultLocations.FOB) }
    />
  </Styles.Root>
);

export default HomeResourcesPage;
