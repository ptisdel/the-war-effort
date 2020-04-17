import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import { CensorshipPage, PropagandaPage } from './pages';

const { constants } = common;

const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const PublicAffairsView = () => {
  const handleOnResign = () => {
    resignFromRole(allRoles.PUBLIC_AFFAIRS);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.PUBLIC_AFFAIRS } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <PropagandaPage/>
        <CensorshipPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default PublicAffairsView;
