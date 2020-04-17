import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import shared from '../../components';
import * as Styles from './styles';
import { ArmyTrainingPage } from './pages';

const { constants } = common;

const { allRoles } = constants;
const { resignFromRole } = api;
const { RoleHeader, Swiper } = shared;

const TrainingView = () => {
  const handleOnResign = () => {
    resignFromRole(allRoles.TRAINING);
  };

  return (
    <Styles.Root>
      <RoleHeader title = { allRoles.TRAINING } onResign = { handleOnResign }></RoleHeader>
      <Swiper>
        <ArmyTrainingPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default TrainingView;
