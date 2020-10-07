import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './styles';
import ResourceSender from '../../components/resource-sender/resource-sender';

const { constants, models } = common;
const { DEFAULT_LOCATIONS } = constants;

const { Location } = models;

const FobResourcesPage = () => (
  <Styles.Root>
    <ResourceSender
      originId = { Location.getId(DEFAULT_LOCATIONS.FOB) }
      destinationId = { Location.getId(DEFAULT_LOCATIONS.HOME) }
    />
  </Styles.Root>
);

export default FobResourcesPage;
