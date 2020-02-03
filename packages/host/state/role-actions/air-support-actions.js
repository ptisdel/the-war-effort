import _ from 'lodash';
import common from '@the-war-effort/common';

const { helpers, models } = common;
const { log } = helpers;
const { GameState } = models;

export const resupplyAircraft = (store, unitId) => {
  const { gameState } = store.state;

  const resupplyTaskAlreadyExists = Boolean(GameState.getResupplyTaskByUnitId(
    gameState,
    unitId,
  ));

  if (resupplyTaskAlreadyExists) return;

  const newResupplyTask = ({
    unitId,
  });

  const resupplyTasks = GameState.getResupplyTasks(gameState);
  const newGameState = {
    ...gameState,
    resupplyTasks: [
      ...resupplyTasks,
      newResupplyTask,
    ],
  };
  log('airSupport', `Starting resupply mission for unit ${unitId}.`);

  store.setState({ gameState: newGameState });
};
