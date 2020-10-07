// import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const { constants } = common;

const { AnalyticsPage } = pages;
const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const IntelligenceView = () => {
  const handleOnResign = () => resignFromRole(ALL_ROLES.INTELLIGENCE);

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.INTELLIGENCE } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <AnalyticsPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default IntelligenceView;
