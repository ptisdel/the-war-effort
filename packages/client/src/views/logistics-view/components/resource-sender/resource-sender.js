import _ from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './styles';

const { constants, helpers, models } = common;

const { allFactions } = constants;
const { logisticsActions } = api;
const { log } = helpers;
const {
  GameState, Location, Resource, Unit,
} = models;
const { store } = state;

const ResourceSender = ({ originId, destinationId }) => {
  const [selectedResources, setSelectedResources] = useState([]);

  const [globalState] = store();
  const { gameState } = globalState;

  const origin = GameState.getLocationById(gameState, originId);
  const originName = Location.getName(origin);
  const originResources = Location.getResources(origin) || [];
  const originUnits = Location.getUnitsByFaction(origin, allFactions.PLAYERS);

  const availableTransports = _.filter(originUnits, u => Unit.getCapacity(u) > 0);

  const canSendResources = () => (
    Boolean(availableTransports.length) && Boolean(selectedResources.length)
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
    log('logistics', selectedResources);
    logisticsActions.createTravelGroup({
      destinationId,
      originId,
      transports: [
        {
          ...availableTransports[0],
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
          { Resource.getName(r, 1) }
        </Styles.ResourceTitle>
      </Styles.Resource>
    ));
  };

  const renderSelectedResources = () => {
    if (selectedResources.length === 0) return 'No resources selected for transport.';

    return _.map(selectedResources, (r, i) => (
      <Styles.Resource as = 'li' key = { i }>
        <Styles.ResourceTitle onClick = { () => handleRemoveResource(r) }>
          { Resource.getName(r, 1) }
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
      { availableTransports.length
        ? `${availableTransports.length} transports available.`
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
  destinationId: PropTypes.string.isRequired,
  originId: PropTypes.string.isRequired,
});

export default ResourceSender;
