import React from 'react';
import useGlobalHook from 'use-global-hook';
import common from '@the-war-effort/common';
import * as actions from './actions';
import * as helpers from '../helpers';

const { constants } = common;

const { createUnit, createFeature, createResources } = helpers;
const {
  allFactions, allFeatures, allResources, allUnits, defaultLocations,
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
        resources: [],
        units: [
          createUnit({
            faction: allFactions.PLAYERS,
            type: allUnits.TANK,
          }),
          createUnit({
            faction: allFactions.PLAYERS,
            type: allUnits.SQUAD,
          }),
          createUnit({
            faction: allFactions.ENEMY,
            type: allUnits.SQUAD,
          }),
          createUnit({
            faction: allFactions.ENEMY,
            type: allUnits.SQUAD,
          }),
          createUnit({
            faction: allFactions.ENEMY,
            type: allUnits.SQUAD,
          }),
          createUnit({
            faction: allFactions.ENEMY,
            type: allUnits.SQUAD,
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
              id: '142241',
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
          ...createResources({
            count: 10,
            faction: allFactions.PLAYERS,
            type: allResources.MRES,
          }),
        ],
        units: [
          createUnit({
            faction: allFactions.PLAYERS,
            type: allUnits.TANK,
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
        unit: [],
      },
    ],
    travelGroups: [],
    trainingGroups: [],
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
