import React from 'react';
import shared from '../../components';
import * as Styles from './styles';
import { FundingPage, ParliamentPage, RolesPage } from './pages';

const { Swiper } = shared;

const CommanderView = () => (
    <Styles.Root>
      <Swiper>
        <FundingPage/>
        <ParliamentPage/>
        <RolesPage/>
      </Swiper>
    </Styles.Root>
);

export default CommanderView;
