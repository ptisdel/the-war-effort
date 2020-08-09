import _ from 'lodash-es';
import common from '@the-war-effort/common';
import roleActions from './role-actions';
import * as hostHelpers from '../helpers';

const { constants, helpers, models } = common;
const { create } = hostHelpers;

const {
  allFactions,
  defaultLocations,
} = constants;
const { log } = helpers;
const {
  GameState,
  Location,
  Role,
  TrainingGroup,
  Transport,
  TravelGroup,
  Unit,
  UnitGroup,
} = models;

export const roleAction = (store, { type, payload }) => {
  const {
    airSupportActions,
    commanderActions,
    groundForcesActions,
    logisticsActions,
    procurementActions,
    publicAffairsActions,
    trainingActions,
  } = roleActions;
  if (type === 'commander/decreaseRoleBudget') commanderActions.decreaseRoleBudget(store, payload);
  if (type === 'commander/increaseRoleBudget') commanderActions.increaseRoleBudget(store, payload);
  if (type === 'commander/fireRole') commanderActions.fireRole(store, payload);
  if (type === 'commander/requestBudgetIncrease') commanderActions.requestBudgetIncrease(store);
  if (type === 'logistics/createTravelGroup') logisticsActions.createTravelGroup(store, payload);
  if (type === 'training/createTrainingGroup') trainingActions.createTrainingGroup(store, payload);
  if (type === 'groundForces/moveUnitGroups') groundForcesActions.moveUnitGroups(store, payload);
  if (type === 'airSupport/resupplyAircraft') airSupportActions.resupplyAircraft(store, payload);
  if (type === 'procurement/startResearchingPrototype') procurementActions.startResearchingPrototype(store, payload);
  if (type === 'publicAffairs/censorArticle') publicAffairsActions.censorArticle(store, payload);
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
  log('gameStateChange', 'Player removed from role', roleName);

  const newGameState = {
    ...gameState,
    roles: _.reject(roles, r => Role.getName(r) === roleName),
  };

  store.setState({ gameState: newGameState });
};

export const battle = (store, { gameState, location, combatantsGroupedByFaction }) => {
  log('battle', `A battle rages in ${Location.getName(location)}!`);
  log('battle', combatantsGroupedByFaction);

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
      const attackStrength = Unit.getStatByName(attacker, 'attack');
      const doesAttackLand = _.random(0, 1, true) <= Unit.getStatByName(attacker, 'accuracy');
      const attackDamage = doesAttackLand ? attackStrength : 0;

      // if (!attackDamage) return acc;

      const unluckyDefender = _.get(defenders, _.random(0, defenders.length - 1));
      const unluckyDefenderId = Unit.getId(unluckyDefender);
      const previousDamage = _.get(acc, unluckyDefenderId) || 0;
      const newDamage = previousDamage + attackDamage;
      log(
        'battle',
        Unit.getFaction(attacker),
        Unit.getName(attacker),
        `(${Unit.getId(attacker)})`,
        'attacks',
        Unit.getFaction(unluckyDefender),
        Unit.getName(unluckyDefender),
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

  log('battle', 'Here come the casualty reports.');

  const newLocationUnits = _.reduce(
    Location.getUnits(location),
    (acc, u) => {
      const unitId = Unit.getId(u);

      if (!_.has(damageByCombatant, unitId)) return [...acc, u];

      const defense = Unit.getStatByName(u, 'defense');
      const previousNumber = Unit.getNumber(u);
      const damage = _.get(damageByCombatant, unitId);
      const newNumber = previousNumber - _.floor(damage / defense);
      const wasKilled = newNumber < 1;

      log(
        'battle',
        Unit.getFaction(u),
        Unit.getName(u),
        `(${Unit.getId(u)})`,
        'took',
        damage,
        'damage, and their unit count drops from',
        previousNumber,
        'to',
        `${newNumber}.`,
      );

      if (wasKilled) {
        log(
          'battle',
          Unit.getFaction(u),
          Unit.getName(u),
          `(${Unit.getId(u)})`,
          'has been eliminated!',
        );
        return acc;
      }

      const newUnit = ({
        ...u,
        number: newNumber,
      });

      return [
        ...acc,
        newUnit,
      ];
    },
    [],
  );

  const newLocation = {
    ...location,
    units: newLocationUnits,
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

export const moveUnitGroup = (store, { gameState, unitGroup }) => {
  const id = UnitGroup.getId(unitGroup);
  const route = UnitGroup.getRoute(unitGroup);
  const {
    currentGeometryIndex,
    destination,
    duration,
    geometry,
    origin,
    speed,
  } = route;

  // const destinationString = JSON.stringify(destination);
  // const originString = JSON.stringify(origin);

  // log('movement', `UnitGroup ${id} wants to move along its route from ${originString} to ${destinationString}.`);

  // check for fuel
  // log('movement', 'The group has enough fuel to move.');

  const nextGeometryIndex = _.min([currentGeometryIndex + speed, geometry.length - 1]);
  console.log(nextGeometryIndex);

  const nextPosition = {
    lat: _.get(geometry, `${nextGeometryIndex}[0]`),
    lng: _.get(geometry, `${nextGeometryIndex}[1]`),
  };
  const hasArrived = (geometry.length - 1) <= currentGeometryIndex;

  log('movement', `UnitGroup ${id} moves from ${JSON.stringify(geometry[currentGeometryIndex])} to ${JSON.stringify(geometry[nextGeometryIndex])}.`);

  const newRoute = hasArrived
    ? null
    : {
      ...route,
      currentGeometryIndex: nextGeometryIndex,
    };

  const newCurrentOrder = hasArrived ? null : 'moving';

  const newUnitGroup = {
    ...unitGroup,
    currentOrder: newCurrentOrder,
    position: nextPosition,
    currentGeometryIndex: nextGeometryIndex,
    route: newRoute,
  };

  const newUnitGroups = [
    ..._.reject(GameState.getUnitGroups(gameState), ug => UnitGroup.getId(ug) === id),
    newUnitGroup,
  ];

  const newGameState = {
    ...gameState,
    unitGroups: newUnitGroups,
  };

  store.setState({ gameState: newGameState });
};

export const travelGroupArrival = (store, { gameState, travelGroup }) => {
  const destinationId = TravelGroup.getDestinationId(travelGroup);
  const destination = GameState.getLocationById(gameState, destinationId);
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

  const allSentTransports = _.map(transports, t => ({
    ...t,
    cargo: [],
  }));

  const destinationUnits = Location.getUnits(destination);
  const newDestinationUnits = [
    ...destinationUnits,
    ...allSentTransports,
  ];

  const newDestination = {
    ...destination,
    units: newDestinationUnits,
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

export const trainingGroupGraduation = (store, { gameState, trainingGroup }) => {
  const trainingGroups = GameState.getTrainingGroups(gameState);
  const location = GameState.getLocationById(gameState, Location.getId(defaultLocations.HOME));

  const newLocation = {
    ...location,
    resources: [
      ...Location.getResources(location),
      ...create(TrainingGroup.getGraduateType(trainingGroup), {
        amount: TrainingGroup.getTraineeCount(trainingGroup),
        faction: allFactions.PLAYERS,
      }),
    ],
  };

  const locations = GameState.getLocations(gameState);
  const newGameState = {
    ...gameState,
    trainingGroups: _.without(trainingGroups, trainingGroup),
    locations: [
      ..._.differenceWith(locations, [location], _.isEqual),
      newLocation,
    ],
  };

  store.setState({ gameState: newGameState });
};
