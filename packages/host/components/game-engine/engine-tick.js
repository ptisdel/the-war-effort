import _ from 'lodash';
import common from '@the-war-effort/common';

const { models } = common;

const {
  GameState,
  Resource,
  Location,
  TravelGroup,
} = models;

const checkLocationsForCombat = ({ globalActions, gameState }) => {
  _.forEach(GameState.getLocations(gameState), location => {
    const combatants = _.filter(
      Location.getResources(location),
      r => Resource.getIsCombatant(r) === true,
    );

    const combatantsGroupedByFaction = _.groupBy(combatants, r => Resource.getFaction(r));
    if (_.keys(combatantsGroupedByFaction).length < 2) return;

    console.log('Going into battle and here is the lineup:');
    console.log(combatantsGroupedByFaction);

    globalActions.battle({ gameState, location, combatantsGroupedByFaction });
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
  checkLocationsForCombat({ globalActions, gameState });
};
