// import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './air-support-view.styles';
import pages from './pages';

const { constants } = common;

const {
  OverviewPage,
} = pages;
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

export const AirSupportView = () => {
  const handleOnResign = () => resignFromRole(allRoles.AIR_SUPPORT);

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.AIR_SUPPORT } onResign = { handleOnResign }/>
      <Swiper>
        <OverviewPage/>
        <div></div>
      </Swiper>
    </Styles.Root>
  );
};
