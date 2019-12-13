import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../shared';
import * as Styles from './commander-view.styles';
import { FundingPage } from './pages';

const { constants } = common;

const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

export const CommanderView = () => {
  const handleOnResign = () => {
    resignFromRole(allRoles.COMMANDER);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.COMMANDER } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <FundingPage/>
        <div>
          <p>Second page</p>
        </div>
        <div>
          <p>Third page</p>
        </div>
      </Swiper>
    </Styles.Root>
  );
};
