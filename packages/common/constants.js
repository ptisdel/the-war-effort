export const LOGGING = {
  airSupport: true,
  army: true,
  battle: true,
  commander: true,
  gameEngine: false,
  gameStateChange: true,
  intelligence: true,
  logistics: true,
  procurement: true,
  publicAffairs: true,
};

export const ENGINE_TOGGLES = {
  battle: false,
  training: true,
  travel: true,
};

export const allArticleParts = {
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

export const allCallsigns = {
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

export const allFactions = {
  PLAYERS: 'Player',
  ENEMY: 'Enemy',
  NGO: 'NGO',
  CIVILIAN: 'Civilian',
};

export const allRoles = {
  AIR_SUPPORT: 'Air Support Officer',
  AUDIENCE: 'Audience Member',
  COMMANDER: 'Commander',
  INTELLIGENCE: 'Intelligence Officer',
  LOGISTICS: 'Logistics Officer',
  PROCUREMENT: 'Procurement Officer',
  PUBLIC_AFFAIRS: 'Public Affairs Officer',
  TRAINING: 'Training Officer',
};

export const allResourceTypes = {
  AIRCRAFT: 'Aircraft',
  AMMUNITION: 'Ammunition',
  FOOD: 'Food',
  GROUND_VEHICLE: 'Ground Vehicle',
  HUMAN_RESOURCE: 'Human Resource',
};

export const allResources = {
  RECRUIT: {
    amount: 1,
    name: {
      plural: 'Recruits',
      singular: 'Recruit',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  PRIVATE: {
    amount: 1,
    name: {
      plural: 'Privates',
      singular: 'Private',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  RIFLEMAN: {
    amount: 1,
    name: {
      plural: 'Riflemen',
      singular: 'Rifleman',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  ARMOR_CREWMAN: {
    amount: 1,
    name: {
      plural: 'Armor Crewmen',
      singular: 'Armor Crewman',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  SPECIAL_OPERATOR: {
    amount: 1,
    name: {
      plural: 'Special Operators',
      singular: 'Special Operator',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  CADET: {
    amount: 1,
    name: {
      plural: 'Cadets',
      singular: 'Cadet',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  FIGHTER_PILOT: {
    amount: 1,
    name: {
      plural: 'Fighter Pilots',
      singular: 'Fighter Pilot',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  HEAVY_TRANSPORT_PILOT: {
    amount: 1,
    name: {
      plural: 'Heavy Transport Pilots',
      singular: 'Heavy Transport Pilot',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  HELICOPTER_PILOT: {
    amount: 1,
    name: {
      plural: 'Helicopter Pilots',
      singular: 'Helicopter Pilot',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  UAV_PILOT: {
    amount: 1,
    name: {
      plural: 'UAV Pilots',
      singular: 'UAV Pilot',
    },
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  F16: {
    amount: 1,
    cost: 100,
    name: {
      plural: 'F-16s',
      singular: 'F-16',
    },
    type: allResourceTypes.AIRCRAFT,
    stats: {
      accuracy: 5,
      attack: 10,
      defense: 6,
    },
  },
  MRES: {
    amount: 1,
    name: {
      plural: 'MREs',
      singular: 'MRE',
    },
    type: allResourceTypes.FOOD,
    stats: {
      nutrition: 5,
    },
  },
};

export const allUnitTypes = {
  GROUND: 'Ground',
  AIR: 'Air',
  SEA: 'Sea',
};

export const allUnits = {
  SQUAD: {
    type: allUnitTypes.GROUND,
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
    type: allUnitTypes.GROUND,
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
    crewType: allResourceTypes.HELICOPTER_PILOT,
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
    type: allUnitTypes.AIR,
  },
  C17: {
    ammo: 0,
    capacity: 6,
    cargo: [],
    crew: 2,
    crewType: allResourceTypes.HEAVY_TRANSPORT_PILOT,
    fuel: 15,
    maxAmmo: 0,
    maxFuel: 15,
    name: 'C-17 Globemaster III',
    size: 8,
    type: allUnitTypes.AIR,
  },
};

export const allTrainingPaths = {
  BASIC_TRAINING: {
    name: 'Basic Training',
    traineeType: allResources.RECRUIT,
    graduateType: allResources.PRIVATE,
    length: 10,
  },
  COMBAT_TRAINING: {
    name: 'Combat Training',
    traineeType: allResources.PRIVATE,
    graduateType: allResources.RIFLEMAN,
    length: 10,
  },
  ARMOR_TRAINING: {
    name: 'Armor Training',
    traineeType: allResources.PRIVATE,
    graduateType: allResources.ARMOR_CREWMAN,
    length: 20,
  },
  SPECIAL_FORCES_TRAINING: {
    name: 'Special Forces Training',
    traineeType: allResources.RIFLEMAN,
    graduateType: allResources.SPECIAL_OPERATOR,
    length: 30,
  },
  CADET_TRAINING: {
    name: 'Air Force Academy',
    traineeType: allResources.RECRUIT,
    graduateType: allResources.CADET,
    length: 10,
  },
  FIGHTER_PILOT_TRAINING: {
    name: 'Fighter Pilot Training',
    traineeType: allResources.CADET,
    graduateType: allResources.FIGHTER_PILOT,
    length: 30,
  },
  HEAVY_TRANSPORT_PILOT_TRAINING: {
    name: 'Heavy Transport Pilot Training',
    traineeType: allResources.CADET,
    graduateType: allResources.HEAVY_TRANSPORT_PILOT,
    length: 30,
  },
  HELICOPTER_PILOT_TRAINING: {
    name: 'Helicopter Pilot Training',
    traineeType: allResources.CADET,
    graduateType: allResources.HELICOPTER_PILOT,
    length: 30,
  },
  UAV_PILOT_TRAINING: {
    name: 'UAV Pilot Training',
    traineeType: allResources.CADET,
    graduateType: allResources.UAV_PILOT,
    length: 30,
  },
};

export const allFeatureTypes = {
  TRAINING: 'Training',
  AIRPORT: 'Airport',
  AIR_DEFENSE: 'Air Defense',
};

export const allFeatures = {
  AIRPORT: {
    name: 'Airport',
    type: allFeatureTypes.AIRPORT,
    resupplyTasks: [], // array of unitIds currently undergoing resupply
    units: [],
  },
  ANTI_AIR_BATTERY: {
    name: 'Anti-air Battery',
    type: allFeatureTypes.AIR_DEFENSE,
  },
  AIR_FORCE_ACADEMY: {
    name: 'Air Force Academy',
    maxTraineeCount: 20,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.CADET_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  BASIC_TRAINING: {
    name: 'Basic Training',
    maxTraineeCount: 40,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.BASIC_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  INFANTRY_TRAINING_CENTER: {
    name: 'Infantry Combat Training Center',
    maxTraineeCount: 20,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.COMBAT_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  ARMOR_SCHOOL: {
    name: 'Armor School',
    maxTraineeCount: 5,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.ARMOR_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  SPECIAL_FORCES_TRAINING_CENTER: {
    name: 'Special Forces Training Center',
    maxTraineeCount: 5,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.SPECIAL_FORCES_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  UAV_FLIGHT_SCHOOL: {
    name: 'UAV Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.UAV_PILOT_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  HEAVY_TRANSPORT_FLIGHT_SCHOOL: {
    name: 'Heavy Transport Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.HEAVY_TRANSPORT_PILOT_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
  FIGHTER_JET_FLIGHT_SCHOOL: {
    name: 'Fighter Jet Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
    trainingOffered: allTrainingPaths.FIGHTER_PILOT_TRAINING,
    type: allFeatureTypes.TRAINING,
  },
};

export const allLocationTypes = {
  BASE: {
    name: 'Base',
    size: 1,
    speed: 4,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  CITY: {
    name: 'City',
    size: 4,
    speed: 4,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  VILLAGE: {
    name: 'Village',
    size: 1,
    speed: 2,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  DIRT_ROAD: {
    name: 'Dirt road',
    size: 1,
    speed: 2,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  PAVED_ROAD: {
    name: 'Paved road',
    size: 1,
    speed: 4,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  DESERT: {
    name: 'Desert',
    size: 5,
    speed: 1,
    unallowedUnitTypes: [allUnitTypes.SEA],
  },
  OCEAN: {
    name: 'Ocean',
    size: 5,
    speed: 1,
    unallowedUnitTypes: [allUnitTypes.GROUND],
  },
};

export const defaultLocations = {
  HOME: {
    adjacentLocationIds: [],
    callsign: allCallsigns.ALPHA,
    features: [],
    id: '0',
    name: 'Home Base',
    position: {
      lat: 52.4044764,
      lng: 0.5590789,
    },
    resources: [],
    type: allLocationTypes.BASE,
    units: [],
  },
  FOB: {
    adjacentLocationIds: [],
    callsign: allCallsigns.BRAVO,
    features: [],
    id: '1',
    name: 'Forward Operating Base',
    position: {
      lat: 31.6349554,
      lng: 65.7151501,
    },
    resources: [],
    type: allLocationTypes.BASE,
    units: [],
  },
  NEW_LOCATION_TEMPLATE: {
    adjacentLocationIds: [],
    callSign: allCallsigns.XRAY,
    features: [],
    name: 'New Location Template',
    position: null,
    resources: [],
    type: allLocationTypes.BASE,
    units: [],
  },
};

export const budgetIncrementAmount = 100000;
export const roleBudgetIncrementAmount = 10000;
