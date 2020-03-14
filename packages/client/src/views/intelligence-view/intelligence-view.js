// import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const { constants } = common;

const { AnalyticsPage } = pages;
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

export const IntelligenceView = () => {
  const handleOnResign = () => resignFromRole(allRoles.INTELLIGENCE);

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.INTELLIGENCE } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <AnalyticsPage/>
      </Swiper>
    </Styles.Root>
  );
};
