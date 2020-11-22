import common from '@the-war-effort/common';
import { PrototypeResource } from '@the-war-effort/common/models';

const {
  ALL_CALLSIGNS,
  ALL_CHANNELS,
  ALL_FACTIONS,
  ALL_LOCATION_TYPES,
  ALL_PATHS,
  ALL_RESOURCES,
  ALL_UNITS,
} = common.constants;

const {
  Article, Location, Path, Unit,
} = common.models;

export const scenario = {
  articles: [
    ...Article.create(3),
  ],
  budget: 2000000,
  channels: [
    ALL_CHANNELS.news,
    ALL_CHANNELS.map,
    ALL_CHANNELS.realisticMap,
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
  paths: [
    Path.create(ALL_PATHS.PAVED_ROAD, {
      locationA: 'alpha',
      locationB: 'beta',
    }),
  ],
  publicSupport: 71,
  players: [],
  prototypes: [
    PrototypeResource.create(ALL_RESOURCES.F16),
  ],
  locations: [
    Location.create(ALL_LOCATION_TYPES.CITY, {
      callsign: ALL_CALLSIGNS.ALPHA,
      id: 'alpha',
      name: 'Alpha',
      position: { lat: 10, lng: 20 },
    }),
    Location.create(ALL_LOCATION_TYPES.CITY, {
      callsign: ALL_CALLSIGNS.BETA,
      id: 'beta',
      name: 'Beta',
      position: { lat: 70, lng: 54 },
    }),
  ],
  roles: [],
  trainingGroups: [],
  units: [
    ...Unit.create(2, ALL_UNITS.SQUAD, {
      faction: ALL_FACTIONS.PLAYERS,
      location: 'forward-operating-base',
    }),
  ],
  unitGroups: [],
};
