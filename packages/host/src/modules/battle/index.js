import _ from 'lodash-es';
import common from '@the-war-effort/common';
import * as actions from './actions';

const { ALL_FACTIONS } = common.constants;
const { log } = common.helpers;
const { GameState, Location, Unit } = common.models;

export function tick({ gameActions, gameState }) {
  const locations = GameState.getLocations(gameState);

  _.forEach(locations, l => {
    const combatants = _.filter(
      Location.getUnits(l),
      u => Unit.getFaction(u) === ALL_FACTIONS.PLAYERS || Unit.getFaction(u) === ALL_FACTIONS.ENEMY,
    );

    const combatantsGroupedByFaction = _.groupBy(combatants, u => Unit.getFaction(u));
    if (_.keys(combatantsGroupedByFaction).length < 2) return;

    log('battle', 'Going into battle and here is the lineup:');
    log('battle', combatantsGroupedByFaction);

    const fightParameters = { gameState, location: l, combatantsGroupedByFaction };
    gameActions.triggerMechanic(actions.fight, fightParameters);
  });
}
