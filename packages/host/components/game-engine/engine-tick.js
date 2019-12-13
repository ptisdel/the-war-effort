import _ from 'lodash';
import common from '@the-war-effort/common';

const { models } = common;

const {
  GameState,
  Resource,
  Location,
  TravelGroup,
} = models;

const checkCombat = ({ globalActions, gameState }) => {
  _.forEach(GameState.getLocations(gameState), l => {
    const combatants = _.filter(Location.getResources(l), r => Resource.getIsCombatant(r) === true);
    if (combatants.length < 2) return;

    const combatantsGroupedByFaction = _.groupBy(combatants, r => Resource.getFaction(r));

    const getDefendingCombatants = attackingFactionName => _.reduce(
      combatantsGroupedByFaction,
      (acc, combatantGroup, cgFactionName) =>
      // if combatantGroup not the attacking faction, add to defenders
        ((cgFactionName === attackingFactionName) ? acc : [...acc, ...combatantGroup]),
      [],
    );

    const damageCombatant = (defender, unitsLost) => {
      const newUnits = Resource.getUnits(defender) - unitsLost;

      if (newUnits < 1) {
        // kill unit
      }

      // const newDefender = {
      //   ...defender,
      //   units: newUnits,
      // };
    };

    _.forEach(combatantsGroupedByFaction, (faction, factionName) => {
      // get defending combatants
      const defendingCombatants = getDefendingCombatants(factionName);

      _.forEach(faction, attacker => {
        const defender = _.get(defendingCombatants, _.random(0, defendingCombatants.length - 1));
        const incomingDamage = Resource.getStatByName(attacker, 'attack');
        console.log(factionName, Resource.getName(attacker), 'attacks', Resource.getName(defender), 'for', incomingDamage, 'damage.');
        const unitsLost = _.floor(incomingDamage / Resource.getStatByName(defender, 'defense'));
        damageCombatant(defender, unitsLost);
      });
    });
  });
};

const checkTravelGroups = ({ globalActions, gameState }) => {
  const travelGroups = GameState.getTravelGroups(gameState);
  const now = new Date();

  _.forEach(travelGroups, tg => {
    if (TravelGroup.getETA(tg) < now) {
      globalActions.travelGroupArrival({ gameState, travelGroup: tg });
    }
  });
};

export const engineTick = ({ globalActions, gameState }) => {
  checkTravelGroups({ globalActions, gameState });
  checkCombat({ globalActions, gameState });
};
