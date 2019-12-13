// import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import components from '../../shared';
import * as Styles from './logistics-view.styles';
import pages from './pages';

const { constants } = common;

const {
  FobResourcesPage,
  HomeResourcesPage,
  TravelGroupsPage,
} = pages;
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = components;

export const LogisticsView = () => {
  const handleOnResign = () => resignFromRole(allRoles.LOGISTICS);

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.LOGISTICS } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <HomeResourcesPage/>
        <FobResourcesPage/>
        <TravelGroupsPage/>
      </Swiper>
    </Styles.Root>
  );
};
