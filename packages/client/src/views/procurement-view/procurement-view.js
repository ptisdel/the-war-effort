import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const { constants } = common;

const {
  ProductionPage,
  ResearchPage,
} = pages;
const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const ProcurementView = () => {
  const handleOnResign = () => resignFromRole(ALL_ROLES.PROCUREMENT);

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.PROCUREMENT } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <ProductionPage/>
        <ResearchPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default ProcurementView;
