// import _ from 'lodash';
import React from 'react';
import * as api from '../../api';
import components from '../../shared';
import { constants } from '../../../common';
import * as Styles from './logistics-view.styles';
import pages from './pages';

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
