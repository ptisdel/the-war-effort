import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import { ArmyTrainingPage } from './pages';

const { Swiper } = shared;

const TrainingView = () => {

  return (
    <Styles.Root>
      <Swiper>
        <ArmyTrainingPage/>
      </Swiper>
    </Styles.Root>
  );
};

export default TrainingView;
