import _ from 'lodash';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './home-resources-page.styles';

const { constants, models } = common;

const { defaultLocations } = constants;
const { logisticsActions } = api;
const { GameState, Location, Resource } = models;
const { store } = state;

const HomeResourcesPage = () => {
  const [selectedResources, setSelectedResources] = useState([]);

  const [globalState] = store();
  const { gameState } = globalState;

  const location = GameState.getLocationByName(gameState, defaultLocations.HOME);
  const availableHeavyTransports = Location.getHeavyTransports(location) || [];

  const canSendResources = () => (
    Boolean(availableHeavyTransports.length) && Boolean(selectedResources.length)
  );

  const handleAddResource = resource => {
    setSelectedResources([
      ...selectedResources,
      resource,
    ]);
  };

  const handleRemoveResource = resource => {
    setSelectedResources(_.differenceWith(selectedResources, resource, _.isEqual));
  };

  const handleSendTransports = () => {
    logisticsActions.createTravelGroup({
      destinationName: defaultLocations.FOB,
      originName: defaultLocations.HOME,
      transports: [
        {
          ...availableHeavyTransports[0],
          cargo: selectedResources,
        },
      ],
    });
    setSelectedResources([]);
  };

  const homeResources = Location.getResources(defaultLocations.HOME) || [];
  const unselectedHomeResources = _.difference(homeResources, selectedResources);
  const renderUnselectedResources = () => {
    if (unselectedHomeResources.length === 0) return 'No resources available at the Home Office';

    return _.map(unselectedHomeResources, (r, i) => (
      <Styles.Resource as = 'li' key = { i }>
        <Styles.ResourceTitle onClick = { () => handleAddResource(r) }>
          { Resource.getName(r) }
        </Styles.ResourceTitle>
      </Styles.Resource>
    ));
  };

  const renderSelectedResources = () => {
    if (selectedResources.length === 0) return 'No resources selected for transport.';

    return _.map(selectedResources, (r, i) => (
      <Styles.Resource as = 'li' key = { i }>
        <Styles.ResourceTitle onClick = { () => handleRemoveResource(r) }>
          { Resource.getName(r) }
        </Styles.ResourceTitle>
      </Styles.Resource>
    ));
  };

  return (
    <Styles.Root>
      <Styles.ResourceList>
        <p>Tap resources to send.</p>
        { renderUnselectedResources() }
      </Styles.ResourceList>
      { availableHeavyTransports.length
        ? `${availableHeavyTransports.length} transports available.`
        : 'No transports available.'}
      <Styles.CargoSpace>
        { renderSelectedResources() }
      </Styles.CargoSpace>
      {
        canSendResources()
        && (<Styles.SendButton onClick = { handleSendTransports }>Send</Styles.SendButton>)
      }
    </Styles.Root>
  );
};

export default HomeResourcesPage;
