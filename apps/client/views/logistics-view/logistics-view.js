// import _ from 'lodash';
import React from 'react';
import api from '../../api';
import components from '../../components';
import { models } from '../../../shared';
import state from '../../state';
import * as Styles from './logistics-view.styles';

const { logisticsActions } = api;
const { Budget } = models;
const { store } = state;
const { Swiper } = components;

export const LogisticsView = () => {
  const [globalState] = store();

  const { gameState } = globalState;

  return (
    <Styles.Root>
      <Swiper>
        <div>
          <p>First page</p>
        </div>
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
