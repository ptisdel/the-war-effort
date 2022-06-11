import React, { useEffect } from 'react';
import common from '@the-war-effort/common';
import { sendMessage } from '@/api';
import components from '@/components';
import { useStore } from '@/hooks';
import views from '@/views';

const { ALL_ROLES } = common.constants;
const { log } = common.helpers;
const { Layout, RoleHeader } = components;

const viewsByRole = {
  [ALL_ROLES.AIR_SUPPORT]: <views.AirSupportView/>,
  [ALL_ROLES.COMMANDER]: <views.CommanderView/>,
  [ALL_ROLES.GROUND_FORCES]: <views.GroundForcesView/>,
  [ALL_ROLES.INTELLIGENCE]: <views.IntelligenceView/>,
  [ALL_ROLES.LOGISTICS]: <views.LogisticsView/>,
  [ALL_ROLES.PROCUREMENT]: <views.ProcurementView/>,
  [ALL_ROLES.PUBLIC_AFFAIRS]: <views.PublicAffairsView/>,
  [ALL_ROLES.TRAINING]: <views.TrainingView/>,
};

export const App = () => {
  const { gameState, playerId, playerRole } = useStore();

  const handleResign = playerId => sendMessage('player-resigned', playerId);

  useEffect(() => {
    log('gameStateChange', 'Game State:', gameState);
  }, [gameState]);

  return (
    <Layout>
      <RoleHeader title = { playerRole || 'Please select your role.' } onResign={() => handleResign(playerId)} />
      { viewsByRole?.[playerRole] || <views.AudienceView/> }
    </Layout>
  );
};
