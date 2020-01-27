import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './news-view.styles';
import components from '../../components';
import state from '../../state';

const { constants, models } = common;

const { GameEngine } = components;
const { allRoles } = constants;
const {
  Feature,
  Location,
  Resource,
  Role,
  Transport,
  Unit,
} = models;
const { store } = state;

export const NewsView = () => {
  const [globalState] = store();

  const { players, locations, roles } = globalState.gameState;

  const getPlayerRole = player => _.find(roles, r => Role.getPlayer(r) === player);

  const renderLocation = (location, key) => (
    <React.Fragment key = { key }>
      <Styles.LocationName>{ Location.getName(location) }</Styles.LocationName>
      <Styles.Resources>
        <Styles.ResourcesTitle>Resources</Styles.ResourcesTitle>
          <Styles.ResourcesList>
            { _.map(Location.getResources(location), (r, rkey) => (
              <Styles.Resource key = { rkey }>
                { `${Resource.getFaction(r)} ${Resource.getName(r)}` }
              </Styles.Resource>
            )) }
          </Styles.ResourcesList>
      </Styles.Resources>
      <Styles.Units>
        <Styles.UnitsTitle>Units</Styles.UnitsTitle>
          <Styles.UnitsList>
            { _.map(Location.getUnits(location), (u, ukey) => (
              <Styles.Unit key = { ukey }>
                { `${Unit.getFaction(u)} ${Unit.getName(u)}` }
              </Styles.Unit>
            )) }
          </Styles.UnitsList>
      </Styles.Units>
      <Styles.Transports>
        <Styles.TransportsTitle>Transports</Styles.TransportsTitle>
          <Styles.TransportsList>
            { _.map(Location.getHeavyTransports(location), (t, tkey) => (
              <Styles.Transport key = { tkey }>{ Transport.getName(t) }</Styles.Transport>
            )) }
          </Styles.TransportsList>
      </Styles.Transports>
      <Styles.Features>
        <Styles.FeaturesTitle>Features</Styles.FeaturesTitle>
          <Styles.FeaturesList>
            { _.map(Location.getFeatures(location), (f, fkey) => (
              <Styles.Feature key = { fkey }>{ Feature.getName(f) }</Styles.Feature>
            )) }
          </Styles.FeaturesList>
      </Styles.Features>
    </React.Fragment>
  );

  const renderPlayerList = () => _.map(players, (p, key) => {
    const role = getPlayerRole(p);
    const roleName = Role.getName(role) || allRoles.AUDIENCE;
    return <li key = { key }>{ roleName } : { Role.getFormattedBudget(role) || '$0' }</li>;
  });

  return (
    <Styles.Root>
      <GameEngine/>
      <h1>Overview</h1>
      <Styles.PlayerList>
        { renderPlayerList() }
      </Styles.PlayerList>
      <Styles.Locations>
        {_.map(_.sortBy(locations, l => Location.getName(l)), (l, key) => renderLocation(l, key)) }
      </Styles.Locations>
    </Styles.Root>
  );
};
