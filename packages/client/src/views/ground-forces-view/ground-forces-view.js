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
const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const GroundForcesView = () => {
  const handleOnResign = () => resignFromRole(allRoles.GROUND_FORCES);

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.GROUND_FORCES } onResign = { handleOnResign }/>
      <Swiper>
        <CommandPage/>
        <div></div>
      </Swiper>
    </Styles.Root>
  );
};

export default GroundForcesView;
