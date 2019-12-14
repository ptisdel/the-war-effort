export const allFactions = ({
  PLAYERS: 'Player',
  ENEMY: 'Enemy',
});

export const allRoles = ({
  AIRSUPPORT: 'Air Support Officer',
  AUDIENCE: 'Audience Member',
  COMMANDER: 'Commander',
  LOGISTICS: 'Logistics Officer',
  PUBLICAFFAIRS: 'Public Affairs Officer',
});

export const allFeatures = ({
  AIRPORT: 'Airport',
  ANTIAIR: 'Anti-air defenses',
});

export const allResourceTypes = ({
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

export const defaultLocations = ({
  HOME: 'Home Base',
  FOB: 'FOB',
});

export const budgetIncrementAmount = 10000;
