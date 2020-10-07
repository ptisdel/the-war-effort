import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import { FundingPage, ParliamentPage, RolesPage } from './pages';

const { constants } = common;

const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const CommanderView = () => {
  const handleOnResign = () => {
    resignFromRole(ALL_ROLES.COMMANDER);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.COMMANDER } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <FundingPage/>
        <ParliamentPage/>
        <RolesPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default CommanderView;
