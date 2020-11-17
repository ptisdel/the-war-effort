export const ALL_ARTICLE_PARTS = {
  AUTHORS: [
    'authorA',
    'authorB',
    'authorC',
    'authorD',
    'authorE',
    'authorF',
    'authorG',
    'authorH',
  ],
  BODIES: [
    'bodyA',
    'bodyB',
    'bodyC',
    'bodyD',
    'bodyE',
    'bodyF',
    'bodyG',
    'bodyH',
  ],
  TITLES: [
    'titleA',
    'titleB',
    'titleC',
    'titleD',
    'titleE',
    'titleF',
    'titleG',
    'titleH',
  ],
};

export const ALL_CALLSIGNS = {
  ALPHA: 'Alpha',
  BRAVO: 'Bravo',
  CHARLIE: 'Charlie',
  DELTA: 'Delta',
  ECHO: 'Echo',
  FOXTROT: 'Foxtrot',
  HOTEL: 'Hotel',
  KILO: 'Kilo',
  LIMA: 'Lima',
  OSCAR: 'Oscar',
  PAPA: 'Papa',
  QUEBEC: 'Quebec',
  TANGO: 'Tango',
  VICTOR: 'Victor',
  WHISKEY: 'Whiskey',
  XRAY: 'X-ray',
  YANKEE: 'Yankee',
  ZULU: 'Zulu',
};

export const ALL_CHANNELS = {
  news: 'news',
  map: 'map',
  politics: 'politics',
};

export const ALL_FACTIONS = {
  PLAYERS: 'Player',
  ENEMY: 'Enemy',
  NGO: 'NGO',
  CIVILIAN: 'Civilian',
};

export const ALL_ROLES = {
  AIR_SUPPORT: 'Air Support Officer',
  AUDIENCE: 'Audience Member',
  COMMANDER: 'Commander',
  GROUND_FORCES: 'Ground Forces Commander',
  INTELLIGENCE: 'Intelligence Officer',
  LOGISTICS: 'Logistics Officer',
  PROCUREMENT: 'Procurement Officer',
  PUBLIC_AFFAIRS: 'Public Affairs Officer',
  TRAINING: 'Training Officer',
};

export const ALL_RESOURCE_TYPES = {
  AIRCRAFT: 'Aircraft',
  AMMUNITION: 'Ammunition',
  FOOD: 'Food',
  GROUND_VEHICLE: 'Ground Vehicle',
  HUMAN_RESOURCE: 'Human Resource',
};

export const ALL_RESOURCES = {
  RECRUIT: {
    name: {
      plural: 'Recruits',
      singular: 'Recruit',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  PRIVATE: {
    name: {
      plural: 'Privates',
      singular: 'Private',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  RIFLEMAN: {
    name: {
      plural: 'Riflemen',
      singular: 'Rifleman',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  ARMOR_CREWMAN: {
    name: {
      plural: 'Armor Crewmen',
      singular: 'Armor Crewman',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  SPECIAL_OPERATOR: {
    name: {
      plural: 'Special Operators',
      singular: 'Special Operator',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  CADET: {
    name: {
      plural: 'Cadets',
      singular: 'Cadet',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  FIGHTER_PILOT: {
    name: {
      plural: 'Fighter Pilots',
      singular: 'Fighter Pilot',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  HEAVY_TRANSPORT_PILOT: {
    name: {
      plural: 'Heavy Transport Pilots',
      singular: 'Heavy Transport Pilot',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  HELICOPTER_PILOT: {
    name: {
      plural: 'Helicopter Pilots',
      singular: 'Helicopter Pilot',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  UAV_PILOT: {
    name: {
      plural: 'UAV Pilots',
      singular: 'UAV Pilot',
    },
    type: ALL_RESOURCE_TYPES.HUMAN_RESOURCE,
  },
  F16: {
    cost: 100,
    name: {
      plural: 'F-16s',
      singular: 'F-16',
    },
    type: ALL_RESOURCE_TYPES.AIRCRAFT,
    stats: {
      accuracy: 5,
      attack: 10,
      defense: 6,
    },
  },
  MRES: {
    name: {
      plural: 'MREs',
      singular: 'MRE',
    },
    type: ALL_RESOURCE_TYPES.FOOD,
    stats: {
      nutrition: 5,
    },
  },
};

export const ALL_UNIT_TYPES = {
  GROUND: 'Ground',
  AIR: 'Air',
  SEA: 'Sea',
};

export const ALL_UNITS = {
  SQUAD: {
    type: ALL_UNIT_TYPES.GROUND,
    name: 'Squad',
    number: 10,
    size: 1,
    stats: {
      accuracy: 0.8,
      attack: 2,
      defense: 1,
    },
  },
  TANK: {
    type: ALL_UNIT_TYPES.GROUND,
    name: 'Tank',
    number: 1,
    size: 2,
    stats: {
      accuracy: 0.6,
      attack: 5,
      defense: 5,
    },
  },
  HELICOPTER: {
    crew: 1,
    crewType: ALL_RESOURCE_TYPES.HELICOPTER_PILOT,
    fuel: 15,
    maxFuel: 15,
    ammo: 50,
    maxAmmo: 100,
    name: 'Helicopter',
    number: 1,
    size: 3,
    stats: {
      accuracy: 0.9,
      attack: 10,
      defense: 5,
    },
    type: ALL_UNIT_TYPES.AIR,
  },
  C17: {
    ammo: 0,
    capacity: 6,
    cargo: [],
    crew: 2,
    crewType: ALL_RESOURCE_TYPES.HEAVY_TRANSPORT_PILOT,
    fuel: 15,
    maxAmmo: 0,
    maxFuel: 15,
    name: 'C-17 Globemaster III',
    size: 8,
    type: ALL_UNIT_TYPES.AIR,
  },
};

export const ALL_TRAINING_PATHS = {
  BASIC_TRAINING: {
    name: 'Basic Training',
    traineeType: ALL_RESOURCES.RECRUIT,
    graduateType: ALL_RESOURCES.PRIVATE,
    length: 10,
  },
  COMBAT_TRAINING: {
    name: 'Combat Training',
    traineeType: ALL_RESOURCES.PRIVATE,
    graduateType: ALL_RESOURCES.RIFLEMAN,
    length: 10,
  },
  ARMOR_TRAINING: {
    name: 'Armor Training',
    traineeType: ALL_RESOURCES.PRIVATE,
    graduateType: ALL_RESOURCES.ARMOR_CREWMAN,
    length: 20,
  },
  SPECIAL_FORCES_TRAINING: {
    name: 'Special Forces Training',
    traineeType: ALL_RESOURCES.RIFLEMAN,
    graduateType: ALL_RESOURCES.SPECIAL_OPERATOR,
    length: 30,
  },
  CADET_TRAINING: {
    name: 'Air Force Academy',
    traineeType: ALL_RESOURCES.RECRUIT,
    graduateType: ALL_RESOURCES.CADET,
    length: 10,
  },
  FIGHTER_PILOT_TRAINING: {
    name: 'Fighter Pilot Training',
    traineeType: ALL_RESOURCES.CADET,
    graduateType: ALL_RESOURCES.FIGHTER_PILOT,
    length: 30,
  },
  HEAVY_TRANSPORT_PILOT_TRAINING: {
    name: 'Heavy Transport Pilot Training',
    traineeType: ALL_RESOURCES.CADET,
    graduateType: ALL_RESOURCES.HEAVY_TRANSPORT_PILOT,
    length: 30,
  },
  HELICOPTER_PILOT_TRAINING: {
    name: 'Helicopter Pilot Training',
    traineeType: ALL_RESOURCES.CADET,
    graduateType: ALL_RESOURCES.HELICOPTER_PILOT,
    length: 30,
  },
  UAV_PILOT_TRAINING: {
    name: 'UAV Pilot Training',
    traineeType: ALL_RESOURCES.CADET,
    graduateType: ALL_RESOURCES.UAV_PILOT,
    length: 30,
  },
};

export const ALL_FEATURE_TYPES = {
  TRAINING: 'Training',
  AIRPORT: 'Airport',
  AIR_DEFENSE: 'Air Defense',
};

export const ALL_FEATURES = {
  AIRPORT: {
    name: 'Airport',
    type: ALL_FEATURE_TYPES.AIRPORT,
    resupplyTasks: [], // array of unitIds currently undergoing resupply
    units: [],
  },
  ANTI_AIR_BATTERY: {
    name: 'Anti-air Battery',
    type: ALL_FEATURE_TYPES.AIR_DEFENSE,
  },
  AIR_FORCE_ACADEMY: {
    name: 'Air Force Academy',
    maxTraineeCount: 20,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.CADET_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  BASIC_TRAINING: {
    name: 'Basic Training',
    maxTraineeCount: 40,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.BASIC_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  INFANTRY_TRAINING_CENTER: {
    name: 'Infantry Combat Training Center',
    maxTraineeCount: 20,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.COMBAT_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  ARMOR_SCHOOL: {
    name: 'Armor School',
    maxTraineeCount: 5,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.ARMOR_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  SPECIAL_FORCES_TRAINING_CENTER: {
    name: 'Special Forces Training Center',
    maxTraineeCount: 5,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.SPECIAL_FORCES_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  UAV_FLIGHT_SCHOOL: {
    name: 'UAV Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.UAV_PILOT_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  HEAVY_TRANSPORT_FLIGHT_SCHOOL: {
    name: 'Heavy Transport Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.HEAVY_TRANSPORT_PILOT_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
  FIGHTER_JET_FLIGHT_SCHOOL: {
    name: 'Fighter Jet Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: ALL_TRAINING_PATHS.FIGHTER_PILOT_TRAINING,
    type: ALL_FEATURE_TYPES.TRAINING,
  },
};

export const ALL_LOCATION_TYPES = {
  BASE: {
    name: 'Base',
    size: 1,
    speed: 4,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  CITY: {
    name: 'City',
    size: 4,
    speed: 4,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  VILLAGE: {
    name: 'Village',
    size: 1,
    speed: 2,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  DIRT_ROAD: {
    name: 'Dirt road',
    size: 1,
    speed: 2,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  PAVED_ROAD: {
    name: 'Paved road',
    size: 1,
    speed: 4,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  DESERT: {
    name: 'Desert',
    size: 5,
    speed: 1,
    unallowedUnitTypes: [ALL_UNIT_TYPES.SEA],
  },
  OCEAN: {
    name: 'Ocean',
    size: 5,
    speed: 1,
    unallowedUnitTypes: [ALL_UNIT_TYPES.GROUND],
  },
};

// increment total budget by
export const BUDGET_INCREMENT_AMOUNT = 100000;

// increment a role's budget by
export const ROLE_BUDGET_INCREMENT_AMOUNT = 10000;
