import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants, models } = common;
const { DEFAULT_LOCATIONS } = constants;

const { Location } = models;

const HomeResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originId = { Location.getId(DEFAULT_LOCATIONS.HOME) }
      destinationId = { Location.getId(DEFAULT_LOCATIONS.FOB) }
    />
  </Styles.Root>
);

export default HomeResourcesPage;
