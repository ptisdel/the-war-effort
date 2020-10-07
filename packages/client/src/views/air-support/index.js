import React from 'react';
import shared from '../../components';
import { OverviewPage } from './pages';
import { useAirSupport } from './logic';

const { RoleHeader, Swiper } = shared;

const AirSupport = () => {
  const { onResign } = useAirSupport();

  return (
    <React.Fragment>
      <RoleHeader title = { 'Air Support' } onResign = { onResign }/>
      <Swiper>
        <OverviewPage/>
        <div></div>
      </Swiper>
    </React.Fragment>
  );
};

export default AirSupport;
