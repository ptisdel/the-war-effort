import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import { ArmyTrainingPage } from './pages';

const { constants } = common;

const { ALL_ROLES } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const TrainingView = () => {
  const handleOnResign = () => {
    resignFromRole(ALL_ROLES.TRAINING);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { ALL_ROLES.TRAINING } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <ArmyTrainingPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default TrainingView;
