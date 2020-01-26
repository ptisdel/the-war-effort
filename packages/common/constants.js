export const allFactions = ({
  PLAYERS: 'Player',
  ENEMY: 'Enemy',
});

export const allRoles = ({
  AIR_SUPPORT: 'Air Support Officer',
  AUDIENCE: 'Audience Member',
  COMMANDER: 'Commander',
  LOGISTICS: 'Logistics Officer',
  PUBLIC_AFFAIRS: 'Public Affairs Officer',
  TRAINING: 'Training Officer',
});

export const allFeatures = ({
  AIRPORT: {
    name: 'Airport',
  },
  ANTI_AIR_BATTERY: {
    name: 'Anti-air Battery',
  },
  AIR_FORCE_ACADEMY: {
    name: 'Air Force Academy',
    maxTraineeCount: 20,
    traineeCount: 0,
  },
  BASIC_TRAINING: {
    name: 'Basic Training',
    maxTraineeCount: 40,
    traineeCount: 0,
  },
  INFANTRY_COMBAT_TRAINING_CENTER: {
    name: 'Infantry Combat Training Center',
    maxTraineeCount: 20,
    traineeCount: 0,
  },
  ARMOR_SCHOOL: {
    name: 'Armor School',
    maxTraineeCount: 5,
    traineeCount: 0,
  },
  SPECIAL_FORCES_TRAINING_CENTER: {
    name: 'Special Forces Training Center',
    maxTraineeCount: 5,
    traineeCount: 0,
  },
  FLIGHT_SCHOOL: {
    name: 'Flight School',
    maxTraineeCount: 15,
    traineeCount: 0,
  },
});

export const allResourceTypes = ({
  HUMAN_RESOURCES: {
    HEAVY_TRANSPORT_PILOT: 'Heavy Transport Pilot',
    CADET: 'Air Force Cadet',
    ARMOR_CREWMAN: 'Armor Crewman',
    PRIVATE: 'Private',
    FIGHTER_PILOT: 'Fighter Pilot',
    HELICOPTER_PILOT: 'Helicopter Pilot',
    RECRUIT: 'Recruit',
    RIFLEMAN: 'Rifleman',
    SPECIAL_OPERATOR: 'Special Operator',
    UAV_PILOT: 'UAV Pilot',
  },
  COMBAT: {
    SQUAD: {
      isCombatant: true,
      name: 'Squad',
      units: 10,
      size: 1,
      stats: {
        accuracy: 0.8,
        attack: 2,
        defense: 1,
      },
    },
    TANK: {
      isCombatant: true,
      name: 'Tank',
      units: 1,
      size: 2,
      stats: {
        accuracy: 0.6,
        attack: 5,
        defense: 5,
      },
    },
  },
});

export const armyTrainingPaths = [
  {
    hostFeatureName: allFeatures.BASIC_TRAINING.name,
    name: 'Basic Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.RECRUIT,
    graduateType: allResourceTypes.HUMAN_RESOURCES.PRIVATE,
    length: 10,
  }, {
    hostFeatureName: allFeatures.INFANTRY_COMBAT_TRAINING_CENTER.name,
    name: 'Combat Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.PRIVATE,
    graduateType: allResourceTypes.HUMAN_RESOURCES.RIFLEMAN,
    length: 10,
  }, {
    hostFeatureName: allFeatures.ARMOR_SCHOOL.name,
    name: 'Armor Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.PRIVATE,
    graduateType: allResourceTypes.HUMAN_RESOURCES.ARMOR_CREWMAN,
    length: 20,
  }, {
    hostFeatureName: allFeatures.SPECIAL_FORCES_TRAINING_CENTER.name,
    name: 'Special Forces Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.RIFLEMAN,
    graduateType: allResourceTypes.HUMAN_RESOURCES.SPECIAL_OPERATOR,
    length: 30,
  },
];

export const airForceTrainingPaths = [
  {
    hostFeatureName: allFeatures.AIR_FORCE_ACADEMY.name,
    name: 'Air Force Academy',
    traineeType: allResourceTypes.HUMAN_RESOURCES.RECRUIT,
    graduateType: allResourceTypes.HUMAN_RESOURCES.CADET,
    length: 10,
  }, {
    hostFeatureName: allFeatures.FLIGHT_SCHOOL.name,
    name: 'Fighter Pilot Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.CADET,
    graduateType: allResourceTypes.HUMAN_RESOURCES.FIGHTER_PILOT,
    length: 30,
  }, {
    hostFeatureName: allFeatures.FLIGHT_SCHOOL.name,
    name: 'Heavy Transport Pilot Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.CADET,
    graduateType: allResourceTypes.HUMAN_RESOURCES.HEAVY_TRANSPORT_PILOT,
    length: 30,
  }, {
    hostFeatureName: allFeatures.FLIGHT_SCHOOL.name,
    name: 'Helicopter Pilot Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.CADET,
    graduateType: allResourceTypes.HUMAN_RESOURCES.HELICOPTER_PILOT,
    length: 30,
  }, {
    hostFeatureName: allFeatures.FLIGHT_SCHOOL.name,
    name: 'UAV Pilot Training',
    traineeType: allResourceTypes.HUMAN_RESOURCES.CADET,
    graduateType: allResourceTypes.HUMAN_RESOURCES.UAV_PILOT,
    length: 30,
  },
];

export const defaultLocations = ({
  HOME: 'Home Base',
  FOB: 'FOB',
});

export const budgetIncrementAmount = 10000;
