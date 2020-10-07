import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const { constants } = common;

const {
  FobResourcesPage,
  HomeResourcesPage,
  TravelGroupsPage,
} = pages;
const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const LogisticsView = () => {
  const handleOnResign = () => resignFromRole(ALL_ROLES.LOGISTICS);

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.LOGISTICS } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <HomeResourcesPage/>
        <FobResourcesPage/>
        <TravelGroupsPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default LogisticsView;
