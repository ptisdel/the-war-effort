import React from 'react';
import common from '@the-war-effort/common';
import shared from '../../components';
import { OverviewPage } from './pages';
import { useAirSupport } from './logic';

const { allRoles } = common.constants;
const { RoleHeader, Swiper } = shared;

const AirSupport = () => {
  const { onResign } = useAirSupport();

  return (
    <React.Fragment>
      <RoleHeader title = { allRoles.AIR_SUPPORT } onResign = { onResign }/>
      <Swiper>
        <OverviewPage/>
        <div></div>
      </Swiper>
    </React.Fragment>
  );
};

export default AirSupport;
