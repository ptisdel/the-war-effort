import React from 'react';
import useGlobalHook from 'use-global-hook';
import common from '@the-war-effort/common';
import * as actions from './actions';
import * as helpers from '../helpers';

const { constants } = common;

const { createResource } = helpers;
const {
  allFactions, allFeatures, allResourceTypes, defaultLocations,
} = constants;

const initialState = {
  gameState: {
    players: [],
    roles: [],
    budget: 2000000,
    locations: [
      {
        heavyTransports: [],
        name: 'Fightastan',
        features: [],
        resources: [
          createResource(
            allFactions.PLAYERS,
            allResourceTypes.COMBAT.TANK,
          ),
          createResource(
            allFactions.PLAYERS,
            allResourceTypes.COMBAT.SQUAD,
          ),
          createResource(
            allFactions.ENEMY,
            allResourceTypes.COMBAT.SQUAD,
          ),
          createResource(
            allFactions.ENEMY,
            allResourceTypes.COMBAT.SQUAD,
          ),
          createResource(
            allFactions.ENEMY,
            allResourceTypes.COMBAT.SQUAD,
          ),
          createResource(
            allFactions.ENEMY,
            allResourceTypes.COMBAT.SQUAD,
          ),
        ],
      },
      {
        features: [
          {
            faction: allFactions.PLAYERS,
            name: allFeatures.AIRPORT,
          },
          {
            faction: allFactions.PLAYERS,
            name: allFeatures.ANTIAIR,
          },
        ],
        name: defaultLocations.HOME,
        heavyTransports: [
          {
            id: '1234',
            faction: allFactions.PLAYERS,
            name: 'C-17 Globemaster III',
            capacity: 6,
            cargo: [],
          },
        ],
        resources: [
          helpers.createResource(
            allFactions.PLAYERS,
            allResourceTypes.COMBAT.TANK,
          ),
        ],
      },
      {
        name: defaultLocations.FOB,
        features: [
          {
            faction: allFactions.PLAYERS,
            name: allFeatures.AIRPORT,
          },
          {
            faction: allFactions.PLAYERS,
            name: allFeatures.ANTIAIR,
          },
        ],
        heavyTransports: [],
        resources: [],
      },
    ],
    travelGroups: [],
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
