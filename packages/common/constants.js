export const LOGGING = {
  airSupport: true,
  battle: false,
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

export const allFactions = {
  PLAYERS: 'Player',
  ENEMY: 'Enemy',
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
    name: 'Recruit',
    pluralName: 'Recruits',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  PRIVATE: {
    name: 'Private',
    pluralName: 'Privates',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  RIFLEMAN: {
    name: 'Rifleman',
    pluralName: 'Riflemen',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  ARMOR_CREWMAN: {
    name: 'Armor Crewman',
    pluralName: 'Armor Crewmen',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  SPECIAL_OPERATOR: {
    name: 'Special Operator',
    pluralName: 'Special Operators',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  CADET: {
    name: 'Cadet',
    pluralName: 'Cadets',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  FIGHTER_PILOT: {
    name: 'Fighter Pilot',
    pluralName: 'Fighter Pilots',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  HEAVY_TRANSPORT_PILOT: {
    name: 'Heavy Transport Pilot',
    pluralName: 'Heavy Transport Pilots',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  HELICOPTER_PILOT: {
    name: 'Helicopter Pilot',
    pluralName: 'Helicopter Pilots',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  UAV_PILOT: {
    name: 'UAV Pilot',
    pluralName: 'UAV Pilots',
    type: allResourceTypes.HUMAN_RESOURCE,
  },
  F16: {
    cost: 100,
    name: 'F-16',
    pluralName: 'F-16s',
    type: allResourceTypes.AIRCRAFT,
    stats: {
      accuracy: 5,
      attack: 10,
      defense: 6,
    },
  },
  MRES: {
    name: 'MRE',
    pluralName: 'MREs',
    type: allResourceTypes.FOOD,
    stats: {
      nutrition: 5,
    },
  },
};

export const allUnitTypes = {
  MILITARY: 'Military',
  CIVILIAN: 'Civilian',
};

export const allUnits = {
  SQUAD: {
    type: allUnitTypes.MILITARY,
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
    type: allUnitTypes.MILITARY,
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
    fuel: 5,
    maxFuel: 15,
    ammo: 50,
    maxAmmo: 100,
    type: allUnitTypes.MILITARY,
    name: 'Helicopter',
    number: 1,
    size: 3,
    stats: {
      accuracy: 0.9,
      attack: 10,
      defense: 5,
    },
  },
};

export const allHeavyTransports = {
  C17: {
    name: 'C-17 Globemaster III',
    capacity: 6,
    cargo: [],
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

export const defaultLocations = {
  HOME: {
    id: '0',
    name: 'Home Base',
  },
  FOB: {
    id: '1',
    name: 'Forward Operating Base',
  },
  NEW_LOCATION: {
    name: 'New Location',
  },
};

export const budgetIncrementAmount = 100000;
export const roleBudgetIncrementAmount = 10000;
