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
      skills: {
        attack: 1,
        defense: 0,
      },
      size: 1,
      name: 'Squad',
    },
    TANK: {
      skills: {
        attack: 5,
        defense: 5,
      },
      size: 2,
      name: 'Tank',
    },
  },
});

export const defaultLocations = ({
  HOME: 'Home Base',
  FOB: 'FOB',
});

export const budgetIncrementAmount = 10000;