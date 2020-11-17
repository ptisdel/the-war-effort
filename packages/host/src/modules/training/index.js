import _ from 'lodash-es';
import common from '@the-war-effort/common';
import * as actions from './actions';

const { GameState, TrainingGroup } = common.models;

export function tick({ gameActions, gameState }) {
  const trainingGroups = GameState.getTrainingGroups(gameState);
  const now = new Date();

  _.forEach(trainingGroups, tg => {
    // fire action if training ends before now
    if (TrainingGroup.getEnd(tg) > now) return;
    gameActions.triggerMechanic(actions.graduate, { gameState, trainingGroup: tg });
  });
}
