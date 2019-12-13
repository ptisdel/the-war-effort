import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import state from '../../../../state';
import * as Styles from './travel-groups-page.styles';

const { models } = common;

const {
  GameState,
  Resource,
  Transport,
  TravelGroup,
} = models;
const { store } = state;

const TravelGroupsPage = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const travelGroups = GameState.getTravelGroups(gameState) || [];

  const renderTransport = (transport, key) => (
      <Styles.Transport key = { key }>
        <Styles.TransportName>{ Transport.getName(transport) }</Styles.TransportName>
        {
          _.map(Transport.getCargo(transport), (c, i) => (
            <Styles.TransportCargo key = { i }>{ Resource.getName(c) }</Styles.TransportCargo>
          ))
        }
      </Styles.Transport>
  );

  const renderTravelGroups = () => {
    if (travelGroups.length === 0) return 'No active transport missions.';

    return _.map(travelGroups, (tg, i) => (
      <Styles.TravelGroup key = { i }>
        <Styles.TravelGroupOrigin>
          From: { TravelGroup.getOriginName(tg) }
        </Styles.TravelGroupOrigin>
        <Styles.TravelGroupDestination>
          To: { TravelGroup.getDestinationName(tg) }
        </Styles.TravelGroupDestination>
        <Styles.TravelGroupTransports>
          { _.map(TravelGroup.getTransports(tg), (t, i) => renderTransport(t, i)) }
        </Styles.TravelGroupTransports>
      </Styles.TravelGroup>
    ));
  };

  return (
    <Styles.Root>
      <Styles.TravelGroupList>
        { renderTravelGroups() }
      </Styles.TravelGroupList>
    </Styles.Root>
  );
};

export default TravelGroupsPage;
