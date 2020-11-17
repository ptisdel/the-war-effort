import React from 'react';
import common from '@the-war-effort/common';
import components from '../components';
import views from '../views';
import { useApp } from './logic';

const { ALL_ROLES } = common.constants;
const { Layout } = components;

export const App = () => {
  const { role } = useApp();

  const getViewFromRole = () => {
    if (role === ALL_ROLES.AIR_SUPPORT) return <views.AirSupportView/>;
    if (role === ALL_ROLES.COMMANDER) return <views.CommanderView/>;
    if (role === ALL_ROLES.GROUND_FORCES) return <views.GroundForcesView/>;
    if (role === ALL_ROLES.INTELLIGENCE) return <views.IntelligenceView/>;
    if (role === ALL_ROLES.LOGISTICS) return <views.LogisticsView/>;
    if (role === ALL_ROLES.PROCUREMENT) return <views.ProcurementView/>;
    if (role === ALL_ROLES.PUBLIC_AFFAIRS) return <views.PublicAffairsView/>;
    if (role === ALL_ROLES.TRAINING) return <views.TrainingView/>;
    return <views.AudienceView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
};
