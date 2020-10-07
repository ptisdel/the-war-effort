import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { TrainingGroup } from '@the-war-effort/common/models';

const { constants, helpers, models } = common;

const { ALL_FACTIONS, ENGINE_TOGGLES } = constants;
const { log } = helpers;

const {
  GameState,
  Location,
  Unit,
  UnitGroup,
} = models;

export const engineTick = ({ globalActions, gameState }) => {
  log('gameEngine', 'tick');
  if (ENGINE_TOGGLES.training) trainUnits({ globalActions, gameState });
  if (ENGINE_TOGGLES.battle) battle({ globalActions, gameState });
  if (ENGINE_TOGGLES.movement) moveUnits({ globalActions, gameState });
};

function moveUnits({ globalActions, gameState }) {
  _.forEach(GameState.getUnitGroups(gameState), ug => {
    if (UnitGroup.getRoute(ug)) {
      globalActions.moveUnitGroup({ gameState, unitGroup: ug });
    }
  });
}

function battle({ globalActions, gameState }) {
  _.forEach(GameState.getLocations(gameState), location => {
    const combatants = _.filter(
      Location.getUnits(location),
      u => Unit.getFaction(u) === ALL_FACTIONS.PLAYERS || Unit.getFaction(u) === ALL_FACTIONS.ENEMY,
    );

    const combatantsGroupedByFaction = _.groupBy(combatants, u => Unit.getFaction(u));
    if (_.keys(combatantsGroupedByFaction).length < 2) return;

    log('battle', 'Going into battle and here is the lineup:');
    log('battle', combatantsGroupedByFaction);

    globalActions.battle({ gameState, location, combatantsGroupedByFaction });
  });
}

function trainUnits({ globalActions, gameState }) {
  const trainingGroups = GameState.getTrainingGroups(gameState);
  const now = new Date();

  _.forEach(trainingGroups, tg => {
    if (TrainingGroup.getEnd(tg) < now) {
      globalActions.trainingGroupGraduation({ gameState, trainingGroup: tg });
    }
  });
}
