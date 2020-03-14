
import common from '@the-war-effort/common';
import * as helpers from '../helpers';

const { constants } = common;

const {
  create,
  createArticles,
  createUnitGroup,
  createMultiple,
  createPrototype,
} = helpers;

const {
  allCallsigns,
  allFactions,
  allFeatures,
  allResources,
  allUnits,
  defaultLocations,
} = constants;

export const test = {
  articles: {
    live: createArticles(4),
    censored: [],
  },
  unitGroups: [
    createUnitGroup(
      [
        create(allUnits.SQUAD,
          {
            faction: allFactions.PLAYERS,
          }),
      ],
      {
        faction: allFactions.PLAYERS,
        position: { lat: 31.6349554, lng: 65.7151501 },
      },
    ),
  ],
  budget: 2000000,
  mapPosition: {
    lat: 33.5,
    lng: 66,
    z: 6,
  },
  parliament: {
    supportingMemberCount: 42,
    totalMemberCount: 120,
  },
  publicSupport: 71,
  players: [],
  prototypes: [
    createPrototype(allResources.F16),
  ],
  roles: [],
  locations: [
    create(defaultLocations.NEW_LOCATION,
      {
        callsign: allCallsigns.CHARLIE,
        name: 'Kabul',
        position: {
          lat: 34.533473,
          lng: 69.1484533,
        },
        units: [
          create(allUnits.TANK, { faction: allFactions.PLAYERS }),
          create(allUnits.SQUAD, { faction: allFactions.PLAYERS }),
          ...createMultiple(allUnits.SQUAD, 3, { faction: allFactions.ENEMY }),
        ],
      }),
    create(defaultLocations.HOME,
      {
        features: [
          create(allFeatures.AIRPORT, {
            faction: allFactions.PLAYERS,
            name: 'Dobbins Air Force Base',
            units: [
              create(allUnits.HELICOPTER, { faction: allFactions.PLAYERS }),
            ],
          }),
          create(allFeatures.ANTI_AIR_BATTERY, { faction: allFactions.PLAYERS }),
          create(allFeatures.BASIC_TRAINING, { faction: allFactions.PLAYERS }),
          create(allFeatures.INFANTRY_TRAINING_CENTER, { faction: allFactions.PLAYERS }),
          create(allFeatures.AIR_FORCE_ACADEMY, { faction: allFactions.PLAYERS }),
        ],
        resources: [
          create(allResources.MRES, {
            amount: 10,
            faction: allFactions.PLAYERS,
          }),
          create(allResources.F16, {
            amount: 3,
            faction: allFactions.PLAYERS,
          }),
        ],
        units: [
          create(allUnits.TANK, { faction: allFactions.PLAYERS }),
          create(allUnits.C17, { faction: allFactions.PLAYERS }),
        ],
      }),
    create(defaultLocations.FOB,
      {
        features: [
          create(allFeatures.AIRPORT, {
            faction: allFactions.PLAYERS,
            name: 'Dallas Airbase',
          }),
          create(allFeatures.ANTI_AIR_BATTERY, { faction: allFactions.PLAYERS }),
        ],
      }),
  ],
  travelGroups: [],
  trainingGroups: [],
};
