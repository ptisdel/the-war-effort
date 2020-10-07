import React from 'react';
import common from '@the-war-effort/common';
import components from '../components';
import views from '../views';
import { useApp } from './logic';

const { ALL_ROLES } = common.constants;

const {
  AirSupportView,
  AudienceView,
  CommanderView,
  GroundForcesView,
  IntelligenceView,
  LogisticsView,
  TrainingView,
  ProcurementView,
  PublicAffairsView,
} = views;

const { Layout } = components;

export const App = () => {
  const { role } = useApp();

  console.log(role);

  const getViewFromRole = () => {
    if (role === ALL_ROLES.AIR_SUPPORT) return <AirSupportView/>;
    if (role === ALL_ROLES.COMMANDER) return <CommanderView/>;
    if (role === ALL_ROLES.GROUND_FORCES) return <GroundForcesView/>;
    if (role === ALL_ROLES.INTELLIGENCE) return <IntelligenceView/>;
    if (role === ALL_ROLES.LOGISTICS) return <LogisticsView/>;
    if (role === ALL_ROLES.PROCUREMENT) return <ProcurementView/>;
    if (role === ALL_ROLES.PUBLIC_AFFAIRS) return <PublicAffairsView/>;
    if (role === ALL_ROLES.TRAINING) return <TrainingView/>;
    return <AudienceView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
};
