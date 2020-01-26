import React from 'react';
import useGlobalHook from 'use-global-hook';
import common from '@the-war-effort/common';
import * as actions from './actions';
import * as helpers from '../helpers';

const { constants } = common;

const { createResource, createFeature } = helpers;
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
          createResource({
            faction: allFactions.PLAYERS,
            type: allResourceTypes.COMBAT.TANK,
          }),
          createResource({
            faction: allFactions.PLAYERS,
            type: allResourceTypes.COMBAT.SQUAD,
          }),
          createResource({
            faction: allFactions.ENEMY,
            type: allResourceTypes.COMBAT.SQUAD,
          }),
          createResource({
            faction: allFactions.ENEMY,
            type: allResourceTypes.COMBAT.SQUAD,
          }),
          createResource({
            faction: allFactions.ENEMY,
            type: allResourceTypes.COMBAT.SQUAD,
          }),
          createResource({
            faction: allFactions.ENEMY,
            type: allResourceTypes.COMBAT.SQUAD,
          }),
        ],
      },
      {
        features: [
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.AIRPORT,
          }),
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.ANTI_AIR_BATTERY,
          }),
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.BASIC_TRAINING,
            modifiers: {
              traineeCount: 20,
            },
          }),
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.INFANTRY_COMBAT_TRAINING_CENTER,
          }),
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.AIR_FORCE_ACADEMY,
          }),
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
          createResource({
            faction: allFactions.PLAYERS,
            type: allResourceTypes.COMBAT.TANK,
          }),
        ],
      },
      {
        name: defaultLocations.FOB,
        features: [
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.AIRPORT,
          }),
          createFeature({
            faction: allFactions.PLAYERS,
            type: allFeatures.ANTI_AIR_BATTERY,
          }),
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
