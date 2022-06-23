import React from 'react';
import common from '@the-war-effort/common';
import { sendMessage } from '@/api';
import components from '@/components';
import { useStore } from '@/store';
import views from '@/views';

const { ALL_ROLES } = common.constants;
const { Layout, RoleHeader } = components;

const roleViews = {
  [ALL_ROLES.AIR_SUPPORT]: <views.AirSupportView/>,
  [ALL_ROLES.COMMANDER]: <views.CommanderView/>,
  [ALL_ROLES.GROUND_FORCES]: <views.GroundForcesView/>,
  [ALL_ROLES.INTELLIGENCE]: <views.IntelligenceView/>,
  [ALL_ROLES.LOGISTICS]: <views.LogisticsView/>,
  [ALL_ROLES.PROCUREMENT]: <views.ProcurementView/>,
  [ALL_ROLES.PUBLIC_AFFAIRS]: <views.PublicAffairsView/>,
  [ALL_ROLES.TRAINING]: <views.TrainingView/>,
  [ALL_ROLES.AUDIENCE]: <views.AudienceView/>,
};

export const App = () => {
  const { playerRole } = useStore();

  const isAudienceMember = playerRole === ALL_ROLES.AUDIENCE;

  const handleResign = () => sendMessage('player-resigned');
  const handleLeaveRoom = () => sendMessage('left-room');

  if (!playerRole) {
    return (
    <Layout>
      <views.JoinRoomView/>
    </Layout>
    );
  }

  return (
    <Layout>
      {
        isAudienceMember
          ? <RoleHeader title = { 'Please select your role' } onResign={ handleLeaveRoom } />
          : <RoleHeader title = { playerRole } onResign={ handleResign } />
      }
      { roleViews?.[playerRole] }
    </Layout>
  );
};
