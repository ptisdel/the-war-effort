import _ from 'lodash';
import { models } from '../../../common';

const { GameState, TravelGroup } = models;

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
};
