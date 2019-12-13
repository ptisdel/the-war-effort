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
        attack: 1,
        defense: 0,
      },
    },
    TANK: {
      isCombatant: true,
      name: 'Tank',
      units: 1,
      size: 2,
      stats: {
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