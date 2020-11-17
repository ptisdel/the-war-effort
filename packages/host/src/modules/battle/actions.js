import _ from 'lodash-es';
import common from '@the-war-effort/common';

const { log } = common.helpers;
const { Location, Unit } = common.models;

export const fight = (store, { gameState, location, combatantsGroupedByFaction }) => {
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

  store.setState(newGameState);
};
