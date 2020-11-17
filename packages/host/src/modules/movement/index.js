import _ from 'lodash-es';
import common from '@the-war-effort/common';
import * as actions from './actions';

const { GameState, UnitGroup } = common.models;

export function tick({ gameActions, gameState }) {
  _.forEach(GameState.getUnitGroups(gameState), ug => {
    if (UnitGroup.getRoute(ug)) {
      gameActions.triggerMechanic(actions.move, { gameState, unitGroup: ug });
    }
  });
}
