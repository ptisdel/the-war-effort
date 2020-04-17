// import _ from 'lodash';
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
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const LogisticsView = () => {
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

export default LogisticsView;
