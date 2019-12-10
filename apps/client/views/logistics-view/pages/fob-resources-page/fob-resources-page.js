import _ from 'lodash';
import React, { useState } from 'react';
import * as api from '../../../../api';
import { constants, models } from '../../../../../common';
import state from '../../../../state';
import * as Styles from './fob-resources-page.styles';

const { defaultLocations } = constants;
const { logisticsActions } = api;
const { GameState, Resource } = models;
const { store } = state;

const FobResourcesPage = () => {
  const [selectedResources, setSelectedResources] = useState([]);

  const [globalState] = store();
  const { gameState } = globalState;

  const availableHeavyTransports = GameState.getLocationHeavyTransports(
    gameState,
    defaultLocations.FOB,
  ) || [];

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
      destinationName: defaultLocations.HOME,
      originName: defaultLocations.FOB,
      transports: [
        {
          ...availableHeavyTransports[0],
          cargo: selectedResources,
        },
      ],
    });
    setSelectedResources([]);
  };

  const fobResources = GameState.getLocationResources(gameState, defaultLocations.FOB);
  const unselectedFobResources = _.difference(fobResources, selectedResources);
  const renderUnselectedResources = () => {
    if (unselectedFobResources.length === 0) return 'No resources available at the Foward Operating Base.';

    return _.map(unselectedFobResources, (r, i) => (
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

export default FobResourcesPage;
