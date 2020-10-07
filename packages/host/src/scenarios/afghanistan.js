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
  ALL_CALLSIGNS,
  ALL_FACTIONS,
  ALL_FEATURES,
  ALL_RESOURCES,
  ALL_UNITS,
  DEFAULT_LOCATIONS,
} = constants;

export const afghanistanScenario = {
  articles: {
    live: createArticles(4),
    censored: [],
  },
  unitGroups: [
    createUnitGroup(
      [
        create(ALL_UNITS.SQUAD,
          {
            faction: ALL_FACTIONS.PLAYERS,
          }),
      ],
      {
        faction: ALL_FACTIONS.PLAYERS,
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
    createPrototype(ALL_RESOURCES.F16),
  ],
  roles: [],
  locations: [
    create(DEFAULT_LOCATIONS.NEW_LOCATION_TEMPLATE,
      {
        callsign: ALL_CALLSIGNS.CHARLIE,
        name: 'Kabul',
        position: {
          lat: 34.533473,
          lng: 69.1484533,
        },
        units: [
          create(ALL_UNITS.TANK, { faction: ALL_FACTIONS.PLAYERS }),
          create(ALL_UNITS.SQUAD, { faction: ALL_FACTIONS.PLAYERS }),
          ...createMultiple(ALL_UNITS.SQUAD, 3, { faction: ALL_FACTIONS.ENEMY }),
        ],
      }),
    create(DEFAULT_LOCATIONS.HOME,
      {
        features: [
          create(ALL_FEATURES.AIRPORT, {
            faction: ALL_FACTIONS.PLAYERS,
            name: 'Dobbins Air Force Base',
            units: [
              create(ALL_UNITS.HELICOPTER, { faction: ALL_FACTIONS.PLAYERS }),
            ],
          }),
          create(ALL_FEATURES.ANTI_AIR_BATTERY, { faction: ALL_FACTIONS.PLAYERS }),
          create(ALL_FEATURES.BASIC_TRAINING, { faction: ALL_FACTIONS.PLAYERS }),
          create(ALL_FEATURES.INFANTRY_TRAINING_CENTER, { faction: ALL_FACTIONS.PLAYERS }),
          create(ALL_FEATURES.AIR_FORCE_ACADEMY, { faction: ALL_FACTIONS.PLAYERS }),
        ],
        resources: [
          create(ALL_RESOURCES.MRES, {
            amount: 10,
            faction: ALL_FACTIONS.PLAYERS,
          }),
          create(ALL_RESOURCES.F16, {
            amount: 3,
            faction: ALL_FACTIONS.PLAYERS,
          }),
        ],
        units: [
          create(ALL_UNITS.TANK, { faction: ALL_FACTIONS.PLAYERS }),
          create(ALL_UNITS.C17, { faction: ALL_FACTIONS.PLAYERS }),
        ],
      }),
    create(DEFAULT_LOCATIONS.FOB,
      {
        features: [
          create(ALL_FEATURES.AIRPORT, {
            faction: ALL_FACTIONS.PLAYERS,
            name: 'Dallas Airbase',
          }),
          create(ALL_FEATURES.ANTI_AIR_BATTERY, { faction: ALL_FACTIONS.PLAYERS }),
        ],
      }),
  ],
  travelGroups: [],
  trainingGroups: [],
};
