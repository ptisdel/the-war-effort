import React from 'react';
import common from '@the-war-effort/common';
import * as api from '@/api';
import shared from '../../components';
import * as Styles from './styles';
import { CensorshipPage, PropagandaPage } from './pages';

const { constants } = common;

const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const PublicAffairsView = () => {
  const handleOnResign = () => {
    resignFromRole(ALL_ROLES.PUBLIC_AFFAIRS);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.PUBLIC_AFFAIRS } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <PropagandaPage/>
        <CensorshipPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default PublicAffairsView;
