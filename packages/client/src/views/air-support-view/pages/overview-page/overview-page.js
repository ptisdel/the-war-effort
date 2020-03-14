import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './styles';

const { constants, models } = common;

const { airSupportActions } = api;
const { allFactions, allFeatureTypes } = constants;
const {
  Feature,
  GameState,
  Location,
  Unit,
} = models;
const { store } = state;

const OverviewPage = () => {
  const [globalState] = store();

  const { gameState } = globalState;

  const playerAirbases = _.reduce(
    GameState.getLocations(gameState),
    (acc, l) => [
      ...acc,
      ...Location.getFactionFeaturesByType(l, allFactions.PLAYERS, allFeatureTypes.AIRPORT),
    ],
    [],
  );

  const resupplyAircraft = unitId => airSupportActions.resupplyAircraft(unitId);

  const renderAircraft = aircraft => {
    const id = Unit.getId(aircraft);
    const name = Unit.getName(aircraft);
    const type = Unit.getType(aircraft);
    const ammo = Unit.getAmmo(aircraft);
    const maxAmmo = Unit.getMaxAmmo(aircraft);

    return (
      <Styles.Aircraft key = { id } onClick = { () => resupplyAircraft(id) } >
        <Styles.AircraftName>{ `${name}: ${type}` }</Styles.AircraftName>
        <Styles.AircraftAmmo> { `${ammo}/${maxAmmo}` }</Styles.AircraftAmmo>
      </Styles.Aircraft>
    );
  };

  const renderAirbases = () => _.map(playerAirbases, ab => {
    const id = Feature.getId(ab);
    const name = Feature.getName(ab);
    const aircraft = Feature.getUnits(ab);

    return (
      <Styles.Airbase key = { id }>
        <Styles.AirbaseName>
          { name }
        </Styles.AirbaseName>
        <Styles.AircraftList>
          { _.map(aircraft, a => renderAircraft(a)) }
        </Styles.AircraftList>
      </Styles.Airbase>
    );
  });


  return <Styles.Root>
    { renderAirbases() }
  </Styles.Root>;
};

export default OverviewPage;
