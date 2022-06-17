import common from '@the-war-effort/common';
import { PrototypeResource } from '../../../common/models';

const {
  ALL_CALLSIGNS,
  ALL_CHANNELS,
  ALL_FACTIONS,
  ALL_FEATURES,
  ALL_LOCATION_TYPES,
  ALL_RESOURCES,
  ALL_UNITS,
} = common.constants;

const {
  Article, Feature, Location, Resource, Unit,
} = common.models;

export const scenario = {
  articles: [
    ...Article.create(3),
  ],
  budget: 2000000,
  channels: [
    ALL_CHANNELS.news,
    ALL_CHANNELS.map,
  ],
  currentChannel: ALL_CHANNELS.map,
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
    PrototypeResource.create(ALL_RESOURCES.F16),
  ],
  locations: [
    Location.create(ALL_LOCATION_TYPES.CITY, {
      callsign: ALL_CALLSIGNS.CHARLIE,
      id: 'kabul',
      name: 'Kabul',
      position: {
        lat: 34.533473,
        lng: 69.1484533,
      },
    }),
    Location.create(ALL_LOCATION_TYPES.BASE, {
      callsign: ALL_CALLSIGNS.ALPHA,
      features: [
        Feature.create(ALL_FEATURES.AIRPORT, ALL_FACTIONS.PLAYERS),
        Feature.create(ALL_FEATURES.ANTI_AIR_BATTERY, ALL_FACTIONS.PLAYERS),
        Feature.create(ALL_FEATURES.BASIC_TRAINING, ALL_FACTIONS.PLAYERS),
        Feature.create(ALL_FEATURES.INFANTRY_TRAINING_CENTER, ALL_FACTIONS.PLAYERS),
        Feature.create(ALL_FEATURES.AIR_FORCE_ACADEMY, ALL_FACTIONS.PLAYERS),
      ],
      id: 'home-base',
      name: 'Home Base',
      position: {
        lat: 52.4044764,
        lng: 0.5590789,
      },
      resources: [
        ...Resource.create(10, ALL_RESOURCES.MRES),
      ],
    }),
    Location.create(ALL_LOCATION_TYPES.BASE, {
      callsign: ALL_CALLSIGNS.BRAVO,
      features: [
        Feature.create(ALL_FEATURES.AIRPORT, ALL_FACTIONS.PLAYERS, 'Dallas Airbase'),
        Feature.create(ALL_FEATURES.ANTI_AIR_BATTERY, ALL_FACTIONS.PLAYERS),
      ],
      id: 'forward-operating-base',
      name: 'Forward Operating Base',
      position: {
        lat: 31.6349554,
        lng: 65.7151501,
      },
      resources: [],
    }),
  ],
  roles: [],
  room: null,
  trainingGroups: [],
  units: [
    ...Unit.create(2, ALL_UNITS.SQUAD, {
      faction: ALL_FACTIONS.PLAYERS,
      location: 'forward-operating-base',
    }),
  ],
  unitGroups: [],
};
