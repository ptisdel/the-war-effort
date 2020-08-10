import React from 'react';
import common from '@the-war-effort/common';
import components from '../components';
import views from '../views';
import { useApp } from './logic';

const { allRoles } = common.constants;

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
    if (role === allRoles.AIR_SUPPORT) return <AirSupportView/>;
    if (role === allRoles.COMMANDER) return <CommanderView/>;
    if (role === allRoles.GROUND_FORCES) return <GroundForcesView/>;
    if (role === allRoles.INTELLIGENCE) return <IntelligenceView/>;
    if (role === allRoles.LOGISTICS) return <LogisticsView/>;
    if (role === allRoles.PROCUREMENT) return <ProcurementView/>;
    if (role === allRoles.PUBLIC_AFFAIRS) return <PublicAffairsView/>;
    if (role === allRoles.TRAINING) return <TrainingView/>;
    return <AudienceView/>;
  };

  return (
    <Layout>
      { getViewFromRole() }
    </Layout>
  );
};
