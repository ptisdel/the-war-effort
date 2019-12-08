import React from 'react';
import components from '../../components';
import * as Styles from './commander-view.styles';
import { FundingPage } from './pages';

const { Swiper } = components;

export const CommanderView = () => (
    <Styles.Root>
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
