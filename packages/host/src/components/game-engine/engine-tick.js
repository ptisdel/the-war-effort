import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { TrainingGroup } from '@the-war-effort/common/models';

const { constants, helpers, models } = common;

const { allFactions, ENGINE_TOGGLES } = constants;
const { log } = helpers;

const {
  GameState,
  Location,
  TravelGroup,
  Unit,
  UnitGroup,
} = models;


const checkUnitGroupsForMovement = ({ globalActions, gameState }) => {
  _.forEach(GameState.getUnitGroups(gameState), ug => {
    if (UnitGroup.getRoute(ug)) {
      globalActions.moveUnitGroup({ gameState, unitGroup: ug });
    }
  });
};

const checkLocationsForCombat = ({ globalActions, gameState }) => {
  _.forEach(GameState.getLocations(gameState), location => {
    const combatants = _.filter(
      Location.getUnits(location),
      u => Unit.getFaction(u) === allFactions.PLAYERS || Unit.getFaction(u) === allFactions.ENEMY,
    );

    const combatantsGroupedByFaction = _.groupBy(combatants, u => Unit.getFaction(u));
    if (_.keys(combatantsGroupedByFaction).length < 2) return;

    log('battle', 'Going into battle and here is the lineup:');
    log('battle', combatantsGroupedByFaction);

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

const checkTrainingGroups = ({ globalActions, gameState }) => {
  const trainingGroups = GameState.getTrainingGroups(gameState);
  const now = new Date();

  _.forEach(trainingGroups, tg => {
    if (TrainingGroup.getEnd(tg) < now) {
      globalActions.trainingGroupGraduation({ gameState, trainingGroup: tg });
    }
  });
};

export const engineTick = ({ globalActions, gameState }) => {
  log('gameEngine', 'tick');
  if (ENGINE_TOGGLES.training) checkTrainingGroups({ globalActions, gameState });
  if (ENGINE_TOGGLES.travel) checkTravelGroups({ globalActions, gameState });
  if (ENGINE_TOGGLES.battle) checkLocationsForCombat({ globalActions, gameState });
  if (ENGINE_TOGGLES.movement) checkUnitGroupsForMovement({ globalActions, gameState });
};
