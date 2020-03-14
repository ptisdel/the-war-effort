import _ from 'lodash';
import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import common from '@the-war-effort/common';
import * as Styles from './map-view.styles';
import state from '../../state';
// import * as helpers from '../../helpers';
import { mapStyles } from './map-styles';

const { constants, models } = common;

const { allRoles } = constants;
const {
  Feature,
  GameState,
  Location,
  Resource,
  Role,
  Unit,
  UnitGroup,
} = models;
const { store } = state;

export const MapView = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const players = GameState.getPlayers(gameState);
  const locations = GameState.getLocations(gameState);
  const mapPosition = GameState.getMapPosition(gameState);
  const roles = GameState.getRoles(gameState);
  const unitGroups = GameState.getUnitGroups(gameState);

  const getPlayerRole = player => _.find(roles, r => Role.getPlayer(r) === player);

  // helpers.createRoute({
  //   origin: {
  //     lat: 31.6349554,
  //     lng: 65.7151501,
  //   },
  //   destination: {
  //     lat: 34.533473,
  //     lng: 69.1484533,
  //   },
  // }).then(response => console.log(response));

  const renderLocation = (location, key) => (
    <React.Fragment key = { key }>
      <Styles.LocationName>{ Location.getName(location) }</Styles.LocationName>
      <Styles.Resources>
        <Styles.ResourcesTitle>Resources</Styles.ResourcesTitle>
          <Styles.ResourcesList>
            { _.map(Location.getResources(location), (r, rkey) => (
              <Styles.Resource key = { rkey }>
                { `${Resource.getAmount(r)} ${Resource.getFaction(r)} ${Resource.getName(r, Resource.getAmount(r))}` }
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

  const createMarker = ({
    abbreviation = 'X', color = '#000', label = null, type = 'location',
  }) => {
    if (type === 'locat2ion') {
      return `data:image/svg+xml;utf-8, ${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="20" viewBox="0 0 19 19">
          <g fill="#fff" stroke="#707070" stroke-width="1">
            <rect width="20" height="20" stroke="none"/>
            <rect x="1" y="1" width="17" height="17" fill="none"/>
          </g>
          <text x="50%" y ="11" dominant-baseline="middle" font-size="13" font-weight="bold" font-family="Bahnschrift" text-anchor="middle" fill="${color}">${abbreviation}</text>
          <text x="22" y ="11" dominant-baseline="middle" font-size="8" font-weight="bold" font-family="Bahnschrift" text-anchor="left" fill="black">${label}</text>
        </svg>
      `)}`;
    }

    if (type === 'unitGroup') {
      return `data:image/svg+xml;utf-8, ${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="20" viewBox="0 0 19 19">
          <g fill="#fff" stroke="#707070" stroke-width="1">
            <rect width="20" height="20" stroke="none"/>
            <rect x="1" y="1" width="17" height="17" fill="none"/>
          </g>
          <text x="50%" y ="11" dominant-baseline="middle" font-size="13" font-weight="bold" font-family="Bahnschrift" text-anchor="middle" fill="${color}">${abbreviation}</text>
          <text x="22" y ="11" dominant-baseline="middle" font-size="8" font-weight="bold" font-family="Bahnschrift" text-anchor="left" fill="black">${label}</text>
        </svg>
      `)}`;
    }

    return null;
  };

  const { lat, lng, z } = mapPosition;

  const WorldMap = (
    <LoadScript googleMapsApiKey= { process.env.GOOGLE_MAPS_API_KEY }>
      <Styles.Map>
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
          }}
          center = {{
            lat,
            lng,
          }}
          zoom = { z }
          options = {{
            disableDefaultUI: 'true',
            styles: mapStyles,
          }}
        >
          {
            _.map(locations, l => <Marker
                  icon = {
                    createMarker({
                      abbreviation: _.first(Location.getCallsign(l)),
                      color: 'black',
                      label: Location.getName(l),
                      type: 'location',
                    })
                  }
                  key = { Location.getId(l) }
                  position = { Location.getPosition(l) }
              />)
          }
          {
            _.map(unitGroups, ug => <Marker
                  icon = {
                    createMarker({
                      abbreviation: _.first(UnitGroup.getName(ug)),
                      color: 'black',
                      label: UnitGroup.getName(ug),
                      type: 'unitGroup',
                    })
                  }
                  key = { UnitGroup.getId(ug) }
                  position = { UnitGroup.getPosition(ug) }
              />)
          }
        </GoogleMap>
      </Styles.Map>
    </LoadScript>
  );

  const [isInformationOpen, setIsInformationOpen] = useState(false);

  return (
    <Styles.Root>
      { WorldMap }
      <Styles.Information>
        <Styles.InformationHeader
          onClick = { () => setIsInformationOpen(!isInformationOpen) }
        >Stats</Styles.InformationHeader>
        <Styles.InformationContent isOpen = { isInformationOpen }>
          <Styles.PlayerList>
            { renderPlayerList() }
          </Styles.PlayerList>
          <Styles.Locations>
            { _.map(_.sortBy(locations, l => Location.getName(l)), (l, key) => renderLocation(l, key)) }
          </Styles.Locations>
        </Styles.InformationContent>
      </Styles.Information>
    </Styles.Root>
  );
};
