// import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './procurement-view.styles';
import pages from './pages';

const { constants } = common;

const {
  ProductionPage,
  ResearchPage,
} = pages;
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

export const ProcurementView = () => {
  const handleOnResign = () => resignFromRole(allRoles.PROCUREMENT);

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.PROCUREMENT } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <ProductionPage/>
        <ResearchPage/>
      </Swiper>
    </Styles.Root>
  );
};
