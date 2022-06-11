import common from '@the-war-effort/common';
import * as battle from './battle';
import * as movement from './movement';
import * as training from './training';

const { ENGINE_TOGGLES } = common.featureFlags;

export const runModules = ({ gameActions, gameState }) => {
  // if (ENGINE_TOGGLES.battle) battle.tick({ gameActions, gameState });
  // if (ENGINE_TOGGLES.movement) movement.tick({ gameActions, gameState });
  // if (ENGINE_TOGGLES.training) training.tick({ gameActions, gameState });
};
