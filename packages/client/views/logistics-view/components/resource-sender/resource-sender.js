import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './resource-sender.styles';

const { models } = common;

const { logisticsActions } = api;
const { GameState, Location, Resource } = models;
const { store } = state;

const ResourceSender = ({ originName, destinationName }) => {
  const [selectedResources, setSelectedResources] = useState([]);

  const [globalState] = store();
  const { gameState } = globalState;

  const origin = GameState.getLocationByName(gameState, originName);
  const originResources = Location.getResources(origin) || [];

  const availableHeavyTransports = Location.getHeavyTransports(origin) || [];
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
    console.log(selectedResources);
    logisticsActions.createTravelGroup({
      destinationName,
      originName,
      transports: [
        {
          ...availableHeavyTransports[0],
          cargo: selectedResources,
        },
      ],
    });
    setSelectedResources([]);
  };

  const unselectedOriginResources = _.difference(originResources, selectedResources);
  const renderUnselectedResources = () => {
    if (unselectedOriginResources.length === 0) return `No resources available at ${originName}.`;

    return _.map(unselectedOriginResources, (r, i) => (
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
        canSendResources() && (
        <Styles.SendButton
          onClick = { handleSendTransports }>
            Send resources
        </Styles.SendButton>
        )
      }
    </Styles.Root>
  );
};

ResourceSender.propTypes = ({
  destinationName: PropTypes.string.isRequired,
  originName: PropTypes.string.isRequired,
});

export default ResourceSender;
