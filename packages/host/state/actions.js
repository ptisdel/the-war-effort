import _ from 'lodash';
import common from '@the-war-effort/common';
import roleActions from './role-actions';

const { models } = common;

const {
  GameState,
  Location,
  Resource,
  Role,
  Transport,
  TravelGroup,
} = models;

export const roleAction = (store, { type, payload }) => {
  const { commanderActions, logisticsActions } = roleActions;
  if (type === 'commander/increaseRoleBudget') commanderActions.increaseRoleBudget(store, payload);
  if (type === 'commander/decreaseRoleBudget') commanderActions.decreaseRoleBudget(store, payload);
  if (type === 'logistics/createTravelGroup') logisticsActions.createTravelGroup(store, payload);
};

export const addPlayer = (store, playerId) => {
  const { gameState } = store.state;
  const { players } = gameState;

  const playerAlreadyExists = playerId && _.includes(players, playerId);
  if (!playerId || playerAlreadyExists) return;

  const newPlayers = [
    ...gameState.players,
    playerId,
  ];

  const newGameState = {
    ...gameState,
    players: newPlayers,
  };

  store.setState({ gameState: newGameState });
};

export const deletePlayer = (store, playerId) => {
  const { gameState } = store.state;
  const { roles } = gameState;

  const newPlayers = _.without(gameState.players, playerId);
  const newRoles = _.filter(roles, r => Role.getPlayer(r) === playerId);

  const newGameState = {
    ...gameState,
    players: newPlayers,
    roles: newRoles,
  };

  store.setState({ gameState: newGameState });
};

export const hireRole = (store, { playerId, roleName }) => {
  const { gameState } = store.state;
  const { players, roles } = gameState;

  if (!roleName) return;

  // if role is already occupied, player cannot be hired for that role
  const roleAlreadyOccupied = _.some(roles, r => Role.getName(r) === roleName);
  if (roleAlreadyOccupied) return;

  const newRoles = [
    // if player occupies other role, remove him from previous role
    ..._.filter(roles, r => Role.getPlayer(r) !== playerId),
    {
      name: roleName,
      player: playerId,
      budget: 0,
    },
  ];

  const playerExists = _.some(players, p => p === playerId);
  const newPlayers = [
    ...(playerExists ? players : [...players, playerId]),
  ];

  const newGameState = {
    ...gameState,
    roles: newRoles,
    players: newPlayers,
  };

  store.setState({ gameState: newGameState });
};

export const removePlayerFromRole = (store, roleName) => {
  const { gameState } = store.state;
  const { roles } = gameState;

  const newGameState = {
    ...gameState,
    roles: _.filter(roles, r => Role.getName(r) === roleName),
  };

  store.setState({ gameState: newGameState });
};

export const battle = (store, { gameState, location, combatantsGroupedByFaction }) => {
  console.log(`A battle rages in ${Location.getName(location)}!`);
  console.log(combatantsGroupedByFaction);

  const getCombatantsDefendingAgainst = attackingFactionName => _.reduce(
    combatantsGroupedByFaction,
    (acc, combatantGroup, cgFactionName) => (
      (cgFactionName !== attackingFactionName) ? [...acc, ...combatantGroup] : acc
    ),
    [],
  );

  const getCasualtiesFromSingleFactionAttack = (attackers, defenders) => _.reduce(
    attackers,
    (acc, attacker) => {
      const attackStrength = Resource.getStatByName(attacker, 'attack');
      const doesAttackLand = _.random(0, 1, true) <= Resource.getStatByName(attacker, 'accuracy');
      const attackDamage = doesAttackLand ? attackStrength : 0;

      // if (!attackDamage) return acc;

      const unluckyDefender = _.get(defenders, _.random(0, defenders.length - 1));
      const unluckyDefenderId = Resource.getId(unluckyDefender);
      const previousDamage = _.get(acc, unluckyDefenderId) || 0;
      const newDamage = previousDamage + attackDamage;
      console.log(
        Resource.getFaction(attacker),
        Resource.getName(attacker),
        `(${Resource.getId(attacker)})`,
        'attacks',
        Resource.getFaction(unluckyDefender),
        Resource.getName(unluckyDefender),
        `(${unluckyDefenderId})`,
        `and ${doesAttackLand ? `hits for ${attackDamage} damage!` : 'misses!'}`,
      );

      if (!attackDamage) return acc;
      return { ...acc, [unluckyDefenderId]: newDamage };
    },
    {},
  );

  const getCasualtiesFromAllFactionAttacks = () => _.reduce(
    combatantsGroupedByFaction,
    (acc, attackers, factionName) => {
      const defenders = getCombatantsDefendingAgainst(factionName);
      const newCasualties = getCasualtiesFromSingleFactionAttack(attackers, defenders);

      return _.mergeWith(
        {},
        acc,
        newCasualties,
        (prevDamage, newDamage) => _.add(prevDamage, newDamage),
      );
    },
    {},
  );

  const damageByCombatant = getCasualtiesFromAllFactionAttacks();

  console.log('Here come the casualty reports.');

  const newLocationResources = _.reduce(
    Location.getResources(location),
    (acc, r) => {
      const resourceId = Resource.getId(r);

      if (!_.has(damageByCombatant, resourceId)) return [...acc, r];

      const defense = Resource.getStatByName(r, 'defense');
      const previousUnits = Resource.getUnits(r);
      const damage = _.get(damageByCombatant, resourceId);
      const newUnits = previousUnits - _.floor(damage / defense);
      const wasKilled = newUnits < 1;

      console.log(
        Resource.getFaction(r),
        Resource.getName(r),
        `(${Resource.getId(r)})`,
        'took',
        damage,
        'damage, and their units drop from',
        previousUnits,
        'to',
        `${newUnits}.`,
      );

      if (wasKilled) {
        console.log(
          Resource.getFaction(r),
          Resource.getName(r),
          `(${Resource.getId(r)})`,
          'has been eliminated!',
        );
        return acc;
      }

      const newResource = ({
        ...r,
        units: newUnits,
      });

      return [
        ...acc,
        newResource,
      ];
    },
    [],
  );

  const newLocation = {
    ...location,
    resources: newLocationResources,
  };

  const newGameState = {
    ...gameState,
    locations: [
      ..._.filter(gameState.locations, gl => Location.getName(gl) !== Location.getName(location)),
      newLocation,
    ],
  };

  store.setState({ gameState: newGameState });
};

export const travelGroupArrival = (store, { gameState, travelGroup }) => {
  const destinationName = TravelGroup.getDestinationName(travelGroup);
  const destination = GameState.getLocationByName(gameState, destinationName);
  const transports = TravelGroup.getTransports(travelGroup);

  const allSentResources = _.reduce(
    transports,
    (acc, transport) => [...acc, ...Transport.getCargo(transport)],
    [],
  );

  const destinationResources = Location.getResources(destination);
  const newDestinationResources = [
    ...destinationResources,
    ...allSentResources,
  ];

  const allSentHeavyTransports = _.map(transports, t => ({
    ...t,
    cargo: [],
  }));

  const destinationHeavyTransports = Location.getHeavyTransports(destination);
  const newDestinationHeavyTransports = [
    ...destinationHeavyTransports,
    ...allSentHeavyTransports,
  ];

  const newDestination = {
    ...destination,
    heavyTransports: newDestinationHeavyTransports,
    resources: newDestinationResources,
  };

  const newTravelGroups = _.differenceWith(
    GameState.getTravelGroups(gameState),
    [travelGroup],
    _.isEqual,
  );

  const locations = GameState.getLocations(gameState);
  const newGameState = {
    ...gameState,
    travelGroups: newTravelGroups,
    locations: [
      ..._.differenceWith(locations, [destination], _.isEqual),
      newDestination,
    ],
  };

  store.setState({ gameState: newGameState });
};
