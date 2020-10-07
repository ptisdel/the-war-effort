import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import pages from './pages';

const { constants } = common;

const {
  CommandPage,
} = pages;
const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const GroundForcesView = () => {
  const handleOnResign = () => resignFromRole(ALL_ROLES.GROUND_FORCES);

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.GROUND_FORCES } onResign = { handleOnResign }/>
      <Swiper>
        <CommandPage/>
        <div></div>
      </Swiper>
    </Styles.Root>
  );
};

export default GroundForcesView;
